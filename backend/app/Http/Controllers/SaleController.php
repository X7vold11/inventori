<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Item;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class SaleController extends Controller
{
    public function index(Request $request)
    {
        $query = Sale::with('item')->orderBy('created_at', 'desc');

        // Filter by date range
        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('sale_date', '>=', $request->date_from);
        }
        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('sale_date', '<=', $request->date_to);
        }

        // Search by item name
        if ($request->has('search') && $request->search) {
            $query->whereHas('item', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            });
        }

        return $query->get();
    }

    /**
     * Get sales grouped by transaction_id for history display.
     */
    public function transactions(Request $request)
    {
        $query = Sale::with('item')->orderBy('sale_date', 'desc')->orderBy('transaction_id');

        // Filter by date range
        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('sale_date', '>=', $request->date_from);
        }
        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('sale_date', '<=', $request->date_to);
        }

        $sales = $query->get();

        // Group by transaction_id
        $grouped = $sales->groupBy('transaction_id')->map(function ($items, $transactionId) {
            $firstItem = $items->first();
            $totalRevenue = $items->sum('selling_price');
            $totalCost = $items->sum('purchase_price');
            $totalQuantity = $items->sum('quantity');

            return [
                'transaction_id' => $transactionId,
                'sale_date' => $firstItem->sale_date,
                'created_at' => $firstItem->created_at,
                'total_revenue' => $totalRevenue,
                'total_cost' => $totalCost,
                'total_profit' => $totalRevenue - $totalCost,
                'total_quantity' => $totalQuantity,
                'items' => $items->map(function ($sale) {
                    return [
                        'id' => $sale->id,
                        'item_name' => $sale->item->name ?? 'Barang dihapus',
                        'quantity' => $sale->quantity,
                        'selling_price' => $sale->selling_price,
                        'purchase_price' => $sale->purchase_price,
                        'profit' => $sale->selling_price - $sale->purchase_price,
                    ];
                })->values(),
            ];
        })->values();

        // Client-side search filter by item name within transactions
        if ($request->has('search') && $request->search) {
            $search = strtolower($request->search);
            $grouped = $grouped->filter(function ($txn) use ($search) {
                return $txn['items']->contains(function ($item) use ($search) {
                    return str_contains(strtolower($item['item_name']), $search);
                });
            })->values();
        }

        return response()->json($grouped);
    }

    /**
     * Get summary statistics for sales within a date range.
     */
    public function summary(Request $request)
    {
        $query = Sale::query();

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('sale_date', '>=', $request->date_from);
        }
        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('sale_date', '<=', $request->date_to);
        }

        $sales = $query->get();

        $totalRevenue = $sales->sum('selling_price');
        $totalCost = $sales->sum('purchase_price');
        $totalProfit = $totalRevenue - $totalCost;
        $totalTransactions = $sales->pluck('transaction_id')->unique()->count();
        $totalQuantity = $sales->sum('quantity');

        return response()->json([
            'total_revenue' => $totalRevenue,
            'total_profit' => $totalProfit,
            'total_transactions' => $totalTransactions,
            'total_quantity' => $totalQuantity,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.item_id' => 'required|exists:items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|in:cash,qris',
            'cash_paid' => 'nullable|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            $transactionId = (string) Str::uuid();
            $sales = [];
            $totalAmount = 0;
            
            foreach ($validated['items'] as $saleItem) {
                $inventory = Inventory::where('item_id', $saleItem['item_id'])->first();
                $item = Item::findOrFail($saleItem['item_id']);
                
                if ($inventory->stock < $saleItem['quantity']) {
                    return response()->json(['error' => "Stok {$item->name} tidak mencukupi. Sisa stok: {$inventory->stock}"], 400);
                }

                // Calculate total prices for this sale line
                $sellingPriceTotal = $item->selling_price * $saleItem['quantity'];
                $purchasePriceTotal = $inventory->average_purchase_price * $saleItem['quantity'];

                $sale = Sale::create([
                    'item_id' => $item->id,
                    'quantity' => $saleItem['quantity'],
                    'selling_price' => $sellingPriceTotal,
                    'purchase_price' => $purchasePriceTotal,
                    'sale_date' => now(),
                    'transaction_id' => $transactionId,
                    'payment_method' => $validated['payment_method'],
                    'cash_paid' => $validated['payment_method'] === 'cash' ? $validated['cash_paid'] : null,
                ]);

                // Deduct stock
                $inventory->decrement('stock', $saleItem['quantity']);

                $sales[] = $sale->load('item');
                $totalAmount += $sellingPriceTotal;
            }

            DB::commit();
            
            return response()->json([
                'sales' => $sales,
                'transaction_id' => $transactionId,
                'total_amount' => $totalAmount,
                'payment_method' => $validated['payment_method'],
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

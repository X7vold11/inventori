<?php

namespace App\Http\Controllers;

use App\Models\Restock;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestockController extends Controller
{
    public function index()
    {
        return Restock::with('item')->orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|exists:items,id',
            'quantity' => 'required|integer|min:1',
            'purchase_price' => 'required|numeric|min:0', // modal belanja (total nominal utk qty tsb)
        ]);

        try {
            DB::beginTransaction();

            // Create Restock record
            $restock = Restock::create([
                ...$validated,
                'restock_date' => now(),
            ]);

            // Update Inventory
            $inventory = Inventory::where('item_id', $validated['item_id'])->first();
            
            $oldStock = $inventory->stock;
            $oldAverage = $inventory->average_purchase_price;
            $newQuantity = $validated['quantity'];
            $newSpend = $validated['purchase_price'];

            $newStock = $oldStock + $newQuantity;
            
            // Calculate new moving average cost
            // ( (old_stock * old_average) + new_spend ) / new_stock
            $oldTotalValue = $oldStock * $oldAverage;
            $newAverage = ($oldTotalValue + $newSpend) / $newStock;

            $inventory->update([
                'stock' => $newStock,
                'average_purchase_price' => $newAverage
            ]);

            DB::commit();
            return response()->json($restock->load('item'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

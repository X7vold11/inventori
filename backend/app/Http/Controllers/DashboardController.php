<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Inventory;
use App\Models\Sale;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $totalItems = Item::count();
        $totalStock = Inventory::sum('stock');
        
        $todayStart = Carbon::today();
        
        $todaySalesRaw = Sale::where('sale_date', '>=', $todayStart)->get();
        $todaySales = $todaySalesRaw->sum('selling_price');
        
        $todayProfit = $todaySalesRaw->reduce(function ($carry, $sale) {
            return $carry + ($sale->selling_price - $sale->purchase_price);
        }, 0);

        // Chart Data: Last 7 days
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $salesOnDate = Sale::whereDate('sale_date', $date)->get();
            
            $salesTotal = $salesOnDate->sum('selling_price');
            $profitTotal = $salesOnDate->reduce(function ($carry, $sale) {
                return $carry + ($sale->selling_price - $sale->purchase_price);
            }, 0);

            $chartData[] = [
                'day' => $date->format('D'),
                'sales' => (float) $salesTotal,
                'profit' => (float) $profitTotal,
            ];
        }

        // Top Selling items today (or all time if no sales today)
        $topItems = Sale::with('item')
            ->selectRaw('item_id, sum(quantity) as total_qty, sum(selling_price - purchase_price) as total_profit')
            ->groupBy('item_id')
            ->orderBy('total_qty', 'desc')
            ->take(5)
            ->get()
            ->map(function ($sale) {
                return [
                    'name' => $sale->item->name,
                    'sales' => $sale->total_qty . ' Terjual',
                    'revenue' => 'Untung Rp' . number_format($sale->total_profit, 0, ',', '.')
                ];
            });

        return response()->json([
            'total_items' => $totalItems,
            'total_stock' => $totalStock,
            'today_sales' => $todaySales,
            'today_profit' => $todayProfit,
            'chart_data' => $chartData,
            'top_items' => $topItems,
        ]);
    }
}

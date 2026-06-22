<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    public function index()
    {
        return Item::with('inventory')->orderBy('id', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'selling_price' => 'required|numeric|min:0',
            'description' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();
            $item = Item::create($validated);
            
            // Initialize inventory
            Inventory::create([
                'item_id' => $item->id,
                'stock' => 0,
                'average_purchase_price' => 0
            ]);
            
            DB::commit();
            return response()->json($item->load('inventory'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        return Item::with('inventory')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'selling_price' => 'required|numeric|min:0',
            'description' => 'nullable|string'
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}

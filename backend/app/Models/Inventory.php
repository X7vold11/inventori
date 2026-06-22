<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = ['item_id', 'stock', 'average_purchase_price'];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}

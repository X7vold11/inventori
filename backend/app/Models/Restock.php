<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restock extends Model
{
    use HasFactory;

    protected $fillable = ['item_id', 'quantity', 'purchase_price', 'restock_date'];

    public function item()
    {
        return $this->belongsTo(Item::class)->withTrashed();
    }
}

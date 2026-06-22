<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = ['item_id', 'quantity', 'selling_price', 'purchase_price', 'sale_date', 'transaction_id', 'payment_method', 'cash_paid'];

    public function item()
    {
        return $this->belongsTo(Item::class)->withTrashed();
    }
}

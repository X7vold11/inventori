<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('selling_price', 15, 2);
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained('items')->onDelete('cascade');
            $table->integer('stock')->default(0);
            $table->decimal('average_purchase_price', 15, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('restocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained('items')->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('purchase_price', 15, 2); // modal belanja total
            $table->timestamp('restock_date');
            $table->timestamps();
        });

        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained('items')->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('selling_price', 15, 2); // harga pas jual
            $table->decimal('purchase_price', 15, 2); // modal pas jual untuk hitung untung
            $table->timestamp('sale_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sales');
        Schema::dropIfExists('restocks');
        Schema::dropIfExists('inventories');
        Schema::dropIfExists('items');
    }
};

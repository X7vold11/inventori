<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->string('transaction_id', 36)->nullable()->after('id');
            $table->index('transaction_id');
        });

        // Assign unique transaction_id to each existing sale row
        // (old sales have no grouping, so each gets its own transaction)
        $sales = DB::table('sales')->whereNull('transaction_id')->get();
        foreach ($sales as $sale) {
            DB::table('sales')->where('id', $sale->id)->update([
                'transaction_id' => (string) Str::uuid(),
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropIndex(['transaction_id']);
            $table->dropColumn('transaction_id');
        });
    }
};

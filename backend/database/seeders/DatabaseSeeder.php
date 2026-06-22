<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Manager account
        User::updateOrCreate(
            ['email' => 'manager@inventoriku.com'],
            [
                'name' => 'Manager InventoriKu',
                'password' => Hash::make('manager123'),
                'role' => 'manager',
                'theme' => 'blue',
            ]
        );

        // Create Cashier account
        User::updateOrCreate(
            ['email' => 'kasir@inventoriku.com'],
            [
                'name' => 'Kasir InventoriKu',
                'password' => Hash::make('kasir123'),
                'role' => 'cashier',
                'theme' => 'green',
            ]
        );
    }
}

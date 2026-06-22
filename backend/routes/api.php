<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\RestockController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;

// Public auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/update-theme', [AuthController::class, 'updateTheme']);

    // User management (Manager only)
    Route::apiResource('users', UserController::class);

    // Dashboard endpoints (Manager only)
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // CRUD for Items (Manager only)
    Route::apiResource('items', ItemController::class);

    // Restocks (Manager only)
    Route::apiResource('restocks', RestockController::class)->only(['index', 'store']);

    // Sales (Cashier can create, both can view)
    Route::get('/sales/summary', [SaleController::class, 'summary']);
    Route::get('/sales/transactions', [SaleController::class, 'transactions']);
    Route::apiResource('sales', SaleController::class)->only(['index', 'store']);
});

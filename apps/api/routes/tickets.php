<?php

use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

Route::apiResource('tickets', TicketController::class)->except(['store', 'update', 'destroy']);

Route::middleware('admin')->group(function () {
    Route::post('tickets/{ticket}/assign/{user}', [TicketController::class, 'assign']);
    Route::patch('tickets/{ticket}/status', [TicketController::class, 'changeStatus']);
    Route::apiResource('tickets', TicketController::class)->only(['store', 'update', 'destroy']);
});

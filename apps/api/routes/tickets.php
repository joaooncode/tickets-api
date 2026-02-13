<?php

use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

Route::middleware(\App\Http\Middleware\ClerkAuthenticate::class)->
apiResource('tickets', TicketController::class)->except(['store', 'update', 'destroy']);

Route::middleware([\App\Http\Middleware\ClerkAuthenticate::class])->group(function () {
    Route::post('tickets/{ticket}/assign/{user}', [TicketController::class, 'assign']);
    Route::patch('tickets/{ticket}/status', [TicketController::class, 'changeStatus']);
    Route::apiResource('tickets', TicketController::class)->only(['store', 'update', 'destroy']);
});

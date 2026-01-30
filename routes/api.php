<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [RegisteredUserController::class, 'store'])
    ->name('register');


// 2. Login (Valida credenciais e devolve token)
Route::middleware(['throttle:auth_login'])->group(function () {
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});


// --- Rotas Protegidas (Exigem Token Bearer) ---
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {

    //Logout (Revoga o token)
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::get('/user/tickets', [TicketController::class, 'userTickets']);
    Route::get('/assigned/tickets', [TicketController::class, 'assignedTickets']);
    Route::get('/unassigned/tickets', [TicketController::class, 'unassignedTickets']);

    require __DIR__ . '/comments.php';
    require __DIR__ . '/attachments.php';

    Route::middleware(['admin'])->group(function () {
        Route::get('/stats', [StatsController::class, 'index']);
        require __DIR__ . '/tickets.php';
    });
});

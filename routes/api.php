<?php

use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CommentController;
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
Route::post('/login', [AuthenticatedSessionController::class, 'store']);


// --- Rotas Protegidas (Exigem Token Bearer) ---
Route::middleware(['auth:sanctum'])->group(function () {

    //Logout (Revoga o token)
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::get('/user/tickets', [TicketController::class, 'userTickets']);
    Route::get('/assigned/tickets', [TicketController::class, 'assignedTickets']);
    Route::get('/unassigned/tickets', [TicketController::class, 'unassignedTickets']);

    Route::get('/tickets/{ticket}/comments', [CommentController::class, 'index']);
    Route::post('/tickets/{ticket}/comments', [CommentController::class, 'store']);
    Route::patch('/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);

    Route::get('/tickets/{ticket}/attachments', [AttachmentController::class, 'index']);
    Route::post('/tickets/{ticket}/attachments', [AttachmentController::class, 'store']);
    Route::get('/attachments/{attachment}', [AttachmentController::class, 'show']);
    Route::delete('/attachments/{attachment}', [AttachmentController::class, 'destroy']);

    Route::middleware(['admin'])->group(function () {
        Route::get('/stats', [StatsController::class, 'index']);
        require __DIR__ . '/tickets.php';
    });
});

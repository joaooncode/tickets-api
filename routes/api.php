<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
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

});

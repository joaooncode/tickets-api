<?php

use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::get('/tickets/{ticket}/comments', [CommentController::class, 'index']);
Route::post('/tickets/{ticket}/comments', [CommentController::class, 'store']);
Route::patch('/comments/{comment}', [CommentController::class, 'update']);
Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);

<?php

use App\Http\Controllers\AttachmentController;
use Illuminate\Support\Facades\Route;

Route::get('/tickets/{ticket}/attachments', [AttachmentController::class, 'index']);
Route::post('/tickets/{ticket}/attachments', [AttachmentController::class, 'store']);
Route::get('/attachments/{attachment}', [AttachmentController::class, 'show']);
Route::delete('/attachments/{attachment}', [AttachmentController::class, 'destroy']);

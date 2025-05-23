<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\CategoryController;

Route::apiResource('books', BookController::class);
Route::get('books/search', [BookController::class, 'search']);
Route::apiResource('authors', AuthorController::class);
Route::apiResource('categories', CategoryController::class);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('books', [BookController::class, 'index']);


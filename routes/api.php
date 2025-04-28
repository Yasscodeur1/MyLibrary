<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\CategoryController;

Route::apiResource('Books', BookController::class);
Route::apiResource('Authors', AuthorController::class);
Route::apiResource('Categories', CategoryController::class);
<?php

use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\CategoryController;

<<<<<<< HEAD

=======
>>>>>>> 91a9b9a8e7194c773605188806753c55a72ee3be
Route::apiResource('Books', BookController::class);
Route::apiResource('Authors', AuthorController::class);
Route::apiResource('Categories', CategoryController::class);
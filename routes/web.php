<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::get('/', [HomeController::class, 'index'])->name('home');


Route::get('/add-book-full', fn() => Inertia::render('AddBookFull'))->name('add-book');
Route::get('/Categories', fn() => Inertia::render('Categories'))->name('add-book');
Route::get('/books', fn() => Inertia::render('Books'))->name('add-book');

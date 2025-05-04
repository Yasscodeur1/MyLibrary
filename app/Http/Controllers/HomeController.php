<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Book;

class HomeController extends Controller
{
    public function index()
    {
        $books = Book::with(['author', 'category'])
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('Home', [
            'books' => $books
        ]);
    }
}
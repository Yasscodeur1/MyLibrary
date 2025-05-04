<?php

namespace App\Http\Controllers\Api;

use App\Models\Book;
use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use App\Http\Resources\BookResource;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with(['author', 'category'])
            ->orderBy('created_at', 'desc')
            ->paginate(10); // Pagination des livres
        return BookResource::collection($books); // Retourne les livres sous forme de collection de ressources
    }

    public function store(BookRequest $request)
    {
        $book = Book::create($request->validated());
        return new BookResource($book->load(['author', 'category'])); // Retourne le livre nouvellement créé avec ses relations
    }

    public function show(Book $book)
    {
        return new BookResource($book->load(['author', 'category'])); // Retourne un livre spécifique avec ses relations
    }

    public function update(BookRequest $request, Book $book)
    {
        $book->update($request->validated());
        return new BookResource($book->load(['author', 'category'])); // Retourne le livre mis à jour avec ses relations
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return response()->noContent(); // Suppression du livre et retour sans contenu
    }

    public function search(Request $request)
    {
        $query = Book::query()->with(['author', 'category']);

        if ($request->has('title') && $request->title) {
            $query->where('title', 'like', '%' . $request->title . '%'); // Filtrage par titre si le paramètre est passé
        }

        if ($request->has('author_id') && $request->author_id) {
            $query->where('author_id', $request->author_id); // Filtrage par ID d'auteur
        }

        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id); // Filtrage par ID de catégorie
        }

        return BookResource::collection($query->paginate(10)); // Retourne les livres filtrés avec pagination
    }
}

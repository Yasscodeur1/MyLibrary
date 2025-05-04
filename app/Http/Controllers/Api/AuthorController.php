<?php

namespace App\Http\Controllers\Api;

use App\Models\Author;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthorRequest;
use App\Http\Resources\AuthorResource;
use Illuminate\Http\Response;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::with('books')->paginate(10);
        return AuthorResource::collection($authors);
    }

    public function store(AuthorRequest $request)
    {
        $author = Author::create($request->validated());
        return new AuthorResource($author);
    }

    public function show(Author $author)
    {
        return new AuthorResource($author->load('books'));
    }

    public function update(AuthorRequest $request, Author $author)
    {
        $author->update($request->validated());
        return new AuthorResource($author);
    }

    public function destroy(Author $author)
    {
        $author->delete();
        return response()->noContent();
    }
}
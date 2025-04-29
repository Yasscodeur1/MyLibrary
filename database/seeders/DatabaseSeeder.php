<?php

namespace Database\Seeders;

// use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use App\Models\Author;
use App\Models\Category;
use App\Models\Book;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Créer 15 auteurs et 15 catégories
        $authors = Author::factory(15)->create();
        $categories = Category::factory(15)->create();

        // Créer 60 livres liés à ces auteurs et catégories
        Book::factory(60)->make()->each(function ($book) use ($authors, $categories) {
            $book->author_id = $authors->random()->id;
            $book->category_id = $categories->random()->id;
            $book->save();
        });

        // User::factory()->create([
        //     'email' => fake()->unique()->safeEmail(),
        // ]);        
    }
}




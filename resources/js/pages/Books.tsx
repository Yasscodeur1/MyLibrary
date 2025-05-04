import React, { useState, useEffect } from 'react';
import { Book } from '../types';

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Non disponible';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/books');
        if (!response.ok) {
          throw new Error('Échec du chargement des livres');
        }
        const data = await response.json();
        setBooks(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Livres</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {book.description || 'Aucune description disponible.'}
              </p>
              <div className="text-sm text-gray-500">
                <p className="mb-1">Par {book.author.name}</p>
                <p className="mb-1">Catégorie: {book.category.name}</p>
                <p>Publié le: {formatDate(book.publication_date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
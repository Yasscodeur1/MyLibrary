import React, { useEffect, useState } from 'react';
import { getBooks } from '../api/api'; // Assure-toi du bon chemin

interface Book {
  id: number;
  title: string;
  author_id: number;
  category_id: number;
  published_year: number;
}

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks()
      .then((response: { data: { data: React.SetStateAction<Book[]>; }; }) => {
        console.log('Réponse reçue :', response);
        setBooks(response.data.data); // `.data.data` si tu utilises Laravel API Resources
      })
      .catch((error: any) => {
        console.error('Erreur lors du chargement des livres:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className='mt-20'>
      <h2>Liste des livres</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} (publié en {book.published_year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;

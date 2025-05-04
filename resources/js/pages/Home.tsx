import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Book } from '../types';

const Home: React.FC = () => {
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
                const response = await axios.get('/api/books');
                setBooks(response.data.data);
            } catch (err) {
                setError("Erreur lors du chargement des livres");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
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
        <>
            <Head title="Accueil" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-8">Bienvenue dans notre Bibliothèque</h1>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {books.length === 0 ? (
                                    <p className="text-gray-500 col-span-full text-center py-8">
                                        Aucun livre disponible. Ajoutez votre premier livre !
                                    </p>
                                ) : (
                                    books.map((book) => (
                                        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                            <div className="p-6">
                                                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                                                <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
                                                <div className="text-sm text-gray-500">
                                                    <p className="mb-1">Par {book.author.name}</p>
                                                    <p className="mb-1">Catégorie: {book.category.name}</p>
                                                    <p>Publié le: {formatDate(book.publication_date)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
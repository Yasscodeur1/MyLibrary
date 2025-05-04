"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Head, Link } from "@inertiajs/react"
import axios from "axios"
import type { Book } from "../types"
import Navbar from "../components/NavBar"
import BookCard from "../components/bookcard"


const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books")
        const allBooks = response.data.data
        setBooks(allBooks)

        // Sélectionner quelques livres aléatoires pour la section en vedette
        if (allBooks.length > 0) {
          const randomBooks = [...allBooks].sort(() => 0.5 - Math.random()).slice(0, Math.min(4, allBooks.length))
          setFeaturedBooks(randomBooks)
        }
      } catch (err) {
        setError("Erreur lors du chargement des livres")
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <p className="text-red-600 font-medium text-lg">Erreur: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50">
      <Head title="Accueil - Bibliothèque Moderne" />

      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Découvrez votre prochaine aventure littéraire</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Explorez notre collection de livres soigneusement sélectionnés pour tous les goûts
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/books"
                className="px-6 py-3 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-md"
              >
                Explorer les livres
              </Link>
              <Link
                href="/categories"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-purple-600 transition-colors"
              >
                Parcourir les catégories
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-50 to-transparent"></div>
      </div>

      {/* Featured Books Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">En Vedette</h2>
          <Link href="/books" className="text-purple-600 hover:text-purple-800 font-medium flex items-center">
            Voir tout
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={`featured-${book.id}`} book={book} featured={true} />
          ))}
        </div>
      </div>

      {/* Recent Books Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-3xl shadow-sm mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Notre Collection</h2>
          <div className="flex gap-4">
            <Link href="/categories" className="text-purple-600 hover:text-purple-800 font-medium">
              Catégories
            </Link>
            <Link href="/authors" className="text-purple-600 hover:text-purple-800 font-medium">
              Auteurs
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
              
              <p className="text-gray-600 text-lg">Aucun livre disponible pour le moment.</p>
              <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Ajouter votre premier livre
              </button>
            </div>
          ) : (
            books.map((book) => <BookCard key={book.id} book={book} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

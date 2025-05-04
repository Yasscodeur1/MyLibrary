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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    totalCategories: 0,
  })

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books")
        const allBooks = response.data.data
        setBooks(allBooks)

        // Calculer les statistiques
        const authors = new Set(allBooks.map((book) => book.author.id))
        const categories = new Set(allBooks.map((book) => book.category.id))

        setStats({
          totalBooks: allBooks.length,
          totalAuthors: authors.size,
          totalCategories: categories.size,
        })
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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-gray-50">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <p className="text-red-600 font-medium text-lg">Erreur: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head title="Accueil - Bibliothèque" />

      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Gestion de Bibliothèque</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Système de gestion de stock pour votre librairie</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/books"
                className="px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-md"
              >
                Gérer les livres
              </Link>
              <Link
                href="/categories"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-700 transition-colors"
              >
                Voir les catégories
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Dashboard Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de Bord</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Statistiques des livres */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total des Livres</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalBooks}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl font-bold text-blue-600">📚</span>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/books" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Voir tous les livres
                <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          {/* Statistiques des auteurs */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-teal-600">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total des Auteurs</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalAuthors}</p>
              </div>
              <div className="p-3 bg-teal-100 rounded-full">
                <span className="text-2xl font-bold text-teal-600">👤</span>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/authors" className="text-sm text-teal-600 hover:text-teal-800 font-medium flex items-center">
                Voir tous les auteurs
                <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          {/* Statistiques des catégories */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-gray-600">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total des Catégories</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalCategories}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <span className="text-2xl font-bold text-gray-600">🏷️</span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/categories"
                className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center"
              >
                Voir toutes les catégories
                <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Books Collection Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg shadow-sm mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Inventaire des Livres</h2>
          <div className="flex gap-4">
            <Link href="/categories" className="text-blue-600 hover:text-blue-800 font-medium">
              Catégories
            </Link>
            <Link href="/authors" className="text-blue-600 hover:text-blue-800 font-medium">
              Auteurs
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-600 text-lg">Aucun livre disponible pour le moment.</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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

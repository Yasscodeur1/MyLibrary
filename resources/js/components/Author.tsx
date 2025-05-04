"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Head } from "@inertiajs/react"
import axios from "axios"
import Navbar from "../components/NavBar"
import AuthorCard from "../components/AuthorCard"

interface Author {
  id: number
  name: string
  biography: string
}

const Authors: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    biography: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const fetchAuthors = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/authors")
      setAuthors(response.data.data)
    } catch (err) {
      setError("Erreur lors du chargement des auteurs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuthors()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    try {
      await axios.post("/api/authors", formData)
      setIsAddModalOpen(false)
      setFormData({ name: "", biography: "" })
      fetchAuthors()
    } catch (err) {
      setFormError("Erreur lors de l'ajout de l'auteur")
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <Head title="Auteurs - BiblioTech" />

      <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-700 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Auteurs</h1>
          <p className="text-lg opacity-90">Gérez les auteurs de votre bibliothèque</p>
        </div>
      </div>

      {/* Authors Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Liste des auteurs</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ajouter un auteur
          </button>
        </div>

        {authors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">👤</div>
            <p className="text-gray-600 text-lg">Aucun auteur disponible pour le moment.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter votre premier auteur
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} onUpdate={fetchAuthors} />
            ))}
          </div>
        )}
      </div>

      {/* Add Author Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ajouter un auteur</h3>
              {formError && <p className="text-red-600 mb-4">{formError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">
                    Biographie
                  </label>
                  <textarea
                    id="biography"
                    name="biography"
                    value={formData.biography}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Ajout en cours..." : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Authors

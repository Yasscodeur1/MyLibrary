"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "@inertiajs/react"
import type { Book } from "../types"

interface BookCardProps {
  book: Book
  featured?: boolean
}

const BookCard: React.FC<BookCardProps> = ({ book, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Non disponible"
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  // Générer une couleur de fond aléatoire pastel pour les livres sans image
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360)
    return `hsla(${hue}, 70%, 85%, 1)`
  }

  const bgColor = getRandomPastelColor()

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
        isHovered ? "shadow-xl transform -translate-y-1" : ""
      } ${featured ? "bg-white" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/books/${book.id}`}>
        <div
          className="h-48 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundColor: bgColor,
          }}
        >
          {!book.id && (
            <div className="text-center p-4">
              <div className="text-gray-800 font-bold text-lg line-clamp-3">{book.title}</div>
              <div className="text-gray-600 text-sm mt-2">{book.author.name}</div>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold line-clamp-2 text-gray-800">{book.title}</h3>
            {featured && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">En vedette</span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{book.description}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
              {book.category.name}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>Par {book.author.name}</div>
            <div>{formatDate(book.publication_date)}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BookCard

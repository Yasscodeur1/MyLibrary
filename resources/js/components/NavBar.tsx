"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "@inertiajs/react"

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600 mr-2">📚</span>
              <span className="text-xl font-bold text-gray-800">BiblioTech</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/books"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-blue-300"
              >
                Livres
              </Link>
              <Link
                href="/Categories"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-blue-300"
              >
                Catégories
              </Link>
              <Link
                href="/Authors"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-blue-300"
              >
                Auteurs
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Ajouter un livre
              </button>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isMenuOpen ? <span className="block text-xl">✕</span> : <span className="block text-xl">☰</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/books"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-blue-300"
            >
              Livres
            </Link>
            <Link
              href="/categories"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-blue-300"
            >
              Catégories
            </Link>
            <Link
              href="/authors"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-blue-300"
            >
              Auteurs
            </Link>
            <div className="pl-3 pr-4 py-2">
              <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center">
                Ajouter un livre
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

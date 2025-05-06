import { useState } from "react";
import type { Book, Author, Category } from "../types";

interface BookCardProps {
  book: Book;
  authors: Author[];
  categories: Category[];
  onUpdate: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, authors, categories, onUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: book.title,
    summary: book.summary || "",
    publication_date: book.publication_date || "",
    author_id: book.author?.id?.toString() || "",
    category_id: book.category?.id?.toString() || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Handler pour les champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Modifier le livre
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    try {
      await fetch(`/api/books/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsEditModalOpen(false);
      onUpdate();
    } catch (err: any) {
      setFormError("Erreur lors de la modification du livre");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Supprimer le livre
  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/books/${book.id}`, {
        method: "DELETE",
      });
      setIsDeleteModalOpen(false);
      onUpdate();
    } catch (err: any) {
      alert("Erreur lors de la suppression du livre");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl text-gray-900 font-bold mb-2">{book.title}</h3>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Auteur :</span> {book.author?.name}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Catégorie :</span> {book.category?.name}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Résumé :</span> {book.summary}
      </p>
      <p className="text-gray-500 text-sm">
        Ajouté le {new Date(book.created_at).toLocaleDateString()}
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
        >
          Modifier
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
        >
          Supprimer
        </button>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Modifier le livre</h3>
              {formError && <p className="text-red-600 mb-4">{formError}</p>}
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-summary" className="block text-sm font-medium text-gray-700 mb-1">
                    Résumé
                  </label>
                  <textarea
                    id="edit-summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-publication_date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de publication
                  </label>
                  <input
                    type="date"
                    id="edit-publication_date"
                    name="publication_date"
                    value={formData.publication_date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-author_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Auteur
                  </label>
                  <select
                    id="edit-author_id"
                    name="author_id"
                    value={formData.author_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionner un auteur</option>
                    {authors.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-category_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    id="edit-category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Modification..." : "Modifier"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Supprimer le livre</h3>
              <p>Voulez-vous vraiment supprimer ce livre ?</p>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Suppression..." : "Supprimer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
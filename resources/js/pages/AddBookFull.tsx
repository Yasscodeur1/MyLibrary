import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import type { Author, Category } from "../types";
import Navbar from "@/components/NavBar";

export default function AddBookFull() {
  const [title, setTitle] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authorId, setAuthorId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [newAuthor, setNewAuthor] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [publishedYear, setPublishedYear] = useState<number | ''>('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [summary, setSummary] = useState('');



  // Charger les auteurs et catégories existants
  useEffect(() => {
    axios.get("http://localhost:8000/api/authors").then(res => setAuthors(res.data.data));
    axios.get("http://localhost:8000/api/categories").then(res => setCategories(res.data.data));
  }, []);

  // Ajout d'un nouvel auteur
  const handleAddAuthor = async (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor) return;
    try {
      const res = await axios.post("http://localhost:8000/api/authors", { name: newAuthor });
      setAuthors([...authors, res.data.data]);
      setAuthorId(res.data.data.id.toString());
      setNewAuthor("");
    } catch {
      setMessage("Erreur lors de l'ajout de l'auteur");
    }
  };

  // Ajout d'une nouvelle catégorie
  const handleAddCategory = async (e: FormEvent) => {
    e.preventDefault();
    if (!newCategory) return;
    try {
      const res = await axios.post("http://localhost:8000/api/categories", { name: newCategory });
      setCategories([...categories, res.data.data]);
      setCategoryId(res.data.data.id.toString());
      setNewCategory("");
    } catch {
      setMessage("Erreur lors de l'ajout de la catégorie");
    }
  };

  // Ajout du livre
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/books", {
        title,
        author_id: authorId,
        category_id: categoryId,
      });
      setMessage("Livre ajouté !");
      setTitle("");
      setAuthorId("");
      setCategoryId("");
    } catch {
      setMessage("Erreur lors de l'ajout du livre");
    }
  };

  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit} className="mt-10 max-w-xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6">
  <h2 className="text-2xl font-bold text-gray-800">Ajouter un livre</h2>

  {/* Titre */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
    <input
      type="text"
      value={title}
      onChange={e => setTitle(e.target.value)}
      required
      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
      placeholder="Ex: Le Petit Prince"
    />
  </div>

  {/* Auteur */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
    <select
      value={authorId}
      onChange={e => setAuthorId(e.target.value)}
      required
      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 mb-2"
    >
      <option value="">Sélectionner un auteur</option>
      {authors.map(a => (
        <option key={a.id} value={a.id}>{a.name}</option>
      ))}
    </select>
    <div className="flex gap-2">
      <input
        type="text"
        value={newAuthor}
        onChange={e => setNewAuthor(e.target.value)}
        placeholder="Nouvel auteur"
        className="flex-grow px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
      />
      <button
        type="button"
        onClick={handleAddAuthor}
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
      >
        Ajouter
      </button>
    </div>
  </div>

  {/* Catégorie */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
    <select
      value={categoryId}
      onChange={e => setCategoryId(e.target.value)}
      required
      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 mb-2"
    >
      <option value="">Sélectionner une catégorie</option>
      {categories.map(c => (
        <option key={c.id} value={c.id}>{c.name}</option>
      ))}
    </select>
    <div className="flex gap-2">
      <input
        type="text"
        value={newCategory}
        onChange={e => setNewCategory(e.target.value)}
        placeholder="Nouvelle catégorie"
        className="flex-grow px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
      />
      <button
        type="button"
        onClick={handleAddCategory}
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
      >
        Ajouter
      </button>
    </div>
  </div>

  {/* Année de publication */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Année de publication</label>
    <input
      type="number"
      value={publishedYear}
      onChange={e => setPublishedYear(Number(e.target.value))}
      required
      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
      placeholder="Ex: 2024"
    />
  </div>

  {/* Image de couverture */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Image de couverture</label>
    <input
      type="file"
      accept="image/*"
      onChange={e => setCoverImage(e.target.files?.[0] || null)}
      className="w-full px-4 py-2 border rounded-lg"
    />
  </div>

  {/* Résumé */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Résumé</label>
    <textarea
      value={summary}
      onChange={e => setSummary(e.target.value)}
      rows={4}
      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
      placeholder="Écris un résumé du livre..."
    ></textarea>
  </div>

  {/* Soumission */}
  <button
    type="submit"
    className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
  >
    Ajouter le livre
  </button>

  {message && <p className="text-green-600 font-medium">{message}</p>}
</form>


    </>
  );
}
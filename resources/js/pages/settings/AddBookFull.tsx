import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import type { Author, Category } from "../../types";

export default function AddBookFull() {
  const [title, setTitle] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authorId, setAuthorId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [newAuthor, setNewAuthor] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");

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
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un livre</h2>
      <input
        type="text"
        placeholder="Titre du livre"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <div>
        <label>Auteur :</label>
        <select value={authorId} onChange={e => setAuthorId(e.target.value)} required>
          <option value="">Sélectionner un auteur</option>
          {authors.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nouvel auteur"
          value={newAuthor}
          onChange={e => setNewAuthor(e.target.value)}
        />
        <button onClick={handleAddAuthor}>Ajouter l'auteur</button>
      </div>

      <div>
        <label>Catégorie :</label>
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
          <option value="">Sélectionner une catégorie</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nouvelle catégorie"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Ajouter la catégorie</button>
      </div>

      <button type="submit">Ajouter le livre</button>
      {message && <p>{message}</p>}
    </form>
  );
}
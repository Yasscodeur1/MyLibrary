import { useState } from "react";
import axios from "axios";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
    } catch (error) {
      setMessage("Erreur lors de l'ajout !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un livre</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ID Auteur"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ID Catégorie"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      />
      <button type="submit">Ajouter</button>
      {message && <p>{message}</p>}
    </form>
  );
}
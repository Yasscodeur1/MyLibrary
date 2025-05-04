import { useState } from "react";
import axios from "axios";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/categories", { name });
      setMessage("Catégorie ajoutée !");
      setName("");
    } catch (error) {
      setMessage("Erreur lors de l'ajout !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une catégorie</h2>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Ajouter</button>
      {message && <p>{message}</p>}
    </form>
  );
}
// src/api/api.ts
import axios from 'axios';

// Définir l'instance axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // La base pour tous tes appels
  headers: {
    'Content-Type': 'application/json',
  },
});

// --------------- Books ----------------

export const getBooks = () => api.get('/books');
export const getBookById = (id: number) => api.get(`/books/${id}`);
export const createBook = (data: any) => api.post('/books', data);
export const updateBook = (id: number, data: any) => api.put(`/books/${id}`, data);
export const deleteBook = (id: number) => api.delete(`/books/${id}`);

// --------------- Authors ----------------

export const getAuthors = () => api.get('/authors');
export const getAuthorById = (id: number) => api.get(`/authors/${id}`);
export const createAuthor = (data: any) => api.post('/authors', data);
export const updateAuthor = (id: number, data: any) => api.put(`/authors/${id}`, data);
export const deleteAuthor = (id: number) => api.delete(`/authors/${id}`);

// --------------- Categories ----------------

export const getCategories = () => api.get('/categories');
export const getCategoryById = (id: number) => api.get(`/categories/${id}`);
export const createCategory = (data: any) => api.post('/categories', data);
export const updateCategory = (id: number, data: any) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);

// Exporter par défaut l'instance au cas où tu en aurais besoin
export default api;

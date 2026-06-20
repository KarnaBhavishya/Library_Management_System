import { useEffect, useState } from "react";

import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";

import BookForm from "../components/Book/BookForm";
import BookTable from "../components/Book/BookTable";

import api from "../services/api";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar title="Book Management" />

        <div className="page-content">
          <BookForm
            fetchBooks={fetchBooks}
            editingBook={editingBook}
            setEditingBook={setEditingBook}
          />

          {loading ? (
            <div className="card">
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            </div>
          ) : (
            <BookTable
              books={books}
              fetchBooks={fetchBooks}
              onEdit={setEditingBook}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BookPage;
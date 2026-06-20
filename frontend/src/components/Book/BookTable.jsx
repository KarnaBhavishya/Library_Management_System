import { useState } from "react";
import api from "../../services/api";
import { useToast } from "../Layout/Toast";

function BookTable({ books, fetchBooks, onEdit }) {
  const [search, setSearch] = useState("");
  const showToast = useToast();

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await api.delete(`/books/${id}`);
      showToast("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      showToast(error.response?.data?.message || "Error deleting book", "error");
    }
  };

  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase();
    return (
      book.name.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.publication.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    // Check if it looks like a valid date string (e.g. 2024-05-12)
    if (isNaN(Number(dateStr))) {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    // Fallback for older entries where year was just a number like 2024
    return dateStr;
  };

  return (
    <div className="card">
      <div className="table-header">
        <h2>
          <span className="card-icon">📋</span>
          Book Records
        </h2>

        <input
          type="text"
          placeholder="🔍 Search books..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📖</span>
          <p>{search ? "No books match your search" : "No books added yet"}</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Publication</th>
                <th>Pub. Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.publication}</td>
                  <td>{formatDate(book.year)}</td>
                  <td>
                    <div className="action-btns">
                      <button
                        onClick={() => onEdit(book)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBook(book._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookTable;
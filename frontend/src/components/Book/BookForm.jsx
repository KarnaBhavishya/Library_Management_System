import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { useToast } from "../Layout/Toast";

function BookForm({ fetchBooks, editingBook, setEditingBook }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publication, setPublication] = useState("");
  const [year, setYear] = useState("");
  const [saving, setSaving] = useState(false);
  const showToast = useToast();
  const formRef = useRef(null);

  const isEditing = !!editingBook;

  useEffect(() => {
    if (editingBook) {
      setName(editingBook.name || "");
      setAuthor(editingBook.author || "");
      setPublication(editingBook.publication || "");
      // Format date for date picker (YYYY-MM-DD)
      const formattedDate = editingBook.year && editingBook.year.includes('T') 
        ? editingBook.year.split('T')[0] 
        : editingBook.year || "";
      setYear(formattedDate);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editingBook]);

  const resetForm = () => {
    setName("");
    setAuthor("");
    setPublication("");
    setYear("");
    setEditingBook(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = {
        name,
        author,
        publication,
        year,
      };

      if (isEditing) {
        await api.put(`/books/${editingBook._id}`, data);
        showToast("Book updated successfully!");
      } else {
        await api.post("/books", data);
        showToast("Book added successfully!");
      }

      resetForm();
      fetchBooks();
    } catch (error) {
      console.log(error);
      showToast(isEditing ? "Error updating book" : "Error saving book", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`card ${isEditing ? "card-editing" : ""}`} ref={formRef}>
      <h2>
        <span className="card-icon">{isEditing ? "✏️" : "📖"}</span>
        {isEditing ? "Edit Book" : "Add New Book"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Book Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter book title"
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Publication</label>
            <input
              type="text"
              value={publication}
              onChange={(e) => setPublication(e.target.value)}
              placeholder="Enter publisher"
              required
            />
          </div>

          <div className="form-group">
            <label>Publication Date</label>
            <input
              type="date"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="btn-group">
          <button type="submit" className="save-btn" disabled={saving}>
            {saving
              ? (isEditing ? "Updating..." : "Saving...")
              : (isEditing ? "Update Book" : "Save Book")
            }
          </button>
          {isEditing && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;
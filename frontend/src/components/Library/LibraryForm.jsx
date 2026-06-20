import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { useToast } from "../Layout/Toast";

function LibraryForm({ fetchIssues, editingIssue, setEditingIssue }) {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const showToast = useToast();
  const formRef = useRef(null);

  const isEditing = !!editingIssue;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, booksRes] = await Promise.all([
          api.get("/students"),
          api.get("/books"),
        ]);
        setStudents(studentsRes.data);
        setBooks(booksRes.data);
      } catch (error) {
        console.log("Error fetching data:", error);
        showToast("Error loading students/books", "error");
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editingIssue) {
      // Handle populated IDs if they are objects, or plain IDs
      setStudentId(editingIssue.studentId?._id || editingIssue.studentId || "");
      setBookId(editingIssue.bookId?._id || editingIssue.bookId || "");
      
      // Format dates for input type="date" (YYYY-MM-DD)
      const formatForInput = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toISOString().split('T')[0];
      };
      
      setStartDate(formatForInput(editingIssue.startDate));
      setEndDate(formatForInput(editingIssue.endDate));
      
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editingIssue]);

  const resetForm = () => {
    setStudentId("");
    setBookId("");
    setStartDate("");
    setEndDate("");
    setEditingIssue(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !bookId) {
      showToast("Please select both a student and a book", "error");
      return;
    }

    if (!startDate || !endDate) {
      showToast("Please select start and end dates", "error");
      return;
    }

    setSaving(true);

    try {
      const data = {
        studentId,
        bookId,
        startDate,
        endDate,
      };

      if (isEditing) {
        await api.put(`/library/${editingIssue._id}`, data);
        showToast("Record updated successfully!");
      } else {
        await api.post("/library", data);
        showToast("Book issued successfully!");
      }

      resetForm();
      fetchIssues();
    } catch (error) {
      console.log(error);
      showToast(isEditing ? "Error updating record" : "Error issuing book", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return (
      <div className="card">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card ${isEditing ? "card-editing" : ""}`} ref={formRef}>
      <h2>
        <span className="card-icon">{isEditing ? "✏️" : "🏛️"}</span>
        {isEditing ? "Edit Record" : "Issue Book"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Student</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} — {student.className}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Book</label>
            <select
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            >
              <option value="">Select Book</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.name} — {book.author}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="btn-group">
          <button type="submit" className="save-btn" disabled={saving}>
            {saving
              ? (isEditing ? "Updating..." : "Issuing...")
              : (isEditing ? "Update Record" : "Issue Book")
            }
          </button>
          {isEditing ? (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          ) : (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default LibraryForm;
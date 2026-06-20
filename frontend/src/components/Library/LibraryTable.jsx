import { useState } from "react";
import api from "../../services/api";
import { useToast } from "../Layout/Toast";

function LibraryTable({ issues, fetchIssues, onEdit }) {
  const [search, setSearch] = useState("");
  const showToast = useToast();

  const deleteIssue = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await api.delete(`/library/${id}`);
      showToast("Record deleted successfully!");
      fetchIssues();
    } catch (error) {
      showToast(error.response?.data?.message || "Error deleting record", "error");
    }
  };

  const filteredIssues = issues.filter((item) => {
    const studentName = item.studentId?.name?.toLowerCase() || "";
    const bookName = item.bookId?.name?.toLowerCase() || "";
    const query = search.toLowerCase();
    return studentName.includes(query) || bookName.includes(query);
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="card">
      <div className="table-header">
        <h2>
          <span className="card-icon">📋</span>
          Library Records
        </h2>

        <input
          type="text"
          placeholder="🔍 Search records..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredIssues.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🏛️</span>
          <p>{search ? "No records match your search" : "No books issued yet"}</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Book</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredIssues.map((item) => (
                <tr key={item._id}>
                  <td>{item.studentId?.name || "Unknown"}</td>
                  <td>{item.bookId?.name || "Unknown"}</td>
                  <td>{formatDate(item.startDate)}</td>
                  <td>{formatDate(item.endDate)}</td>
                  <td>
                    <div className="action-btns">
                      <button
                        onClick={() => onEdit(item)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteIssue(item._id)}
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

export default LibraryTable;
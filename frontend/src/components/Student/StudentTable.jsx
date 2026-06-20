import { useState } from "react";
import api from "../../services/api";
import { useToast } from "../Layout/Toast";

function StudentTable({ students, fetchStudents, onEdit }) {
  const [search, setSearch] = useState("");
  const showToast = useToast();

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await api.delete(`/students/${id}`);
      showToast("Student deleted successfully!");
      fetchStudents();
    } catch (error) {
      showToast(error.response?.data?.message || "Error deleting student", "error");
    }
  };

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.className.toLowerCase().includes(query)
    );
  });

  return (
    <div className="card">
      <div className="table-header">
        <h2>
          <span className="card-icon">📋</span>
          Student Records
        </h2>

        <input
          type="text"
          placeholder="🔍 Search students..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🎓</span>
          <p>{search ? "No students match your search" : "No students added yet"}</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Photo</th>
                <th>Video</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.className}</td>
                  <td>
                    {student.photo ? (
                      <img
                        src={`http://localhost:5000/uploads/photos/${student.photo}`}
                        alt={student.name}
                      />
                    ) : (
                      <span style={{ color: "var(--text-muted)" }}>—</span>
                    )}
                  </td>
                  <td>
                    {student.video ? (
                      <a
                        href={`http://localhost:5000/uploads/videos/${student.video}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        ▶ Watch
                      </a>
                    ) : (
                      <span style={{ color: "var(--text-muted)" }}>—</span>
                    )}
                  </td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="edit-btn"
                        onClick={() => onEdit(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteStudent(student._id)}
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

export default StudentTable;
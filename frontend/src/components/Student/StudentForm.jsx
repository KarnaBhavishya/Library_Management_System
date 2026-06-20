import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { useToast } from "../Layout/Toast";

function StudentForm({ fetchStudents, editingStudent, setEditingStudent }) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [saving, setSaving] = useState(false);
  const showToast = useToast();
  const formRef = useRef(null);

  const isEditing = !!editingStudent;

  // Pre-fill form when editing
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name || "");
      setClassName(editingStudent.className || "");
      setPhoto(null);
      setVideo(null);
      // Scroll to form
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editingStudent]);

  const resetForm = () => {
    setName("");
    setClassName("");
    setPhoto(null);
    setVideo(null);
    setEditingStudent(null);
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => (input.value = ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("className", className);
      if (photo) formData.append("photo", photo);
      if (video) formData.append("video", video);

      if (isEditing) {
        await api.put(`/students/${editingStudent._id}`, formData);
        showToast("Student updated successfully!");
      } else {
        await api.post("/students", formData);
        showToast("Student added successfully!");
      }

      resetForm();
      fetchStudents();
    } catch (error) {
      console.log(error);
      showToast(isEditing ? "Error updating student" : "Error saving student", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`card ${isEditing ? "card-editing" : ""}`} ref={formRef}>
      <h2>
        <span className="card-icon">{isEditing ? "✏️" : "🎓"}</span>
        {isEditing ? "Edit Student" : "Add New Student"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Student Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
              required
            />
          </div>

          <div className="form-group">
            <label>Class</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter class name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Photo {isEditing && "(leave empty to keep current)"}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label>Video {isEditing && "(leave empty to keep current)"}</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
        </div>

        <div className="btn-group">
          <button className="save-btn" type="submit" disabled={saving}>
            {saving
              ? (isEditing ? "Updating..." : "Saving...")
              : (isEditing ? "Update Student" : "Save Student")
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

export default StudentForm;
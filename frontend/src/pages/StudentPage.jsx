import { useEffect, useState } from "react";

import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";

import StudentForm from "../components/Student/StudentForm";
import StudentTable from "../components/Student/StudentTable";

import api from "../services/api";

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar title="Student Management" />

        <div className="page-content">
          <StudentForm
            fetchStudents={fetchStudents}
            editingStudent={editingStudent}
            setEditingStudent={setEditingStudent}
          />

          {loading ? (
            <div className="card">
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            </div>
          ) : (
            <StudentTable
              students={students}
              fetchStudents={fetchStudents}
              onEdit={setEditingStudent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
import { useEffect, useState } from "react";

import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";

import LibraryForm from "../components/Library/LibraryForm";
import LibraryTable from "../components/Library/LibraryTable";

import api from "../services/api";

function LibraryPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIssue, setEditingIssue] = useState(null);

  const fetchIssues = async () => {
    try {
      const res = await api.get("/library");
      setIssues(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar title="Library Management" />

        <div className="page-content">
          <LibraryForm
            fetchIssues={fetchIssues}
            editingIssue={editingIssue}
            setEditingIssue={setEditingIssue}
          />

          {loading ? (
            <div className="card">
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            </div>
          ) : (
            <LibraryTable
              issues={issues}
              fetchIssues={fetchIssues}
              onEdit={setEditingIssue}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;
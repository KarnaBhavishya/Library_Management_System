import { useEffect, useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({ students: 0, books: 0, issues: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, booksRes, issuesRes] = await Promise.all([
          api.get("/students"),
          api.get("/books"),
          api.get("/library"),
        ]);
        setStats({
          students: studentsRes.data.length,
          books: booksRes.data.length,
          issues: issuesRes.data.length,
        });
      } catch (error) {
        console.log("Stats fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar title="Dashboard" />

        <div className="page-content">
          <div className="dashboard-hero">
            <span className="hero-icon">📚</span>
            <h1>Welcome to LibraFlow</h1>
            <p>
              Your complete library management system. Track students, manage
              books, and handle book issues — all in one place.
            </p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="dashboard-stats">
              <div className="stat-card">
                <span className="stat-icon">🎓</span>
                <div className="stat-value">{stats.students}</div>
                <div className="stat-label">Total Students</div>
              </div>

              <div className="stat-card">
                <span className="stat-icon">📖</span>
                <div className="stat-value">{stats.books}</div>
                <div className="stat-label">Total Books</div>
              </div>

              <div className="stat-card">
                <span className="stat-icon">🏛️</span>
                <div className="stat-value">{stats.issues}</div>
                <div className="stat-label">Active Issues</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
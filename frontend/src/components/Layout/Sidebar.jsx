import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/student", label: "Students", icon: "🎓" },
    { path: "/book", label: "Books", icon: "📖" },
    { path: "/library", label: "Library", icon: "🏛️" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">📚</div>
        <div>
          <h2>LibraFlow</h2>
          <span className="brand-sub">Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        © 2026 LibraFlow v1.0
      </div>
    </div>
  );
}

export default Sidebar;
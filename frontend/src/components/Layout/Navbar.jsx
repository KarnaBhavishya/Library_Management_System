function Navbar({ title }) {
  return (
    <div className="navbar">
      <h2>{title}</h2>
      <span className="nav-badge">● Online</span>
    </div>
  );
}

export default Navbar;
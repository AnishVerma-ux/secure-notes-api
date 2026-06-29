import "./Navbar.css";

function Navbar({ search, setSearch, openModal }) {
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h2>Dashboard</h2>
        <p>Manage your secure notes</p>
      </div>
      <div className="navbar-actions">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button onClick={openModal}>+ Add note</button>
      </div>
    </div>
  );
}

export default Navbar;
import { Link } from "react-router-dom";

// NavLink compo ???? 

function Navbar() {
  return (
    <nav className="Navb">
      <div className="nav-logo">
        <Link to="/">Couch Cinema</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Homepage</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
    </nav>
  );
}

export default Navbar;
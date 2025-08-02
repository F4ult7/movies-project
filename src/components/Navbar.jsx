import { Link } from "react-router-dom";
import "./../css/Navbar.css";
import logo from "../assets/logo.png"; 

function Navbar() {
  return (
    <nav className="Navb">
      <div className="nav-logo">
        <Link to="/" className="nav-logo-link">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-text">Couch Potato</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Homepage</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
        <Link to="/about" className="nav-link">About</Link>
      </div>
    </nav>
  );
}
export default Navbar;
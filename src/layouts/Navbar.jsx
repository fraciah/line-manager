import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to= "/" className="logo-holder">
        <img src={logo} alt="logo" />
      </Link>
      {navOpen ? (
        <X onClick={toggleNav} className="nav-icon"/>
      ) : (
        <AlignJustify onClick={toggleNav} className="nav-icon"/>
      )}
      <div className={`nav-items ${navOpen ? "show" : "hide"}`}>
        <Link 
          className={`nav-item ${location.pathname === "/how-it-works" ? "active": "inactive"}`} 
          to="/how-it-works"
          onClick={closeNav}
        >How it Works</Link>
      </div>
      <div className={`auth-links ${navOpen ? "show" : "hide"}`}>
        <Link to="/signup" className="auth-link sign-up">Sign Up</Link>
        <Link to="/login" className="auth-link login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar;
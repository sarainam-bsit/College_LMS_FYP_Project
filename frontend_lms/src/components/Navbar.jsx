import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Navbar.css";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false); // Close menu on navigation
  }, [location.pathname]);

  const handleLogoutClick = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    handleLogout && handleLogout();
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/home">
          <img
            src="/logo-removebg-preview (1).png"
            alt="logo"
            style={{ height: '40px', width: 'auto' }}
            className="me-2"
          />
          <span className="fs-5 fw-bold">College LMS</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Glass overlay */}
        {menuOpen && (
          <div
            className="glass-overlay"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

        <div
          className={`offcanvas offcanvas-end text-bg-dark ${menuOpen ? 'show' : ''}`}
          style={{ visibility: menuOpen ? 'visible' : 'hidden', transition: 'transform 0.3s ease-out' }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title mx-3 fs-3"><b>Menu</b></h5>
            <button type="button" className="btn-close btn-close-white fs-5" onClick={() => setMenuOpen(false)}></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {isLoggedIn && (
                <li className="nav-item mb-2">
                  <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
                </li>
              )}

              <li className="nav-item"><Link className="navlink nav-link text-white" to="/profile">Profile</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/home">Home</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/about">About</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/feevoucher">Fee Voucher</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/programs">Programs</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/studentgrades">Grades</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/library">Library</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/libraryform">Apply For Library Card</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/librarycard">Library Card</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/hostel">Hostel</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/hosteladmissionform">Apply For Hostel</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/hostelcancelform">Apply For Hostel Cancelation</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/notifications">Notifications</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/contact">Contact</Link></li>
              <li className="nav-item"><Link className="navlink nav-link text-white" to="/feedbackform">Feedback</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

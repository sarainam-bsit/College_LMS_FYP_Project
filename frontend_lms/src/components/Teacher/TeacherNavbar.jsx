import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Navbar.css"; 

const TeacherNavbar = ({ isLoggedIn, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    handleLogout && handleLogout();
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to={isLoggedIn ? "/teacherdashboard" : "#"}>
          <img
            src="/logo-removebg-preview (1).png"
            alt="logo"
            style={{ height: "40px", width: "auto" }}
            className="me-2"
          />
          <span className="fs-5 fw-bold">College LMS</span>
        </Link>

        <button
          className="navbar-toggler"
          onClick={() => setMenuOpen(!menuOpen)}
          disabled={!isLoggedIn}
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
          className={`offcanvas offcanvas-end text-bg-dark ${menuOpen ? "show" : ""}`}
          style={{
            visibility: menuOpen ? "visible" : "hidden",
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-danger mx-3 fs-3"><b>Menu</b></h5>
            <button type="button" className="btn-close btn-close-white fs-5" onClick={() => setMenuOpen(false)}></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav">
              {isLoggedIn && (
                <li className="nav-item mb-2">
                  <button onClick={handleLogoutClick} className="logout-btn">
                    Logout
                  </button>
                </li>
              )}

              {isLoggedIn && (
                <>
                  <li className="nav-item"><Link className="navlink nav-link" to="/teacherprofile">Profile</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/teacherdashboard">Home</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/about">About</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/teacher/programs">Department</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/teacher/notifications">Notifications</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/teacher/sendnotification">Send Notifications</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/teacher/contact">Contact Us</Link></li>

                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavbar;

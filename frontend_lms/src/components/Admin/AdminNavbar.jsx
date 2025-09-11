import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navbar.css";

const AdminNavbar = ({ handleLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [location.pathname]);

  const handleLogoutClick = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setMenuOpen(false);
    handleLogout && handleLogout();
  };

  return (
    <nav className="navbar navbar-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to={isLoggedIn ? "/adminhome" : "#"}>
          <img
            src="/logo-removebg-preview (1).png"
            className="image-fluid me-2 align-middle"
            alt="logo"
            style={{ height: "40px", width: "auto" }}
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
            <h5 className="offcanvas-title mx-3 fs-3">
              <b>Menu</b>
            </h5>
            <button type="button" className="btn-close btn-close-white fs-5" onClick={() => setMenuOpen(false)}></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {isLoggedIn && (
                <li className="nav-item mb-2">
                  <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
                </li>
              )}

              {isLoggedIn && (
                <>
                  <li className="nav-item"><Link className="navlink nav-link" to="/adminhome">Home</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/about">About</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/feevoucher">Manage Fee Voucher</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/hostelfeevoucher">Manage Hostel Fee Voucher</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/libraryfeevoucher">Manage Library Fee Voucher</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/departments">Manage Programs</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/course-categories">Manage Courses Categories</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/courses">Manage Courses</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/timetable">Manage Timetable</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/hosteldetail">Manage Hostel Details</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/roomdetail">Manage Room Details</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/hostelapplication">Manage Hostel Applications</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/cancelhostelapplication">Manage Cancel Hostel Applications</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/libraryapplications">Manage Library Applications</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/feedback">Manage Feedback</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/contact">Manage Contact</Link></li>
                  <li className="nav-item"><Link className="navlink nav-link" to="/admin/notifications">Send Notifications</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

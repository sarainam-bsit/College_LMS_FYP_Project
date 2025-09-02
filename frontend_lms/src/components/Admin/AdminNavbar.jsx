import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Navbar.css";

const AdminNavbar = ({ isLoggedIn, handleLogout }) => {
  // agar login nahi hai to links disable kar do
  // const linkStyle = !isLoggedIn
  //   ? { pointerEvents: "none", opacity: 0.5 } // disable + faded
  //   : {};

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Brand / Logo */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to={isLoggedIn ? "/adminhome" : "#"}
         
        >
          <img
            src="/logo-removebg-preview (1).png"
            className="image-fluid me-2 align-middle"
            alt="logo"
            style={{ height: "40px", width: "auto" }}
          />
          <span className="fs-5 fw-bold">College LMS</span>
        </Link>
       

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbarAdmin"
          aria-controls="offcanvasNavbarAdmin"
          disabled={!isLoggedIn} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
       
        

        {/* Offcanvas Menu */}
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasNavbarAdmin"
          aria-labelledby="offcanvasNavbarAdminLabel"
        >
           
          
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-danger mx-3 fs-3" id="offcanvasNavbarAdminLabel">
              <b>Menu</b>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white fs-5"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
         

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

              {/* Logout sirf jab login ho */}
              
                <li className="nav-item mb-2">
                  <button
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </li>
             

              {/* Admin Links (disable agar login nahi) */}
              <li className="nav-item">
                <Link className="navlink nav-link" to="/adminhome" >
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navlink nav-link" to="/admin/users" >
                  Manage Users
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navlink nav-link" to="/admin/teachers" >
                  Manage Teachers
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navlink nav-link" to="/admin/students" >
                  Manage Students
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navlink nav-link" to="/admin/programs" >
                  Manage Programs
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navlink nav-link" to="/admin/courses" >
                  Manage Courses
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navlink nav-link" to="/admin/library" >
                  Library Requests
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navlink nav-link" to="/admin/hostel" >
                  Hostel Requests
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navlink nav-link" to="/admin/notifications" >
                  Send Notifications
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navlink nav-link" to="/admin/settings" >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          
        </div>
       
      </div>
    </nav>
  );
};

export default AdminNavbar;

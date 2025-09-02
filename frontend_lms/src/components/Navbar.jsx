import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Navbar.css";


const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/home">
          <img
            src="/logo-removebg-preview (1).png"
            alt="logo"
            style={{ height: '40px', width: 'auto' }}
            className="me-2"
          />
          <span className="fs-5 fw-bold">College LMS</span>
        </Link>

        {/* Navbar Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasStudent"
          aria-controls="offcanvasStudent"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas Menu */}
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasStudent"
          aria-labelledby="offcanvasStudentLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-danger mx-3 fs-3" id="offcanvasStudentLabel">
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
            <ul className="navbar-nav">
              {isLoggedIn && (
                <li className="navbutton nav-item ">
                  <button
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </li>
              )}
              {/* Student Links */}
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/profile">Profile</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/home">Home</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/about">About</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/feevoucher">Fee Voucher</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/programs">BS Programs</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/library">Library</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/libraryform">Apply For Library Card</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/librarycard">Library Card</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/hostel">Hostel</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/hosteladmissionform">Apply For Hostel</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/hostelcancelform">Apply For Hostel Cancelation</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/notifications">Notifications</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/contact">Contact</Link>
              </li>
              <li className="nav-item ">
                <Link className="navlink nav-link text-white" to="/feedbackform">Feedback</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

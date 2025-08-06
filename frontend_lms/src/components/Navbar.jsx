import { Link } from "react-router-dom";
import React from 'react';
const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand  d-flex align-items-center " to=" "><img src="/logo-removebg-preview (1).png" className="image-fluid me-2 align-middle" alt="logo" style={{ height: "40px", width: "auto" }} /> <span className=" fs-5 fw-bold">College LMS</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"> Menu</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link className="dropdown-item" to="/registration">Registration</Link></li>
                  <li><Link className="dropdown-item" to="/login">Login</Link></li>
                  <li><Link className="dropdown-item" to="/login">Logout</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
               <li className="nav-item">
                <Link className="nav-link" to="/feevoucher">Fee Voucher</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/programs">BS Programs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">Short Courses</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Library
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark" >
                  <li><Link className="dropdown-item" to="/library">About Library</Link></li>
                  <li><Link className="dropdown-item" to="/libraryform">Apply for Library Card</Link></li>
                  <li><Link className="dropdown-item" to="/librarycard">Library Card</Link></li>
                </ul>
              </li>
               <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Hostel
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark" >
                  <li><Link className="dropdown-item" to="/hostel">About Hostel</Link></li>
                  <li><Link className="dropdown-item" to="/hostelcancelform">Cancel Hostel Application</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feedbackform">Feedback</Link>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

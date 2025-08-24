import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = ({ isLoggedIn, handleLogout, role }) => {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="">
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
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {isLoggedIn && (
                <li className="nav-item mb-2">
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '16px',
                      padding: '8px 15px',
                      borderRadius: '8px'
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}

              {/* Common Links for both */}
              <li className="nav-item">
                <Link className="nav-link active" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={role === 'teacher' ? '/TeacherDashboard' : '/home'}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>

              {/* Student Links */}
              {role === 'student' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/feevoucher">Fee Voucher</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/programs">BS Programs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="">Short Courses</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/library">Library</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/libraryform">Apply For Library Card</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/librarycard">Library Card</Link>
                  </li>
                  {/* <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Library
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li><Link className="dropdown-item" to="/library">About Library</Link></li>
                      <li><Link className="dropdown-item" to="/libraryform">Apply for Library Card</Link></li>
                      <li><Link className="dropdown-item" to="/librarycard">Library Card</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Hostel
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li><Link className="dropdown-item" to="/hostel">About Hostel</Link></li>
                      <li><Link className="dropdown-item" to="/hostelcancelform">Cancel Hostel Application</Link></li>
                    </ul>
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/feedbackform">Feedback</Link>
                  </li>
                </>
              )}

              {/* Teacher Links */}
              {role === 'teacher' && (
                <>
                <li className="nav-item">
                    <Link className="nav-link" to="/teacher/programs">Department</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/uploadlectures">Upload Lectures</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/UploadTasks">Upload Assignments and Quizzes</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/uploadgrades">Upload Grades</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="">View Student Details</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="">Manage Contact Page</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="">View Teachers Details</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="">Send Notifications</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

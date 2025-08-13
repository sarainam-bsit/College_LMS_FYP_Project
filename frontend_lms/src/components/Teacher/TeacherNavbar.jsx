import React from 'react';
import { Link } from 'react-router-dom';

const TeacherNavbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top"  >
      <div className="container-fluid">
        <Link className="navbar-brand  d-flex align-items-center " to=" "><img src="/logo-removebg-preview (1).png" className="image-fluid me-2 align-middle" alt="logo" style={{ height: "40px", width: "auto" }} /> <span className=" fs-5 fw-bold">College LMS</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel" >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"> Menu</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: 'black',  // chocolate color
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '16px',
                     
                    }}
                   
                  >
                    Logout
                  </button>
                )}
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/TeacherDashboard">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/uploadlectures">Upload Lectures</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">Upload Assignments and Quizzes </Link>
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
                <Link className="nav-link" to="">View teachers Details</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">Send Notifications</Link>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default TeacherNavbar
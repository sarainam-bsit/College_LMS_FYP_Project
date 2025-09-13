// src/components/Admin/AdminHome.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Feedback from "../Feedback";
import Footer from "../Footer";

const AdminHome = () => {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");

 

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
      const timer = setTimeout(() => {
        setSuccessMessage("");
        window.history.replaceState({}, document.title);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <>
      <div className="container-fluid p-0" style={{ marginTop: "65px", minHeight: "90vh" }}>
        <div className="card text-bg-dark border-0">
          {successMessage && (
            <div
              style={{
                position: "fixed",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#4BB543",
                color: "white",
                padding: "15px 30px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                fontWeight: "bold",
                fontSize: "16px",
                zIndex: 9999,
                minWidth: "250px",
                textAlign: "center",
              }}
            >
              {successMessage}
            </div>
          )}

          {/* Carousel */}
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            {/* Dots */}
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            {/* Slides */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/6.jpg"
                  className="d-block w-100 img-fluid"
                  alt="Slide 1"
                  style={{ height: "90vh", objectFit: "cover", filter: "brightness(0.4)" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/picture1.jpeg"
                  className="d-block w-100 img-fluid"
                  alt="Slide 2"
                  style={{ height: "90vh", objectFit: "cover", filter: "brightness(0.4)" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/images.jpg"
                  className="d-block w-100 img-fluid"
                  alt="Slide 3"
                  style={{ height: "90vh", objectFit: "cover", filter: "brightness(0.4)" }}
                />
              </div>
            </div>

            {/* Arrows */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Overlay Content */}
          <div className="card-img-overlay d-flex justify-content-center align-items-center text-center text-white">
            <div className="px-2 px-md-5">
              <h1 className="fw-bold fs-1 fs-md-1">Welcome to Our College LMS</h1>
              <p className="lead d-none d-md-block">
                Learn better. Grow faster. Stay connected with your
                <br /> teachers and college — all in one place.
              </p>
              <p className="lead">
                <Link to="/about" className="btn btn-lg learn-more-btn">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Feedback />
      <Footer />
      <style>{`
        .learn-more-btn {
          background-color: rgb(70, 4, 67);
          color: white;
          border: 1px solid white;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .learn-more-btn:hover {
          background-color: rgb(70, 4, 67);
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default AdminHome;

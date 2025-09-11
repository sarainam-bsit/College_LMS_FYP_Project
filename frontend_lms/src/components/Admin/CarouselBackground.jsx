// src/components/Admin/CarouselBackground.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const CarouselBackground = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      {/* Indicators (dots) */}
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

      {/* Carousel Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/6.jpg"
            className="d-block w-100 img-fluid"
            alt="Slide 1"
            style={{
              height: "100vh",
              objectFit: "cover",
              filter: "brightness(0.4)",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="/picture1.jpeg"
            className="d-block w-100 img-fluid"
            alt="Slide 2"
            style={{
              height: "100vh",
              objectFit: "cover",
              filter: "brightness(0.4)",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="/images.jpg"
            className="d-block w-100 img-fluid"
            alt="Slide 3"
            style={{
              height: "100vh",
              objectFit: "cover",
              filter: "brightness(0.4)",
            }}
          />
        </div>
      </div>

      {/* Controls (arrows) */}
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
  );
};

export default CarouselBackground;

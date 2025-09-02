import { Link } from "react-router-dom";
import React from 'react';
import Feedback from './Feedback';

import Footer from "./Footer";
const Home = () =>{
 
 

  return (
    <>

    <div className="container-fluid p-0" style={{ marginTop: "65px", minHeight: "90vh" }}>
      <div className="card text-bg-dark border-0">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/6.jpg" className="d-block w-100 image-fluid" alt=" " style={{ height: "90vh", objectFit: "cover", filter: "brightness(0.4)" }} />
            </div>
            <div className="carousel-item">
              <img src="/picture1.jpeg" className="d-block w-100 image-fluid" alt=" " style={{ height: "90vh", objectFit: "cover", filter: "brightness(0.4)" }} />
            </div>
            <div className="carousel-item">
              <img src="/images.jpg" className="d-block w-100 image-fluid" alt=" " style={{ height: "90vh", objectFit: "cover", filter: "brightness(0.4)" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="card-img-overlay d-flex justify-content-center align-items-center text-center text-white">
  <div className="px-2 px-md-5">
    <h1 className="fw-bold fs-1 fs-md-1">Welcome to Our College LMS</h1>
    <p className="lead d-none d-md-block">Learn better. Grow faster. Stay connected with your<br /> teachers and college — all in one place.</p>
    <p className="lead">
      <Link to="/about" className="btn btn-lg btn-light fw-bold border-white bg-white">Learn more</Link>
    </p>
  </div>
</div>
      </div>
    </div>
    <Feedback/>
    <Footer />
    </>
  );
}

export default Home;

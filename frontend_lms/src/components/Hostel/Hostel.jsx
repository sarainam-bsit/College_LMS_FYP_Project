import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Hostelroom from './Hostelroom';

const Hostel = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
                <div className="card border-0">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <h2 className="heading text-center mb-4 mt-4 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '300px' }}>
                                Hostel
                            </h2>
                        </div>
                    </div>
                    <div className="card mt-3 bg-light border-0" >
                        <div className="row g-0 flex-column flex-md-row">
                            <div className="col-md-5 d-flex justify-content-center align-items-center p-3">
                                <div className="card  bg-light border-0" >
                                    <div className="card-body">
                                        <h5 className="card-title text-danger fw-bold fs-3">Welcome to Our Hostel</h5>
                                        <p className="card-text">Our college hostel provides a safe, peaceful, and friendly environment for students who come from different cities. It is designed to make students feel at home while focusing on their studies.<br /> The hostel offers comfortable rooms, clean washrooms, a dining hall with healthy food and water supply.<br />We have single, double, and shared rooms with proper ventilation, study tables, and cupboards to keep your belongings safe.</p>
                                    </div>
                                </div>


                            </div>
                            <div className="col-12 col-md-7 mt-3 mt-md-0">
                                <div className="card text-bg-dark border-0 me-5">
                                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src="/6.jpg" className="d-block w-100 image-fluid rounded" alt=" " style={{ height: "440px", filter: "brightness(0.8)" }} />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="/picture1.jpeg" className="d-block w-100 image-fluid rounded" alt=" " style={{ height: "440px", filter: "brightness(0.8)" }} />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="/images.jpg" className="d-block w-100 image-fluid rounded" alt=" " style={{ height: "440px", filter: "brightness(0.8)" }} />
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

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Hostelroom/>
            <Footer />
        </>
    )
}

export default Hostel
import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Library = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid py-4" style={{ marginTop: "80px", minHeight: "90vh", backgroundColor: "#ebeaf2ff" }}>
                <div className="card border-0 shadow-sm rounded-4 p-3" style={{ backgroundColor: "#f5ecf4ff" }}>
                    
                    {/* Heading */}
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <h2
                                className="text-center mb-5 mt-3 fw-bold shadow-sm"
                                style={{
                                    backgroundColor: "rgb(70, 4, 67)",
                                    color: "white",
                                    padding: "12px 20px",
                                    borderRadius: "10px",
                                }}
                            >
                                Library
                            </h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="row g-4 align-items-center">
                        
                        {/* Left Text */}
                        <div className="col-md-5">
                            <div className="card border-0 shadow-sm rounded-4 p-4 h-100"
                                style={{ borderLeft: "5px solid rgb(70, 4, 67)", backgroundColor: "#fff" }}>
                                <h4 className="fw-bold mb-3" style={{ color: "rgb(70, 4, 67)" }}>Welcome to Our Library</h4>
                                <p style={{ lineHeight: "1.7", color: "#333" }}>
                                    Our college library provides a <span className="fw-semibold" style={{ color: "rgb(4, 4, 63)" }}>peaceful</span>, 
                                    <span className="fw-semibold" style={{ color: "rgb(4, 4, 63)" }}> resourceful</span>, and 
                                    <span className="fw-semibold" style={{ color: "rgb(4, 4, 63)" }}> student-friendly</span> environment.  
                                    <br /><br />
                                    Students will find <strong>study materials, digital resources, and reference books</strong> to support their learning journey.  
                                    <br /><br />
                                    The library also has <strong>reading halls, computer access, and catalog services</strong> to ensure a complete learning experience.
                                </p>
                            </div>
                        </div>

                      
                        <div className="col-md-7">
                            <div className="card border-0 shadow-lg rounded-4 overflow-hidden"
                                style={{ border: "3px solid rgb(4, 4, 63)" }}>
                                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                    
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
                                    </div>

                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src="/librarypic11.PNG" className="d-block w-100" alt="Library 1"
                                                style={{ height: "420px", objectFit: "cover", filter: "brightness(0.9)" }} />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="/librarypic12.PNG" className="d-block w-100" alt="Library 2"
                                                style={{ height: "420px", objectFit: "cover", filter: "brightness(0.9)" }} />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="/librarypic13.PNG" className="d-block w-100" alt="Library 3"
                                                style={{ height: "420px", objectFit: "cover", filter: "brightness(0.9)" }} />
                                        </div>
                                    </div>

                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon"></span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon"></span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Library;

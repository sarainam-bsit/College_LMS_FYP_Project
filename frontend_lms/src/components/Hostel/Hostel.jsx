import React from 'react';
import Footer from '../Footer';
import Hostelroom from './Hostelroom';

const Hostel = () => {
    return (
        <>
            
            <div className="container-fluid py-4" style={{ marginTop: "80px", minHeight: "90vh", backgroundColor: "#ebeaf2ff" }}>
                <div className="card border-0 shadow-sm rounded-4 p-3" style={{ backgroundColor: "#f5ecf4ff" }}>
                    
                 
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
                                Hostel
                            </h2>
                        </div>
                    </div>

                   
                    <div className="row g-4 align-items-center">
                        
                        
                        <div className="col-md-5">
                            <div className="card border-0 shadow-sm rounded-4 p-4 h-100"
                                style={{ borderLeft: "5px solid rgb(70, 4, 67)", backgroundColor: "#fff" }}>
                                <h4 className="fw-bold mb-3" style={{ color: "rgb(70, 4, 67)" }}>Welcome to Our Hostel</h4>
                                <p style={{ lineHeight: "1.7", color: "#333" }}>
                                    Our college hostel provides a <span className="fw-semibold" style={{ color: "rgb(4, 4, 63)" }}>safe</span>, 
                                    <span className="fw-semibold" style={{ color: "rgb(4, 4, 63)" }}> peaceful</span>, and 
                                    <span className="fw-semibold" style={{ color: "rgb(4, 4, 63)" }}> friendly</span> environment.  
                                    <br /><br />
                                    We offer <strong>comfortable rooms, clean washrooms, and a dining hall</strong> with healthy food and water supply.  
                                    <br /><br />
                                    Rooms include <strong>single, double, and shared options</strong> with proper ventilation, study tables, and cupboards to keep your belongings safe.
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
                                            <img src="/6.jpg" className="d-block w-100" alt="Hostel 1"
                                                style={{ height: "420px", objectFit: "cover", filter: "brightness(0.9)" }} />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="/picture1.jpeg" className="d-block w-100" alt="Hostel 2"
                                                style={{ height: "420px", objectFit: "cover", filter: "brightness(0.9)" }} />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="/images.jpg" className="d-block w-100" alt="Hostel 3"
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

            <Hostelroom/>
            <Footer />
        </>
    )
}

export default Hostel;

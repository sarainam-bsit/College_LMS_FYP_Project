import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <>
      <Navbar />
      <style>
        {`
          .image:hover {
            transform: scale(1.04);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .section-title {
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .principal-card {
            border: none;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0px 8px 20px rgba(0,0,0,0.2);
          }
          .principal-img {
            border-radius: 50%;
            border: 5px solid #fff;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            width: 200px;
            height: 200px;
            object-fit: cover;
          }
          .about-video {
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 18px rgba(0,0,0,0.25);
           
          }
  
        `}
      </style>

      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>

        {/* 🔹 Principal Section */}
        <div className="text-center my-5">
          <h2 className="section-title bg-dark text-white py-3 px-4 rounded shadow-lg d-inline-block">
            Principal
          </h2>
        </div>

        <div className="card principal-card mx-auto mb-5 p-4 text-center" style={{ maxWidth: "800px" }}>
          <div className="d-flex flex-column align-items-center">
            <img src="/principle.jpg" alt="Principal" className="principal-img mb-4" />
            <h4 className="fw-bold">Prof. Dr. [Name]</h4>
            <h6 className="text-muted">Principal, Government College Civil Lines Sheikhupura</h6>
            <p className="mt-3">
              Our principal leads the institution with vision and dedication, ensuring excellence
              in academics and discipline. The college has a strong legacy of producing bright students
              who serve the nation with pride and commitment.
            </p>
          </div>
        </div>

          {/* 🔹 College Intro with Video */}
        <div className="text-center my-5">
          <h2 className="section-title bg-dark text-white py-3 px-4 rounded shadow-lg d-inline-block">
            About Our College
          </h2>
        </div>

        <div className="row align-items-center mb-5">
          {/* 🎥 Video Box */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div 
              className="about-video"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
                transform: "scale(1)",
                transition: "all 0.4s ease-in-out",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <video
                src="./202508302044.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "fill" }}
              />
            </div>
          </div>

          {/* 📖 Text Box */}
          <div className="col-md-6">
            <div 
              className="p-4 shadow-lg rounded"
              style={{
                background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                borderLeft: "6px solid #0d6efd",
              }}
            >
              <p className="lead mb-3">
                <strong>Government College Civil Lines Sheikhupura</strong> is one of the prestigious institutions
                in the region, committed to providing high-quality education in various fields including
                <em> IT, Physics, Zoology, Islamiyat, English, Mathematics, Statistics, and Economics</em>.
              </p>
              <p className="mb-3">
                Our aim is to develop students not only <strong>academically</strong> but also
                <strong> morally and socially</strong>, preparing them for the challenges of the modern world.
              </p>
             <Link to="/staff">
        <button className="btn btn-primary btn-lg mt-2 shadow">
          Meet My Staff
        </button>
      </Link>
            </div>
          </div>
        </div>

        {/* 🔹 Departments Section (tumhara existing code yahan aa jayega) */}

      </div>

      <Footer />
    </>
  );
};

export default About;

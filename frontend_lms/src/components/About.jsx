import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <style>
        {`
          .Aboutsection-title {
            font-weight: 700;
            text-transform: uppercase;
            background: linear-gradient(135deg, rgb(70, 4, 67), rgb(4, 4, 63)); /* DepartmentAdmin style */
            color: white;
            border-radius: 12px;
            padding: 30px 34px 20px;
            display: inline-block;
            min-width: 220px;
            text-align: center;
            font-size: 2rem;
            letter-spacing: 1px;
            box-shadow: 0px 6px 18px rgba(70, 4, 67, 0.35);
          }
          .principal-card {
            border-radius: 20px;
            overflow: hidden;
            background: #f5ecf4ff; /* Light purple from DepartmentAdmin */
            box-shadow: 0px 6px 18px rgba(0,0,0,0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .principal-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 12px 28px rgba(70,4,67,0.25);
          }
          .principal-img {
            border-radius: 50%;
            border: 6px solid #fff;
            box-shadow: 0 6px 16px rgba(70,4,67,0.35);
            width: 190px;
            height: 190px;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
          .principal-img:hover {
            transform: scale(1.05);
          }
          .about-video {
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 28px rgba(70,4,67,0.35);
            transition: all 0.3s ease-in-out;
          }
          .about-video:hover {
            transform: scale(1.02);
          }
          .about-box {
            background: #ebeaf2ff; /* Same bg from DepartmentAdmin */
            border-left: 6px solid rgb(70, 4, 67); /* Accent */
            border-radius: 18px;
            padding: 30px;
            box-shadow: 0px 8px 20px rgba(0,0,0,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .about-box:hover {
            transform: translateY(-4px);
            box-shadow: 0px 12px 28px rgba(70,4,67,0.2);
          }
          .about-text {
            color: #2c2c7a; /* Purple tone */
            font-size: 1.1rem;
            line-height: 1.85;
            font-weight: 400;
          }
          .modern-btn {
            background: linear-gradient(135deg, rgb(70, 4, 67), rgb(4, 4, 63));
            color: white;
            border-radius: 10px;
            padding: 12px 28px;
            font-weight: 600;
            font-size: 1.05rem;
            transition: all 0.3s ease;
            border: none;
          }
          .modern-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(70, 4, 67, 0.35);
          }
        `}
      </style>

      <div
        className="container p-3"
        style={{ marginTop: "50px", minHeight: "90vh" }}
      >
       
        <div className="text-center my-4 ">
          <h2 className="Aboutsection-title">PRINCIPLE</h2>
        </div>

        <div
          className="card principal-card mx-auto mb-5 p-5 text-center"
          style={{ maxWidth: "750px" }}
        >
          <div className="d-flex flex-column align-items-center">
            <img
              src="/principle.jpg"
              alt="Principal"
              className="principal-img mb-4"
            />
            <h4 className="fw-bold" style={{ color: "rgb(70, 4, 67)" }}>
              Prof. Dr. [Name]
            </h4>
            <h6 className="text-muted">
              Principal, Government College Civil Lines Sheikhupura
            </h6>
            <p className="mt-3 about-text">
              Our principal leads the institution with vision and dedication,
              ensuring excellence in academics and discipline. The college has a
              strong legacy of producing bright students who serve the nation
              with pride and commitment.
            </p>
          </div>
        </div>

       
        <div className="text-center my-5">
          <h2 className="section-title">About Our College</h2>
        </div>

       
        <div
          className="about-video mb-5 mx-auto"
          style={{ maxWidth: "1100px" }}
        >
          <video
            src="./video.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "520px",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        </div>

       
        <div className="about-box mx-auto mb-5" style={{ maxWidth: "1100px" }}>
          <p className="about-text mb-3">
            <strong>Government College Civil Lines Sheikhupura</strong> is one
            of the most prestigious institutions in the region, providing
            high-quality education in diverse fields such as IT, Physics, Zoology, Islamiyat, English, Mathematics, Statistics,
              and Economics.
          </p>
          <p className="about-text mb-4">
            Our mission is to nurture students not only{" "}
            <strong>academically</strong> but also{" "}
            <strong>morally and socially</strong>, preparing them with the
            skills and confidence required to meet the challenges of the modern
            world. 
          </p>
          <div className="text-center">
            <Link to="/staff">
              <button className="modern-btn">Meet My Staff</button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const API_BASE = "http://localhost:8000/library"; // backend API base URL

const Librarycard = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  const cardRef = useRef(); // for download

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const studentId = localStorage.getItem("studentId"); 
        const res = await axios.get(`${API_BASE}/cards/?student_id=${studentId}`);
        const data = res.data;

        const card = Array.isArray(data) ? data[0] : data;
        setCardData(card);

        if (card?.Expiry_Date) {
          const today = new Date();
          const expiryDate = new Date(card.Expiry_Date);

          if (today > expiryDate) {
            setExpired(true);
          }
        }
      } catch (error) {
        console.error("Error fetching library card", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  // 🔽 Download Card as PDF
  const handleDownload = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Library_Card.pdf");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container text-center " style={{ marginTop: "6%" }}>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  if (expired) {
    return (
      <>
        <Navbar />
        <div className="container text-center " style={{ marginTop: "6%" }}>
          <h3 className="text-danger">Your Library Card has Expired </h3>
          <p>Please contact admin for renewal.</p>
        </div>
      </>
    );
  }

  if (!cardData) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <h3>No Library Card Found</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="card border-0">
          <div className="row justify-content-center">
            <div className="col-12 col-md-4 text-center">
              <h2 className="heading mb-3 mt-4 bg-dark text-white py-2 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: "300px" }}>
                Library Card
              </h2>
              {/* 🔽 Download Button */}
              <button onClick={handleDownload} className="btn btn-success mb-4">
                Download Card 📥
              </button>
            </div>
          </div>

          <div className="container mt-3" ref={cardRef}>
            <div className="row justify-content-center">
              <div className="col-12 col-lg-6">
                <div className="card mb-3 bg-light border-0 shadow">
                  <div className="row g-0 flex-column flex-md-row">
                    <div className="col-md-5 d-flex justify-content-center align-items-center">
                      <img
                        src="/logo-removebg-preview (1).png"
                        className="img-fluid rounded-start w-60"
                        style={{ objectFit: "cover" }}
                        alt="..."
                      />
                    </div>
                    <div className="col-md-7 p-4">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-light"><strong>Registration No:</strong> {cardData.Reg_No}</li>
                        <li className="list-group-item bg-light"><strong>Card No:</strong> {cardData.Card_Number}</li>
                        <li className="list-group-item bg-light"><strong>Student Name:</strong> {cardData.Student_Name}</li>
                        <li className="list-group-item bg-light"><strong>Email:</strong> {cardData.Student_Email}</li>
                        <li className="list-group-item bg-light"><strong>Issue Date:</strong> {cardData.Issue_Date}</li>
                        <li className="list-group-item bg-light"><strong>Expiry Date:</strong> {cardData.Expiry_Date}</li>
                        <li className="list-group-item bg-light">Government Graduate College Civil Line SKP</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </>
  );
};

export default Librarycard;

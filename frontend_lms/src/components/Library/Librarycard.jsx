import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const API_BASE = "http://localhost:8000/library";

const Librarycard = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const cardRef = useRef();

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
          if (today > expiryDate) setExpired(true);
        }
      } catch (error) {
        console.error("Error fetching library card", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, []);

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

  if (loading)
    return (
      <>
        
        <div className="container text-center mt-5">Loading...</div>
      </>
    );

  if (expired)
    return (
      <>
        
        <div className="container text-center mt-5">
          <h3 className="text-danger">Your Library Card has Expired</h3>
          <p>Please contact admin for renewal.</p>
        </div>
      </>
    );

  if (!cardData)
    return (
      <>
        
        <div className="container text-center mt-5">
          <h3>No Library Card Found</h3>
        </div>
      </>
    );

  return (
    <>
      
      <div
        className="container p-3"
        style={{ marginTop: "80px", minHeight: "90vh", backgroundColor: "#f7f7f9" }}
      >
        <div
          className="card p-4 shadow-lg"
          style={{
            background: "#fff",
            borderRadius: "20px",
            maxWidth: "700px",
            margin: "0 auto",
            border: "1px solid #e3e3e3",
          }}
        >
          
          <div className="text-center mb-4">
            <h2
              style={{
                maxWidth: "320px",
                margin: "0 auto",
                padding: "12px 20px",
                borderRadius: "15px",
                backgroundColor :"rgb(70, 4, 67)",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              Library Card
            </h2>
            <button
              onClick={handleDownload}
              style={{
                backgroundColor: "rgb(2, 2, 40)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "10px 25px",
                marginTop: "15px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 6px 14px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              Download Card 
            </button>
          </div>

         
          <div ref={cardRef} className="p-3" style={{ backgroundColor: "#fdf6fb", borderRadius: "20px" }}>
            <div className="row g-0 align-items-center">
             
              <div className="col-md-4 text-center mb-3 mb-md-0">
                <img
                  src="/logo-removebg-preview (1).png"
                  alt="College Logo"
                  style={{
                    width: "90%",
                    borderRadius: "15px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              </div>

              <div className="col-md-8">
                <ul
                  className="list-group list-group-flush"
                  style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
                >
                  <li className="list-group-item bg-transparent">
                    <strong>Registration No:</strong> {cardData.Reg_No}
                  </li>
                  <li className="list-group-item bg-transparent">
                    <strong>Card No:</strong> {cardData.Card_Number}
                  </li>
                  <li className="list-group-item bg-transparent">
                    <strong>Student Name:</strong> {cardData.Student_Name}
                  </li>
                  <li className="list-group-item bg-transparent">
                    <strong>Email:</strong> {cardData.Student_Email}
                  </li>
                  <li className="list-group-item bg-transparent">
                    <strong>Issue Date:</strong> {cardData.Issue_Date}
                  </li>
                  <li className="list-group-item bg-transparent">
                    <strong>Expiry Date:</strong> {cardData.Expiry_Date}
                  </li>
                  <li
                    className="list-group-item bg-transparent text-center fw-bold"
                    style={{ color: "#6f42c1", fontSize: "1rem" }}
                  >
                    Government Graduate College Civil Line SKP
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Librarycard;

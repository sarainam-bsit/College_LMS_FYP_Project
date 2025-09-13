import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const API_URL = "http://localhost:8000/fee/fee-voucher/";

function Feevoucher() {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const storedId = localStorage.getItem("studentId");
    if (storedId) {
      fetchVouchers(storedId);
    } else {
      toast.error("Student ID not found. Please login first.");
    }
  }, []);

  const fetchVouchers = async (id) => {
    try {
      const res = await axios.get(API_URL, { params: { student_id: id } });
      setVouchers(res.data);
      if (res.data.length === 0) toast.info("No fee vouchers found.");
    } catch (error) {
      console.error(error);
      toast.error("Error fetching vouchers");
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        marginTop: "6%",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#ebeaf2ff",
        minHeight: "100vh",
        paddingBottom: "50px",
      }}
    >
      {/* Heading */}
      <div
        style={{
          backgroundColor: "rgb(70, 4, 67)",
          color: "white",
          padding: "20px",
          borderRadius: "15px",
          textAlign: "center",
          maxWidth: "400px",
          margin: "0 auto 20px auto",
          fontWeight: "700",
          fontSize: "1.8rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        My Fee Vouchers
      </div>

      {/* Card */}
      <div
        className="card"
        style={{
          backgroundColor: "#f5ecf4ff",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div
          className="card-header text-center fw-bold"
          style={{
            backgroundColor: "rgb(4, 4, 63)",
            color: "white",
            borderRadius: "20px 20px 0 0",
            fontSize: "1.1rem",
          }}
        >
          All My Fee Vouchers
        </div>
        <div className="card-body" style={{ overflowX: "auto" }}>
          <table className="table table-bordered table-hover">
            <thead >
              <tr>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Student Name</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Department</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Category</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Challan No</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Type</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Amount</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Fine Date</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Amount Date</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Fine Amount</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Branch Name</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Paid</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Status</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", textAlign: "center", padding:'7px' }}>Challan Form</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.length > 0 ? (
                vouchers.map((v) => (
                  <tr key={v.id}>
                    <td>{v.Student_Name}</td>
                    <td>{v.Department}</td>
                    <td>{v.Category}</td>
                    <td>{v.Challan_no}</td>
                    <td>{v.Challan_Type}</td>
                    <td>{v.Amount_to_Pay}</td>
                    <td>{v.Fine_Date || "-"}</td>
                    <td>{v.Amount_Date || "-"}</td>
                    <td>{v.Fine_Amount || "-"}</td>
                    <td>{v.Bank_Branch || "-"}</td>
                    <td>{v.Amount_Paid || "-"}</td>
                    <td
                      className={
                        v.Status === "Paid"
                          ? "text-success fw-bold"
                          : "text-danger fw-bold"
                      }
                    >
                      {v.Status}
                    </td>
                    <td className="text-center">
                      <Link to={`/challan-form/${v.id}`} title="View Challan Form">
                        <button
                          className="btn btn-primary btn-sm"
                          style={{
                            backgroundColor: "rgb(4, 4, 63)",
                            border: "none",
                            transition: "transform 0.2s",
                          }}
                          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                        >
                          View Challan
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="text-center text-muted">
                    No vouchers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Feevoucher;

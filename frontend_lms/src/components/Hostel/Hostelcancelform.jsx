import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/hostel/hostelcancelapplication/";

export default function Hostelcancelform() {
  const [formData, setFormData] = useState({
    Student_Name: "",
    Father_Name: "",
    Email: "",
    Department: "",
    Gender: "",
    Room_Type: "",
    Phone_No: "",
    Home_Address: "",
    Reason: "",
  });

  const [applications, setApplications] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const studentId = localStorage.getItem("studentId");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}?student_id=${studentId}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(API_URL, { ...formData, Student_ID: studentId, status: "Pending" });
      setSubmitted(true);
      fetchApplications();
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "7%", minHeight: "80vh" }}>
      {!submitted && (
        <form
          onSubmit={handleSubmit}
          className="card shadow-sm p-4"
          style={{
            backgroundColor: "#f5ecf4ff",
            borderRadius: "12px",
            border: "2px solid white",
          }}
        >
          {/* Heading */}
          <h3
            className="text-center fw-bold mb-3"
            style={{
              backgroundColor: "rgb(70, 4, 67)",
              color: "white",
              padding: "10px 15px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto 20px auto",
            }}
          >
            Hostel Cancel Application Form
          </h3>

          {error && <p className="text-danger text-center">{error}</p>}

          {/* Inputs */}
          <input type="text" name="Student_Name" placeholder="Name" className="form-control mb-2" onChange={handleChange} required />
          <input type="text" name="Father_Name" placeholder="Father Name" className="form-control mb-2" onChange={handleChange} required />
          <input type="email" name="Email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
          <input type="text" name="Department" placeholder="Department" className="form-control mb-2" onChange={handleChange} required />

          <select name="Gender" className="form-select mb-2" required onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select name="Room_Type" className="form-select mb-2" required onChange={handleChange}>
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Triple">Triple</option>
          </select>

          <input type="text" name="Phone_No" placeholder="Phone Number" className="form-control mb-2" onChange={handleChange} required />
          <textarea name="Home_Address" placeholder="Home Address" className="form-control mb-2" onChange={handleChange} required />
          <textarea name="Reason" placeholder="Reason" className="form-control mb-2" onChange={handleChange} required />

          {/* Submit Button */}
          <button
            type="submit"
            className="fw-bold"
            style={{
              backgroundColor: "rgb(70, 4, 67)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              transition: "transform 0.2s",
              width: "100%",
              maxWidth: "400px",
              display: "block",
              margin: "20px auto 0 auto",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Submit Application
          </button>
        </form>
      )}

      {/* Applications Table */}
      <h4
        className="mt-5 text-center fw-bold fs-3 mb-3"
        style={{ color: "rgb(70, 4, 67)" }}
      >
        Your Applications
      </h4>
      <table
        className="table table-bordered mt-4 shadow-sm"
        style={{ textAlign: "center" }}
      >
        <thead>
          <tr>
            <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Email</th>
            <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Room Type</th>
            <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Phone No</th>
            <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No applications found</td>
            </tr>
          ) : (
            applications.map((e) => (
              <tr key={e.id}>
                <td>{e.Email}</td>
                <td>{e.Room_Type}</td>
                <td>{e.Phone_No}</td>
                <td>
                  <span className={`badge ${
                    e.status === "Pending" ? "bg-warning" :
                    e.status === "Approved" ? "bg-success" : "bg-danger"
                  }`}>{e.status}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

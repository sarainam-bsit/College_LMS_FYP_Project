import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/library/libraryform/";

export default function LibraryForm() {
  const [formData, setFormData] = useState({
    gender: "",
    email: "",
    religious: "",
    phone: "",
    home_address: "",
  });

  const [applications, setApplications] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const studentId = localStorage.getItem("studentId");

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(API_URL, formData);
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
    <div
      className="container"
      style={{
        marginTop: "7%",
        minHeight: "80vh",
      }}
    >
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
            Library Card Application
          </h3>

          {error && <p className="text-danger text-center">{error}</p>}

          
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="religious"
            placeholder="Religion"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />
          <textarea
            name="home_address"
            placeholder="Home Address"
            className="form-control mb-2"
            onChange={handleChange}
            required
          />

          
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
            Apply
          </button>
        </form>
      )}

      
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
        <thead >
          <tr>
            <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Email</th>
            <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Gender</th>
            <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Phone</th>
            <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No applications found
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id}>
                <td>{app.email}</td>
                <td>{app.gender}</td>
                <td>{app.phone}</td>
                <td>
                  <span
                    className={`badge ${app.status === "Pending"
                        ? "bg-warning"
                        : app.status === "Approved"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                  >
                    {app.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

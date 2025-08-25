import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/hostel/hostelapplication/";

export default function StudentHostelApplication() {
  const [formData, setFormData] = useState({
    Student_Name: "",
    Father_Name: "",
    Email: "",
    Department: "",
    Gender: "",
    Room_Type: "",
    Phone_No: "",
    Home_Address: "",
  });

  const [applications, setApplications] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const studentId = localStorage.getItem("studentId"); // get student ID from localStorage

  // handle input change
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
      fetchApplications(); // refresh list
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="container mt-5">
      {!submitted && (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
          <h3>Hostel Application Form</h3>
          {error && <p className="text-danger">{error}</p>}

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

          <button type="submit" className="btn btn-primary w-100">Submit Application</button>
        </form>
      )}

      <h4 className="mt-4">Your Applications</h4>
      <table className="table table-bordered mt-2">
        <thead className="table-light">
          <tr>
            
            <th>Email</th>
            <th>Room Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No applications found</td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id}>
                
                <td>{app.Email}</td>
                <td>{app.Room_Type}</td>
                <td>
                  <span className={`badge ${
                    app.status === "Pending" ? "bg-warning" :
                    app.status === "Approved" ? "bg-success" : "bg-danger"
                  }`}>{app.status}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

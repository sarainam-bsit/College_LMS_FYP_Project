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

  // assume student_id is stored in localStorage
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
    <div className="container" style={{ marginTop: "10%" }}>
      {!submitted && (
        <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
          <h3>Library Card Application</h3>
          {error && <p className="text-danger">{error}</p>}

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
          <button type="submit" className="btn btn-primary w-100">
            Apply
          </button>
        </form>
      )}

      <h4 className="mt-4">Your Applications</h4>
      <table className="table table-bordered mt-2">
        <thead className="table-light">
          <tr>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Status</th>
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
                    className={`badge ${
                      app.status === "Pending"
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

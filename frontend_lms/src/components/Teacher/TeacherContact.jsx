import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '../Footer';

const API_CONTACT = "http://127.0.0.1:8000/Contact/contact/"; // backend API

const TeacherContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(API_CONTACT, formData);
      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="card border-0">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <h2
                className="heading text-center mb-5 mt-4 py-3 px-3 mx-auto rounded shadow-lg"
                style={{
                  maxWidth: '250px',
                  backgroundColor: "rgb(70, 4, 67)", // purple theme
                  color: "white",
                  fontWeight: "bold",
                  letterSpacing: "1px"
                }}
              >
                Contact
              </h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div
                className="card mb-3 shadow-lg border-0"
                style={{ backgroundColor: "#f5ecf4ff", borderRadius: "12px" }}
              >
                <div className="row g-0 flex-column flex-md-row">
                  <div className="col-md-6 d-flex justify-content-center align-items-center p-3">
                    <img
                      src="/logo-removebg-preview (1).png"
                      className="img-fluid rounded-start w-50"
                      style={{ objectFit: "cover" }}
                      alt="logo"
                    />
                  </div>

                  <div className="col-md-6 p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Name</label>
                        <input
                          type="text"
                          className="form-control border border-2"
                          style={{ borderColor: "rgb(70, 4, 67)" }}
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Email address</label>
                        <input
                          type="email"
                          className="form-control border border-2"
                          style={{ borderColor: "rgb(70, 4, 67)" }}
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <div className="form-text text-muted">
                          We'll never share your email with anyone else.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Type Your Message Here</label>
                        <textarea
                          className="form-control border border-2"
                          style={{ borderColor: "rgb(70, 4, 67)" }}
                          name="message"
                          rows="3"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: "rgb(70, 4, 67)",
                          color: "white",
                          padding: "10px 20px",
                          borderRadius: "6px",
                          fontWeight: "bold"
                        }}
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Submit"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      {/* Toast Notification */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <Footer/>
    </>
  );
};

export default TeacherContact;

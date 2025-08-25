import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const API_CONTACT = "http://127.0.0.1:8000/Contact/contact/"; // backend API

const TeacherContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Input change handler
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await axios.post(API_CONTACT, formData);
      setSuccess("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="card border-0">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <h2 className="heading text-center mb-5 mt-4 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '300px' }}>
                CONTACT
              </h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="card mb-3 shadow-lg border-0">
                <div className="row g-0 flex-column flex-md-row">
                  <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img
                      src="/logo-removebg-preview (1).png"
                      className="img-fluid rounded-start w-50"
                      style={{ objectFit: "cover" }}
                      alt="..."
                    />
                  </div>

                  <div className="col-md-6 p-4">
                    <form onSubmit={handleSubmit}>
                      {success && <div className="alert alert-success">{success}</div>}
                      {error && <div className="alert alert-danger">{error}</div>}

                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <div className="form-text">We'll never share your email with anyone else.</div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Type Your Message Here</label>
                        <textarea
                          className="form-control"
                          name="message"
                          rows="3"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <button type="submit" className="btn btn-primary" disabled={loading}>
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
      <Footer/>
    </>
  );
}

export default TeacherContact;

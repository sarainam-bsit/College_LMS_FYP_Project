import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API_FEEDBACK = "http://127.0.0.1:8000/Feedback/feedback/";

export default function StudentFeedback() {
    const [formData, setFormData] = useState({
        student_name: "",
        message: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        const data = new FormData();
        data.append("student_name", formData.student_name);
        data.append("message", formData.message);
        if (formData.image) data.append("image", formData.image);

        try {
            await axios.post(API_FEEDBACK, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess("Feedback sent successfully!");
            setFormData({ student_name: "", message: "", image: null }); // Reset form
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5" style={{ minHeight: "80vh" }}>
                <h2 className="mb-4 text-center">📝 Student Feedback</h2>

                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                    <div className="mb-3">
                        <label className="form-label">Your Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="student_name"
                            value={formData.student_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Upload Image (Optional)</label>
                        <input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Sending..." : "Send Feedback"}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

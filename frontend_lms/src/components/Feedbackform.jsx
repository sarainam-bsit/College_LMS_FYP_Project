import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_FEEDBACK = "http://127.0.0.1:8000/Feedback/feedback/";

export default function StudentFeedback() {
    const [formData, setFormData] = useState({
        student_name: "",
        message: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);

   
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("student_name", formData.student_name);
        data.append("message", formData.message);
        if (formData.image) data.append("image", formData.image);

        try {
            await axios.post(API_FEEDBACK, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Feedback sent successfully!");
            setFormData({ student_name: "", message: "", image: null });
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
          
            <div className="container" style={{ minHeight: "80vh" }}>
                <h2
                    className="text-center mb-4 py-2 px-3 mx-auto rounded shadow-lg"
                    style={{
                        marginTop:'8%',
                        maxWidth: "350px",
                        backgroundColor: "rgb(70, 4, 67)",
                        color: "white",
                        fontWeight: "bold",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                >
                    Student Feedback
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="card p-4 shadow-sm mx-auto"
                    style={{
                        maxWidth: "600px",
                        backgroundColor: "#f5ecf4ff",
                        borderRadius: "12px",
                    }}
                >
                    <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Your Name</label>
                        <input
                            type="text"
                            className="form-control border border-2"
                            style={{ borderColor: "rgb(70, 4, 67)" }}
                            name="student_name"
                            value={formData.student_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Message</label>
                        <textarea
                            className="form-control border border-2"
                            style={{ borderColor: "rgb(70, 4, 67)" }}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Upload Image (Optional)</label>
                        <input
                            type="file"
                            className="form-control border border-2"
                            style={{ borderColor: "rgb(70, 4, 67)" }}
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: "rgb(70, 4, 67)",
                            color: "white",
                            fontWeight: "bold",
                            padding: "10px 0",
                            borderRadius: "6px",
                        }}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Feedback"}
                    </button>
                </form>

                <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
            </div>
            <Footer />
        </>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css';

const API_FEEDBACK = "http://127.0.0.1:8000/Feedback/feedback/";

const Feedback = ({ isAdmin = false }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ student_name: "", message: "", image: "" });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API_FEEDBACK, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      // sirf approved feedbacks frontend me show karo
      const approved = res.data.filter(fb => fb.is_approved);
      setFeedbacks(approved);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddFeedback = async () => {
    if (!newFeedback.student_name || !newFeedback.message) return;

    try {
      await axios.post(API_FEEDBACK, newFeedback, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setNewFeedback({ student_name: "", message: "", image: "" });
      // abhi frontend me nahi dikhayenge, sirf admin approve ke baad show hoga
      console.log("Feedback sent to admin for approval");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6">
          <h2 className="heading text-center mb-4 mt-3 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>
            Student Feedback
          </h2>
        </div>
      </div>

      {isAdmin && (
        <div className="mb-4 card p-3 shadow-sm">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Student Name"
            value={newFeedback.student_name}
            onChange={e => setNewFeedback({ ...newFeedback, student_name: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Message"
            value={newFeedback.message}
            onChange={e => setNewFeedback({ ...newFeedback, message: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Image URL (optional)"
            value={newFeedback.image}
            onChange={e => setNewFeedback({ ...newFeedback, image: e.target.value })}
          />
          <button className="btn btn-success" onClick={handleAddFeedback}>Add Feedback</button>
        </div>
      )}

      <div id="feedbackCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {feedbacks.length === 0 ? (
            <p className="text-center">No feedback yet.</p>
          ) : (
            feedbacks.map((fb, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={fb.id}>
                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                  <div className="col">
                    <div className="cardhover card h-100">
                      <img src={fb.image || "/pexels-placeholder.jpg"} className="card-img-top" alt={fb.student_name} />
                      <div className="card-body">
                        <h5 className="card-title">{fb.student_name}</h5>
                        <p className="card-text">{fb.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="prev">
          <span className="custom-arrow"><i className="fa-solid fa-less-than fs-1 text-white"></i></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="next">
          <span className="custom-arrow"><i className="fa-solid fa-greater-than fs-1 text-white"></i></span>
        </button>
      </div>
    </div>
  );
};

export default Feedback;

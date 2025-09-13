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
      console.log("Feedback sent to admin for approval");
    } catch (err) {
      console.error(err);
    }
  };

  
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <div className="container my-5 feedback-section">
      
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6 text-center">
          <h2 className="feedback-title mb-5">Student Feedback</h2>
        </div>
      </div>

      
      {isAdmin && (
        <div className="mb-4 card shadow-lg border-0 feedback-form">
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
          <button className="btn btn-gradient w-100" onClick={handleAddFeedback}>
            Add Feedback
          </button>
        </div>
      )}

     
      <div id="feedbackCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {feedbacks.length === 0 ? (
            <p className="text-center">No feedback yet.</p>
          ) : (
            chunkArray(feedbacks, 3).map((group, groupIndex) => (
              <div className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`} key={groupIndex}>
                <div className="d-flex justify-content-center flex-wrap">
                  {group.map(fb => (
                    <div 
                      key={fb.id} 
                      className="feedback-card"
                    >
                      <div className="card h-100 shadow-sm border-0 cardhover">
                        <img
                          src={fb.image }
                          className="card-img-top feedback-img"
                          alt={fb.student_name}
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title text-gradient">{fb.student_name}</h5>
                          <p className="card-text text-muted">{fb.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

       
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#feedbackCarousel"
          data-bs-slide="prev"
        >
          <span className="custom-arrow shadow"><i className="fa-solid fa-chevron-left"></i></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#feedbackCarousel"
          data-bs-slide="next"
        >
          <span className="custom-arrow shadow"><i className="fa-solid fa-chevron-right"></i></span>
        </button>
      </div>
    </div>
  );
};

export default Feedback;

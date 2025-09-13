import React, { useEffect, useState } from "react";
import axios from "axios";

const API_FEEDBACK = "http://127.0.0.1:8000/Feedback/feedback/";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API_FEEDBACK, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Approve / Add Feedback
  const handleApprove = async (id) => {
    try {
      await axios.put(`${API_FEEDBACK}${id}/approve/`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setFeedbacks(prev =>
        prev.map(fb => fb.id === id ? { ...fb, is_approved: true } : fb)
      );
      console.log("✅ Feedback approved:", id);
    } catch (err) {
      console.error(err);
    }
  };

  // Mark as Seen
  const handleMarkSeen = async (id) => {
    try {
      await axios.put(`${API_FEEDBACK}${id}/mark_seen/`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setFeedbacks(prev =>
        prev.map(fb => fb.id === id ? { ...fb, is_seen: true } : fb)
      );
      console.log("👁️ Feedback marked as seen:", id);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Feedback
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_FEEDBACK}${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setFeedbacks(prev => prev.filter(fb => fb.id !== id));
      console.log(" Feedback deleted:", id);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading feedback...</p>;

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        marginTop: "4%",
        backgroundColor: "#ebeaf2ff",
        color: "rgba(44, 44, 122, 1)",
      }}
    >
      <div
        style={{
          background: "#f5ecf4ff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          margin: "0 auto",
        }}
      >
      <h1
        style={{
          marginBottom: "20px",
          color: "rgba(44, 44, 122, 1)",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Student Feedbacks
      </h1>

      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <table className="table table-bordered shadow-sm">
          <thead className="table">
            <tr>
              <th style={{ backgroundColor: "rgb(70,4,67)", color: "white", fontSize: '20px' }}>ID</th>
              <th style={{ backgroundColor: "rgb(70,4,67)", color: "white", fontSize: '20px' }}>Student Name</th>
              <th style={{ backgroundColor: "rgb(70,4,67)", color: "white", fontSize: '20px' }}>Message</th>
              <th style={{ backgroundColor: "rgb(70,4,67)", color: "white", fontSize: '20px' }}>Received</th>
              <th style={{ backgroundColor: "rgb(70,4,67)", color: "white", fontSize: '20px' }}>Seen</th>
              <th style={{ backgroundColor: "rgb(70,4,67)", color: "white", fontSize: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(fb => (
              <tr key={fb.id}>
                <td>{fb.id}</td>
                <td>{fb.student_name}</td>
                <td>{fb.message}</td>
                <td>{new Date(fb.created_at).toLocaleString()}</td>
                <td>
                  {fb.is_seen ? (
                    "✅ Seen"
                  ) : (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleMarkSeen(fb.id)}
                    >
                      Mark as Seen
                    </button>
                  )}
                </td>
                <td>
                  {!fb.is_approved && 
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleApprove(fb.id)}
                    >
                      Add
                    </button>
                  }
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(fb.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}

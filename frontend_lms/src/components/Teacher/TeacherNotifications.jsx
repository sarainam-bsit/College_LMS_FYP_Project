import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_NOTIFICATIONS = "http://127.0.0.1:8000/Notification/notifications/";

export default function TeacherNotifications() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const teacherId = localStorage.getItem("teacherId");

  const loadNotifications = async () => {
    if (!teacherId) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_NOTIFICATIONS}?teacher_id=${teacherId}`);
      setList(data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // Badge color based on type
  const getBadgeColor = (type) => {
    switch (type) {
      case "general":
        return "bg-secondary";
      case "hostel":
        return "bg-warning text-dark";
      case "fee":
        return "bg-danger";
      case "library":
        return "bg-info text-dark";
      case "event":
        return "bg-success";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#2c2c7a" }}>
        📢 Teacher Notifications
      </h2>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      <div className="row g-4">
        {list.length === 0 && !loading && (
          <div className="col-12 text-center text-muted fs-5">
            No notifications yet
          </div>
        )}

        {list.map((n) => (
          <div key={n.id} className="col-md-6 col-lg-4">
            <div
              className="card shadow-sm border-0 h-100"
              style={{
                borderLeft: `5px solid #2c2c7a`,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
              }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title fw-bold mb-0">{n.title}</h5>
                  <small className="text-muted">
                    {new Date(n.created_at).toLocaleString()}
                  </small>
                </div>
                <p className="card-text">{n.message}</p>
                <span className={`badge ${getBadgeColor(n.type)}`}>{n.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

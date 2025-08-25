import React, { useEffect, useState } from "react";
import axios from "axios";

const API_NOTIFICATIONS = "http://127.0.0.1:8000/Notification/notifications/";

export default function StudentNotifications() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const studentId = localStorage.getItem("studentId");

  const loadNotifications = async () => {
    if (!studentId) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_NOTIFICATIONS}?student_id=${studentId}`
      );
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

  return (
    <div className="container py-4" style={{marginTop: '6%'}}>
      <h2 className="fw-bold text-primary mb-4 text-center">
        📢 My Notifications
      </h2>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading notifications...</p>
        </div>
      )}

      {!loading && list.length === 0 && (
        <div className="alert alert-info text-center shadow-sm">
          No notifications yet 😊
        </div>
      )}

      <div className="row">
        {list.map((n) => (
          <div className="col-md-6 mb-3" key={n.id}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title text-primary fw-bold">{n.title}</h5>
                <p className="card-text">{n.message}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {new Date(n.created_at).toLocaleString()} |{" "}
                    <span className="badge bg-secondary">{n.type}</span>
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_NOTIFICATIONS = "http://127.0.0.1:8000/Notification/notifications/";

export default function TeacherNotifications() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // assume teacherId is saved in localStorage after login
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

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-3 text-primary">📢 Teacher Notifications</h3>

      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      <div className="list-group shadow-sm rounded">
        {list.length === 0 && !loading && (
          <div className="list-group-item text-center text-muted">
            No notifications yet
          </div>
        )}

        {list.map((n) => (
          <div
            key={n.id}
            className="list-group-item list-group-item-action mb-2 rounded shadow-sm border-0"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-1 text-dark fw-semibold">{n.title}</h5>
              <small className="text-muted">
                {new Date(n.created_at).toLocaleString()}
              </small>
            </div>
            <p className="mb-1">{n.message}</p>
            <span className="badge bg-info text-dark">{n.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_NOTIFICATIONS = "http://127.0.0.1:8000/Notification/notifications/";

export default function TeacherNotifications() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    const fetchNotifications = async () => {
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

    fetchNotifications();
  }, [teacherId]); // ESLint satisfied

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
    <div
      className="container py-5"
      style={{ backgroundColor: "#ebeaf2ff", minHeight: "100vh", fontFamily: "Arial, sans-serif", marginTop: '3%' }}
    >
      <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2
              className="heading text-center mb-5 mt-4 py-3 px-3 mx-auto rounded shadow-lg"
              style={{
                maxWidth: '300px',
                backgroundColor: "rgb(70, 4, 67)",
                color: "white",
                fontWeight: "bold",
                letterSpacing: "1px"
              }}
            >
              Notifications
            </h2>
          </div>
        </div>

      {loading && (
        <div className="text-center my-4">
          <div
            className="spinner-border"
            role="status"
            style={{ color: "rgb(70, 4, 67)" }}
          ></div>
        </div>
      )}

      <div className="row g-4">
        {list.length === 0 && !loading && (
          <div className="col-12 text-center fs-5" style={{ color: "rgba(44, 44, 122, 0.7)" }}>
            No notifications yet
          </div>
        )}

        {list.map((n) => (
          <div key={n.id} className="col-md-6 col-lg-4">
            <div
              className="card shadow-sm border-0 h-100"
              style={{
                backgroundColor: "#f5ecf4ff",
                borderLeft: `5px solid rgb(70, 4, 67)`,
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
                  <h5 className="card-title fw-bold mb-0" style={{ color: "rgba(44, 44, 122, 1)" }}>
                    {n.title}
                  </h5>
                  <small className="text-muted">
                    {new Date(n.created_at).toLocaleString()}
                  </small>
                </div>
                <p className="card-text" style={{ color: "rgba(44, 44, 122, 0.9)" }}>{n.message}</p>
                <span className={`badge ${getBadgeColor(n.type)}`} style={{ fontSize: "0.8rem" }}>
                  {n.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

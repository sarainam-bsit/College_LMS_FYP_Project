import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_NOTIFICATIONS = "http://127.0.0.1:8000/Notification/notifications/";
const API_STUDENTS = "http://127.0.0.1:8000/Account/students/";

export default function TeacherSendNotifications() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "general",
    audience: "all_students",
    receiver_student: "",
  });

  const [students, setStudents] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotifications();
    loadStudents();
  }, []);

  const loadNotifications = async () => {
    try {
      const { data } = await axios.get(API_NOTIFICATIONS);
      setList(data);
    } catch {
      toast.error("Failed to fetch notifications");
    }
  };

  const loadStudents = async () => {
    try {
      const { data } = await axios.get(API_STUDENTS);
      setStudents(data);
    } catch {
      console.warn("Students API failed");
    }
  };

  const buildPayload = () => {
    const payload = {
      title: form.title,
      message: form.message,
      type: form.type,
      for_all_students: form.audience === "all_students",
      receiver_student: form.audience === "specific_student" ? form.receiver_student : null,
    };
    return payload;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_NOTIFICATIONS, buildPayload());
      toast.success("Notification sent!");
      setForm({
        title: "",
        message: "",
        type: "general",
        audience: "all_students",
        receiver_student: "",
      });
      await loadNotifications();
    } catch (err) {
      toast.error(
        err?.response?.data?.non_field_errors?.[0] ||
        err?.response?.data?.detail ||
        "Failed to create notification"
      );
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this notification?")) return;
    try {
      await axios.delete(`${API_NOTIFICATIONS}${id}/`);
      toast.success("Notification deleted!");
      await loadNotifications();
    } catch {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        marginTop: "3%",
        backgroundColor: "#ebeaf2ff",
        color: "rgba(44, 44, 122, 1)",
      }}
    >
      <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2
              className="heading text-center mb-5 mt-4 py-3 px-3 mx-auto rounded shadow-lg"
              style={{
                maxWidth: '400px',
                backgroundColor: "rgb(70, 4, 67)",
                color: "white",
                fontWeight: "bold",
                letterSpacing: "1px"
              }}
            >
              Send Notifications
            </h2>
          </div>
        </div>

      <form
        onSubmit={onSubmit}
        style={{
          marginBottom: "30px",
          backgroundColor: "#f5ecf4ff",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid white",
        }}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="fs-5 fw-bold">Title</label>
            <input
              className="form-control"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="fs-5 fw-bold">Type</label>
            <select
              className="form-select"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="general">General</option>
              <option value="hostel">Hostel</option>
              <option value="fee">Fee</option>
              <option value="library">Library</option>
              <option value="event">Event</option>
            </select>
          </div>
          <div className="col-12">
            <label className="fs-5 fw-bold">Message</label>
            <textarea
              className="form-control"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label className="fs-5 fw-bold">Audience</label>
            <div className="d-flex flex-wrap gap-3">
              {[
                ["all_students", "All Students"],
                ["specific_student", "Specific Student"],
              ].map(([value, label]) => (
                <div className="form-check" key={value}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={value}
                    name="audience"
                    value={value}
                    checked={form.audience === value}
                    onChange={(e) =>
                      setForm({ ...form, audience: e.target.value })
                    }
                  />
                  <label className="form-check-label" htmlFor={value}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {form.audience === "specific_student" && (
            <div className="col-md-6">
              <label className="form-label">Select Student</label>
              <select
                className="form-select"
                value={form.receiver_student}
                onChange={(e) =>
                  setForm({ ...form, receiver_student: e.target.value })
                }
                required
              >
                <option value="">-- choose student --</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.Student_Name} ({s.Student_Email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="col-12 d-flex justify-content-end">
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "rgb(70, 4, 67)",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </div>
        </div>
      </form>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", fontSize: '20px' }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Type</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Audience</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Created</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((n) => {
            const audience = n.for_all_students
              ? "All Students"
              : n.receiver_student
              ? `Student #${n.receiver_student}`
              : "-";
            return (
              <tr key={n.id}>
                <td style={{ padding: "10px", border: "1px solid white" }}>
                  <b>{n.title}</b>
                  <div className="small text-muted">{n.message}</div>
                </td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{n.type}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{audience}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>
                  {new Date(n.created_at).toLocaleString()}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <button
                    onClick={() => onDelete(n.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "rgb(4, 4, 63)",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          {list.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No notifications yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
}

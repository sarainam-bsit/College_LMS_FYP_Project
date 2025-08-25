import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_NOTIFICATIONS = "http://127.0.0.1:8000/Notification/notifications/";
const API_STUDENTS = "http://127.0.0.1:8000/Account/students/"; // adjust


export default function AdminNotifications() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "general",
    audience: "all_students", // all_students | specific_student | all_teachers | specific_teacher | everyone
    receiver_student: "",
    for_all_students: false,
   
  });

  const [students, setStudents] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // load users + notifications
  useEffect(() => {
    loadNotifications();
    loadStudents();
    
  }, []);

  const loadNotifications = async () => {
    const { data } = await axios.get(API_NOTIFICATIONS);
    setList(data);
  };

  const loadStudents = async () => {
    try {
      const { data } = await axios.get(API_STUDENTS);
      setStudents(data);
    } catch (e) {
      console.warn("Students API failed", e?.response?.status);
    }
  };

  

  // audience -> flags
  const buildPayload = () => {
    const payload = {
      title: form.title,
      message: form.message,
      type: form.type,
      for_all_students: false,
      receiver_student: null,
    };

    switch (form.audience) {
      case "all_students":
        payload.for_all_students = true;
        break;
      case "specific_student":
        payload.receiver_student = form.receiver_student || null;
        break;
     
      
      default:
        payload.for_all_students = true;
    }

    return payload;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_NOTIFICATIONS, buildPayload());
      setForm({
        title: "",
        message: "",
        type: "general",
        audience: "all_students",
        receiver_student: "",
        for_all_students: false,
    
      });
      await loadNotifications();
      alert("Notification sent!");
    } catch (err) {
      alert(
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
    await axios.delete(`${API_NOTIFICATIONS}${id}/`);
    await loadNotifications();
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">Admin — Notifications</h2>

      <form className="card p-3 shadow-sm mb-4" onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Type</label>
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
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label d-block">Audience</label>
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
                    onChange={(e) => setForm({ ...form, audience: e.target.value })}
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
                onChange={(e) => setForm({ ...form, receiver_student: e.target.value })}
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
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </div>
        </div>
      </form>

      <div className="card shadow-sm">
        <div className="card-header fw-bold">Recent Notifications</div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Audience</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((n) => {
                  const audience =
                    
                      n.for_all_students
                      ? "All Students"
                      : n.receiver_student
                      ? `Student #${n.receiver_student}`
                     
                      : "-";
                  return (
                    <tr key={n.id}>
                      <td>
                        <div className="fw-semibold">{n.title}</div>
                        <div className="small text-muted">{n.message}</div>
                      </td>
                      <td>{n.type}</td>
                      <td>{audience}</td>
                      <td>{new Date(n.created_at).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => onDelete(n.id)}
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
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    Department: "",
    Category: "",
    Course: "",
    Teacher: "",
    Day: "MON",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const API_BASE = "http://127.0.0.1:8000/TimeTable/timetable/";

  // Fetch all data
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [tRes, dRes, cRes, crRes, tchRes] = await Promise.all([
        axios.get(`${API_BASE}`),
        axios.get(`${API_BASE}departments/`),
        axios.get(`${API_BASE}categories/`),
        axios.get(`${API_BASE}courses/`),
        axios.get(`${API_BASE}teachers/`),
      ]);
      setTimetables(tRes.data);
      setDepartments(dRes.data);
      setCategories(cRes.data);
      setCourses(crRes.data);
      setTeachers(tchRes.data);
    } catch {
      setError("Failed to fetch data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      if (editId) {
        await axios.put(`${API_BASE}${editId}/`, form);
        setEditId(null);
      } else {
        await axios.post(`${API_BASE}`, form);
      }
      setForm({ Department: "", Category: "", Course: "", Teacher: "", Day: "MON" });
      fetchAll();
    } catch {
      setError("Failed to save timetable.");
    }
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setForm({
      Department: t.Department,
      Category: t.Category,
      Course: t.Course,
      Teacher: t.Teacher,
      Day: t.Day,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this timetable?")) return;
    try {
      await axios.delete(`${API_BASE}${id}/`);
      fetchAll();
    } catch {
      setError("Failed to delete timetable.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">Manage Timetable</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Form */}
      <div className="card mb-4 shadow-sm p-3">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <select name="Department" value={form.Department} onChange={handleChange} className="form-select" required>
              <option value="">Select Department</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.Department_Name}</option>)}
            </select>
          </div>

          <div className="col-md-3">
            <select name="Category" value={form.Category} onChange={handleChange} className="form-select" required>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.Category_Name}</option>)}
            </select>
          </div>

          <div className="col-md-3">
            <select name="Course" value={form.Course} onChange={handleChange} className="form-select" required>
              <option value="">Select Course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.C_Code}</option>)}
            </select>
          </div>

          <div className="col-md-3">
            <select name="Teacher" value={form.Teacher} onChange={handleChange} className="form-select" required>
              <option value="">Select Teacher</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.Teacher_Name}</option>)}
            </select>
          </div>

          <div className="col-md-2">
            <select name="Day" value={form.Day} onChange={handleChange} className="form-select" required>
              <option value="MON">Monday</option>
              <option value="TUE">Tuesday</option>
              <option value="WED">Wednesday</option>
              <option value="THU">Thursday</option>
              <option value="FRI">Friday</option>
              <option value="SAT">Saturday</option>
            </select>
          </div>

          <div className="col-12 d-flex gap-2">
            <button type="submit" className={`btn ${editId ? "btn-warning" : "btn-primary"}`}>
              {editId ? "Update" : "Add"}
            </button>
            {editId && <button type="button" className="btn btn-secondary" onClick={() => setEditId(null)}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="table-responsive card shadow-sm">
        <table className="table table-striped table-hover mb-0 text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>Department</th>
              <th>Category</th>
              <th>Course Code</th>
              <th>Course</th>
              <th>Teacher</th>
              <th>Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timetables.length === 0 ? (
              <tr><td colSpan={6}>No timetables found</td></tr>
            ) : (
              timetables.map(t => (
                <tr key={t.id}>
                  <td>{t.department_name}</td>
                  <td>{t.category_name}</td>
                  <td>{t.course_code}</td>
                  <td>{t.course_name}</td>
                  <td>{t.teacher_name}</td>
                  <td>{t.Day}</td>
                  <td className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(t)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTimetable;

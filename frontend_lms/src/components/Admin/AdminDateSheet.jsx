// src/components/Admin/AdminDateSheet.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = "http://127.0.0.1:8000/TimeTable";

export default function AdminDateSheet() {
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [datesheets, setDatesheets] = useState([]);

  const [form, setForm] = useState({
    Department: "",
    Category: "",
    Course: "",
    Teacher: "",
    Day: "MON",
    Date: "",
    Start_Time: "",
    End_Time: "",
    is_datesheet: true,
  });

  // ✅ Fetch all data
  const fetchAll = async () => {
    try {
      const [dRes, cRes, crRes, tRes, dsRes] = await Promise.all([
        axios.get(`${API_BASE}/timetable/departments/`),
        axios.get(`${API_BASE}/timetable/categories/`),
        axios.get(`${API_BASE}/timetable/courses/`),
        axios.get(`${API_BASE}/timetable/teachers/`),
        axios.get(`${API_BASE}/datesheet/`),
      ]);
      setDepartments(dRes.data);
      setCategories(cRes.data);
      setCourses(crRes.data);
      setTeachers(tRes.data);
      setDatesheets(dsRes.data.filter((d) => d.is_datesheet === true));
    } catch {
      toast.error("⚠️ Failed to load data.");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ✅ Form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/datesheet/`, form);
      toast.success("✅ Datesheet entry added!");
      setForm({
        Department: "",
        Category: "",
        Course: "",
        Teacher: "",
        Day: "MON",
        Date: "",
        Start_Time: "",
        End_Time: "",
        is_datesheet: true,
      });
      fetchAll();
    } catch {
      toast.error("❌ Failed to add datesheet");
    }
  };

  // ✅ Button style helper
  const buttonStyle = (bg) => ({
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: bg,
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s",
  });

  return (
    <div
      
      style={{
        marginTop: "6%",
        backgroundColor: "#ebeaf2ff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2
        className="text-center"
        style={{ color: "rgba(44, 44, 122, 1)", fontWeight: "bold" }}
      >
        DateSheet
      </h2>

      {/* Form */}
      <div
        style={{
          marginBottom: "30px",
          backgroundColor: "#f5ecf4ff",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid white",
        }}
      >
        <form onSubmit={handleSubmit} className="row g-3">
          {/* Department */}
          <div className="col-md-6">
            <label className="fs-5 fw-bold">Department</label>
            <select
              name="Department"
              value={form.Department}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.Department_Name} - {d.Discription}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label className="fs-5 fw-bold">Category</label>
            <select
              name="Category"
              value={form.Category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  ({c.Related_Department}, {c.Discription}) - {c.Category_Name}
                </option>
              ))}
            </select>
          </div>

          {/* Course */}
          <div className="col-md-6">
            <label className="fs-5 fw-bold">Courses</label>
            <select
              name="Course"
              value={form.Course}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  ({c.Department_Name}, {c.Discription}, {c.Category_Name}) -{" "}
                  {c.C_Code} - {c.C_Title}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div className="col-md-6">
            <label className="fs-5 fw-bold">Teacher</label>
            <select
              name="Teacher"
              value={form.Teacher}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.Teacher_Name}
                </option>
              ))}
            </select>
          </div>

          {/* Day */}
          <div className="col-md-4">
            <label className="fs-5 fw-bold">Day</label>
            <select
              name="Day"
              value={form.Day}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="MON">Monday</option>
              <option value="TUE">Tuesday</option>
              <option value="WED">Wednesday</option>
              <option value="THU">Thursday</option>
              <option value="FRI">Friday</option>
              <option value="SAT">Saturday</option>
            </select>
          </div>

          {/* Date */}
          <div className="col-md-4">
            <label className="fs-5 fw-bold">Date</label>
            <input
              type="date"
              name="Date"
              value={form.Date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Start Time */}
          <div className="col-md-2">
            <label className="fs-5 fw-bold">End Time</label>
            <input
              type="time"
              name="Start_Time"
              placeholder="Start Time"
              value={form.Start_Time}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* End Time */}
          <div className="col-md-2">
            <label className="fs-5 fw-bold">Start Time</label>
            <input
              type="time"
              name="End_Time"
              value={form.End_Time}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-12">
            <button type="submit" style={buttonStyle("rgb(70,4,67)")}>
              Add to Datesheet
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Course Code</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Course</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Teacher</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Day</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {datesheets.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ padding: "10px", border: "1px solid white" }}>
                No datesheet found
              </td>
            </tr>
          ) : (
            datesheets.map((d) => (
              <tr key={d.id}>
                <td style={{ padding: "10px", border: "1px solid white" }}>{d.course_code}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{d.course_name}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{d.teacher_name}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{d.Day}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{d.Date}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>
                  {d.Start_Time} - {d.End_Time}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

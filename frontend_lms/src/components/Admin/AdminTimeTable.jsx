import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


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

  const API_BASE = "http://127.0.0.1:8000/TimeTable/timetable/";

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
      toast.error("Failed to fetch data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_BASE}${editId}/`, form);
        toast.success("Timetable updated successfully!");
        setEditId(null);
      } else {
        await axios.post(`${API_BASE}`, form);
        toast.success("Timetable added successfully!");
      }
      setForm({ Department: "", Category: "", Course: "", Teacher: "", Day: "MON" });
      fetchAll();
    } catch {
      toast.error("Failed to save timetable.");
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
    toast.info(`Editing timetable for ${t.course_name}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this timetable?")) return;
    try {
      await axios.delete(`${API_BASE}${id}/`);
      toast.success("Timetable deleted successfully!");
      fetchAll();
    } catch {
      toast.error("Failed to delete timetable.");
    }
  };

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
        Timetable
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
            <select
              name="Department"
              value={form.Department}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.Department_Name}-{d.Discription}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="col-md-6">
            <select
              name="Category"
              value={form.Category}
              onChange={handleChange}
              required
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
            <select
              name="Course"
              value={form.Course}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  ({c.Department_Name}, {c.Discription}, {c.Category_Name})-{c.C_Code}-{c.C_Title}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div className="col-md-6">
            <select
              name="Teacher"
              value={form.Teacher}
              onChange={handleChange}
              required
              className="form-select"
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
          <div className="col-md-6">
            <select
              name="Day"
              value={form.Day}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="MON">Monday</option>
              <option value="TUE">Tuesday</option>
              <option value="WED">Wednesday</option>
              <option value="THU">Thursday</option>
              <option value="FRI">Friday</option>
              <option value="SAT">Saturday</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-12 d-flex gap-2">
            <button
              type="submit"
              style={buttonStyle(editId ? "rgb(4,4,63)" : "rgb(70,4,67)")}
            >
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                type="button"
                style={buttonStyle("rgb(4,4,63)")}
                onClick={() => {
                  setEditId(null);
                  setForm({ Department: "", Category: "", Course: "", Teacher: "", Day: "MON" });
                  toast.info("Edit cancelled!");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '25px' }}>Department</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Category</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Course Code</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Course</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Teacher</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Day</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timetables.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ padding: "10px", border: "1px solid white" }}>
                No timetables found
              </td>
            </tr>
          ) : (
            timetables.map((t) => (
              <tr key={t.id}>
                <td style={{ padding: "10px", border: "1px solid white" }}>{t.department_name}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{t.category_name}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{t.course_code}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{t.course_name}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{t.teacher_name}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{t.Day}</td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid white",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <button
                    onClick={() => handleEdit(t)}
                    style={buttonStyle("rgb(70,4,67)")}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    style={buttonStyle("rgb(4,4,63)")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTimetable;

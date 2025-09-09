import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/dept/course-categories/";

const CourseCategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    Category_Name: "",
    Category_Type: "",
    Related_Department: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}superadmin_Department/`);
      setDepartments(res.data);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Category_Name: formData.Category_Name,
      Category_Type: formData.Category_Type,
      Related_Department: formData.Related_Department,
    };

    try {
      if (editingId) {
        await axios.put(`${BASE_URL}${editingId}/`, data);
      } else {
        await axios.post(BASE_URL, data);
      }

      setFormData({ Category_Name: "", Category_Type: "", Related_Department: "" });
      setEditingId(null);
      setErrorMessage("");
      fetchCategories();
    } catch (err) {
      setErrorMessage(err.response?.data?.detail || "Error saving category");
    }
  };

  const handleEdit = (cat) => {
    setFormData({
      Category_Name: cat.Category_Name,
      Category_Type: cat.Category_Type,
      Related_Department: cat.Related_Department?.id || "",
    });
    setEditingId(cat.id);
    setErrorMessage("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await axios.delete(`${BASE_URL}${id}/`);
      fetchCategories();
    }
  };

  // --- Styling ---
  const containerStyle = { marginTop: "4%", padding: "30px", fontFamily: "Arial, sans-serif" };
  const formStyle = { marginBottom: "30px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px" };
  const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "bold" };
  const inputStyle = { padding: "8px", width: "100%", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "15px" };
  const buttonStyle = { padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer", marginRight: "10px" };
  const tableStyle = { width: "100%", borderCollapse: "collapse" };
  const thtdStyle = { padding: "10px", border: "1px solid #ddd", textAlign: "center" };
  const headerStyle = { backgroundColor: "#4CAF50", color: "white" };
  const errorStyle = { color: "white", backgroundColor: "red", padding: "10px", borderRadius: "5px", marginBottom: "20px" };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Course Categories Admin</h2>

      {errorMessage && <div style={errorStyle}>{errorMessage}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Category Type:</label>
          <select name="Category_Type" value={formData.Category_Type} onChange={handleChange} style={inputStyle} required>
            <option value="">Select Type</option>
            <option value="INTER">Intermediate</option>
            <option value="BS">Bachelor (Semester)</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Category Name:</label>
          <select name="Category_Name" value={formData.Category_Name} onChange={handleChange} style={inputStyle} required>
            <option value="">Select Name</option>
            <option value="Part 1">Part 1</option>
            <option value="Part 2">Part 2</option>
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 4">Semester 4</option>
            <option value="Semester 5">Semester 5</option>
            <option value="Semester 6">Semester 6</option>
            <option value="Semester 7">Semester 7</option>
            <option value="Semester 8">Semester 8</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Related Department:</label>
          <select name="Related_Department" value={formData.Related_Department} onChange={handleChange} style={inputStyle} required>
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.Department_Name} - {d.Discription}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit" style={{ ...buttonStyle, backgroundColor: "#4CAF50", color: "white" }}>
            {editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              style={{ ...buttonStyle, backgroundColor: "#f44336", color: "white" }}
              onClick={() => setFormData({ Category_Name: "", Category_Type: "", Related_Department: "" })}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            <th style={thtdStyle}>Category Type</th>
            <th style={thtdStyle}>Category Name</th>
            <th style={thtdStyle}>Department</th>
            <th style={thtdStyle}>Discription</th>
            <th style={thtdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td style={thtdStyle}>{c.Category_Type}</td>
              <td style={thtdStyle}>{c.Category_Name}</td>
              <td style={thtdStyle}>{c.Related_Department_Name || "-"}</td>
              <td style={thtdStyle}>{c.Related_Department_Discription || "-"}</td>
              <td style={thtdStyle}>
                <button style={{ ...buttonStyle, backgroundColor: "#2196F3", color: "white" }} onClick={() => handleEdit(c)}>
                  Edit
                </button>
                <button style={{ ...buttonStyle, backgroundColor: "#f44336", color: "white" }} onClick={() => handleDelete(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseCategoriesAdmin;

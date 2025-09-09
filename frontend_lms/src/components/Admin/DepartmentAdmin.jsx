import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/dept/dept_api/";

const DepartmentAdmin = () => {
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    Department_Name: "",
    Discription: "",
    HOD: "",
    Department_Image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setDepartments(res.data);
    } catch (err) {
      console.error("Failed to fetch departments:", err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}superadmin_teachers/`);
      setTeachers(res.data);
    } catch (err) {
      console.error("Failed to fetch teachers:", err.response || err);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Department_Image") {
      setFormData({ ...formData, Department_Image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Department_Name", formData.Department_Name);
    data.append("Discription", formData.Discription);
    if (formData.HOD) data.append("HOD", formData.HOD);
    if (formData.Department_Image) data.append("Department_Image", formData.Department_Image);

    try {
      if (editingId) {
        await axios.put(`${BASE_URL}${editingId}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(BASE_URL, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({ Department_Name: "", Discription: "", HOD: "", Department_Image: null });
      setEditingId(null);
      setErrorMessage("");
      fetchDepartments();
    } catch (err) {
      const backendError = err.response?.data?.HOD || err.response?.data?.detail || "Error saving department";
      setErrorMessage(backendError);
    }
  };

  const handleEdit = (dept) => {
    setFormData({
      Department_Name: dept.Department_Name,
      Discription: dept.Discription,
      HOD: dept.HOD || "",
      Department_Image: null,
    });
    setEditingId(dept.id);
    setErrorMessage("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      await axios.delete(`${BASE_URL}${id}/`);
      fetchDepartments();
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", marginTop: "4%" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Department Admin</h2>

      {/* Error Message */}
      {errorMessage && (
        <div style={{ color: "white", backgroundColor: "red", padding: "10px", marginBottom: "20px", borderRadius: "5px" }}>
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Department Name:</label>
          <input
            type="text"
            name="Department_Name"
            value={formData.Department_Name}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "100%", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Description:</label>
          <textarea
            name="Discription"
            value={formData.Discription}
            onChange={handleChange}
            style={{ padding: "8px", width: "100%", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>HOD (Teacher):</label>
          <select
            name="HOD"
            value={formData.HOD}
            onChange={handleChange}
            style={{ padding: "8px", width: "100%", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select HOD</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.Teacher_Name || t.full_name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Department Image:</label>
          <input type="file" name="Department_Image" onChange={handleChange} />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 20px", marginRight: "10px", borderRadius: "5px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
        >
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => setFormData({ Department_Name: "", Discription: "", HOD: "", Department_Image: null })}
            style={{ padding: "10px 20px", borderRadius: "5px", backgroundColor: "#f44336", color: "white", border: "none", cursor: "pointer" }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#4CAF50", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Description</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>HOD</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Image</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((d) => (
            <tr key={d.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{d.id}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{d.Department_Name}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{d.Discription}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{d.HOD_name || "-"}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {d.Department_Image && <img src={d.Department_Image} alt="dept" width="50" />}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button onClick={() => handleEdit(d)} style={{ marginRight: "5px", padding: "5px 10px" }}>Edit</button>
                <button onClick={() => handleDelete(d.id)} style={{ padding: "5px 10px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentAdmin;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setDepartments(res.data);
    } catch (err) {
      toast.error("Failed to fetch departments");
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}superadmin_teachers/`);
      setTeachers(res.data);
    } catch (err) {
      toast.error("Failed to fetch teachers");
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

    if (!formData.HOD) {
      toast.warning("Please select HOD before saving!");
      return;
    }

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
        toast.success("Department updated successfully!");
      } else {
        await axios.post(BASE_URL, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Department created successfully!");
      }

      setFormData({ Department_Name: "", Discription: "", HOD: "", Department_Image: null });
      setEditingId(null);
      fetchDepartments();
    } catch (err) {
      const backendError =
        (err.response?.data?.HOD && Array.isArray(err.response.data.HOD)
          ? err.response.data.HOD.join(", ")
          : err.response?.data?.HOD) ||
        err.response?.data?.detail ||
        "Error saving department";

      toast.error(backendError);
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

  // Toast info message jab edit click ho
  toast.info(`Editing Department: ${dept.Department_Name}`, {
    
  });
};

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`${BASE_URL}${id}/`);
        toast.success("Department deleted successfully!");
        fetchDepartments();
      } catch (err) {
        toast.error("Failed to delete department");
      }
    }
  };

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
        className="text-center mb-3"
        style={{ color: "rgba(44, 44, 122, 1)", fontWeight: "bold" }}
      >
        Programs
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          backgroundColor: "#f5ecf4ff",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid white", 
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label className="fs-5 fw-bold">Department Name:</label>
          <input
            type="text"
            name="Department_Name"
            value={formData.Department_Name}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label className="fs-5 fw-bold">Description:</label>
          <textarea
            name="Discription"
            value={formData.Discription}
            onChange={handleChange}
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label className="fs-5 fw-bold">HOD (Teacher):</label>
          <select
            name="HOD"
            value={formData.HOD}
            onChange={handleChange}
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
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
          <label className="fs-5 fw-bold">Department Image:</label>
          <input type="file" name="Department_Image" onChange={handleChange} />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            borderRadius: "5px",
            backgroundColor: "rgb(70, 4, 67)",
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          {editingId ? "Update" : "Create"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() =>
              setFormData({ Department_Name: "", Discription: "", HOD: "", Department_Image: null })
            }
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "rgb(4, 4, 63)",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd", fontSize: '25px' }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", fontSize: '25px' }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", fontSize: '25px' }}>Description</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", fontSize: '25px' }}>HOD</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", fontSize: '25px' }}>Image</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", fontSize: '25px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((d) => (
            <tr key={d.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "10px", border: "1px solid white" }}>{d.id}</td>
              <td style={{ padding: "10px", border: "1px solid white" }}>{d.Department_Name}</td>
              <td style={{ padding: "10px", border: "1px solid white" }}>{d.Discription}</td>
              <td style={{ padding: "10px", border: "1px solid white" }}>{d.HOD_name || "-"}</td>
              <td style={{ padding: "10px", border: "1px solid white" }}>
                {d.Department_Image && <img src={d.Department_Image} alt="dept" width="50" />}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button
                  onClick={() => handleEdit(d)}
                  style={{
                    marginRight: "5px",
                    padding: "5px 10px",
                    backgroundColor: "rgb(70, 4, 67)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "rgb(4, 4, 63)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast container */}
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
    </div>
  );
};

export default DepartmentAdmin;

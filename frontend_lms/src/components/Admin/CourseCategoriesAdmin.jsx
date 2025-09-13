import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const fetchCategories = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}superadmin_Department/`);
      setDepartments(res.data);
    } catch (err) {
      toast.error("Failed to fetch departments");
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
        toast.success("Category updated successfully!");
      } else {
        await axios.post(BASE_URL, data);
        toast.success("Category created successfully!");
      }

      setFormData({ Category_Name: "", Category_Type: "", Related_Department: "" });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Error saving category");
    }
  };

  const handleEdit = (cat) => {
    setFormData({
      Category_Name: cat.Category_Name,
      Category_Type: cat.Category_Type,
      Related_Department: cat.Related_Department?.id || "",
    });
    setEditingId(cat.id);

    toast.info(`Editing Category: ${cat.Category_Name}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${BASE_URL}${id}/`);
        toast.success("Category deleted successfully!");
        fetchCategories();
      } catch (err) {
        toast.error("Failed to delete category");
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
        className="text-center"
        style={{ color: "rgba(44, 44, 122, 1)", fontWeight: "bold" }}
      >
        Course Categories
      </h2>
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
          <label className="fs-5 fw-bold">Category Type:</label>
          <select
            name="Category_Type"
            value={formData.Category_Type}
            onChange={handleChange}
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          >
            <option value="">Select Type</option>
            <option value="INTER">Intermediate</option>
            <option value="BS">Bachelor (Semester)</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label className="fs-5 fw-bold">Category Name:</label>
          <select
            name="Category_Name"
            value={formData.Category_Name}
            onChange={handleChange}
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          >
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

        <div style={{ marginBottom: "15px" }}>
          <label className="fs-5 fw-bold">Related Department:</label>
          <select
            name="Related_Department"
            value={formData.Related_Department}
            onChange={handleChange}
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.Department_Name} - {d.Discription}
              </option>
            ))}
          </select>
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
              setFormData({ Category_Name: "", Category_Type: "", Related_Department: "" })
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

      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
            <th style={{ padding: "8px", border: "1px solid white", fontSize: '20px' }}>Category Type</th>
            <th style={{ padding: "8px", border: "1px solid white", fontSize: '20px' }}>Category Name</th>
            <th style={{ padding: "8px", border: "1px solid white", fontSize: '20px' }}>Department</th>
            <th style={{ padding: "8px", border: "1px solid white", fontSize: '25px' }}>Description</th>
            <th style={{ padding: "8px", border: "1px solid white", fontSize: '20px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "10px", border: "1px solid white" }}>{c.Category_Type}</td>
              <td style={{ padding: "10px", border: "1px solid white" }}>{c.Category_Name}</td>
              <td style={{ padding: "10px", border: "1px solid white" }}>
                {c.Related_Department_Name || "-"}
              </td>
              <td style={{ padding: "10px", border: "1px solid white" }}>
                {c.Related_Department_Discription || "-"}
              </td>
              <td style={{ padding: "10px", border: "1px solid white" }}>
                <button
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
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </button>
                <button
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
                  onClick={() => handleDelete(c.id)}
                >
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

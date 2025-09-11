import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "http://127.0.0.1:8000/hostel/"; // Django backend URL

const AdminHostelDetail = () => {
  const [hostels, setHostels] = useState([]);
  const [formData, setFormData] = useState({
    Hostel_Rooms_Name: "",
    Discription: "",
    Hostel_Room_Image: null,
  });
  const [editId, setEditId] = useState(null);

  // Fetch hostel details
  const fetchHostels = async () => {
    try {
      const res = await axios.get(`${API_BASE}hosteldetail/`);
      setHostels(res.data);
    } catch (err) {
      toast.error("Failed to fetch hostel details");
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Hostel_Rooms_Name", formData.Hostel_Rooms_Name);
    data.append("Discription", formData.Discription);
    if (formData.Hostel_Room_Image) {
      data.append("Hostel_Room_Image", formData.Hostel_Room_Image);
    }

    try {
      if (editId) {
        await axios.put(`${API_BASE}hosteldetail/${editId}/`, data);
        toast.success("Hostel updated successfully!");
        setEditId(null);
      } else {
        await axios.post(`${API_BASE}hosteldetail/`, data);
        toast.success("Hostel added successfully!");
      }
      setFormData({ Hostel_Rooms_Name: "", Discription: "", Hostel_Room_Image: null });
      fetchHostels();
    } catch (err) {
      toast.error("Error saving hostel details.");
    }
  };

  // Edit hostel
  const handleEdit = (hostel) => {
    setEditId(hostel.id);
    setFormData({
      Hostel_Rooms_Name: hostel.Hostel_Rooms_Name,
      Discription: hostel.Discription,
      Hostel_Room_Image: null,
    });
    toast.info(`Editing Hostel: ${hostel.Hostel_Rooms_Name}`);
  };

  // Delete hostel
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hostel?")) return;
    try {
      await axios.delete(`${API_BASE}hosteldetail/${id}/`);
      toast.success("Hostel deleted successfully!");
      fetchHostels();
    } catch (err) {
      toast.error("Error deleting hostel.");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        marginTop: "4%",
        backgroundColor: "#ebeaf2ff",
        color: "rgba(44, 44, 122, 1)",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "rgba(44, 44, 122, 1)",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Manage Hostel Details
      </h1>

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
          <label style={{ display: "block", marginBottom: "5px" }}>Hostel Room Name:</label>
          <input
            type="text"
            name="Hostel_Rooms_Name"
            value={formData.Hostel_Rooms_Name}
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
          <label style={{ display: "block", marginBottom: "5px" }}>Description:</label>
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
          <label style={{ display: "block", marginBottom: "5px" }}>Hostel Room Image:</label>
          <input type="file" name="Hostel_Room_Image" onChange={handleChange} />
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
          {editId ? "Update Hostel" : "Add Hostel"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() =>
              setFormData({ Hostel_Rooms_Name: "", Discription: "", Hostel_Room_Image: null })
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

      {/* Hostel Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Description</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Image</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hostels.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: "10px", textAlign: "center" }}>
                No hostel details found
              </td>
            </tr>
          ) : (
            hostels.map((hostel, index) => (
              <tr
                key={hostel.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                }}
              >
                <td style={{ padding: "10px", border: "1px solid white" }}>{hostel.Hostel_Rooms_Name}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{hostel.Discription}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>
                  {hostel.Hostel_Room_Image && (
                    <img src={`${API_BASE}${hostel.Hostel_Room_Image}`} alt="Hostel" width="80" />
                  )}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <button
                    onClick={() => handleEdit(hostel)}
                    style={{
                      marginRight: "5px",
                      padding: "5px 10px",
                      backgroundColor: "orange",
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
                    onClick={() => handleDelete(hostel.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "red",
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHostelDetail;

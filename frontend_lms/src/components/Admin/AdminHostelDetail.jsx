import React, { useState, useEffect } from "react";
import axios from "axios";

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
      console.error(err);
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
        setEditId(null);
      } else {
        await axios.post(`${API_BASE}hosteldetail/`, data);
      }
      setFormData({ Hostel_Rooms_Name: "", Discription: "", Hostel_Room_Image: null });
      fetchHostels();
    } catch (err) {
      console.error(err);
      alert("Error saving hostel details.");
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
  };

  // Delete hostel
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_BASE}hosteldetail/${id}/`);
      fetchHostels();
    } catch (err) {
      console.error(err);
      alert("Error deleting hostel.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Manage Hostel Details</h2>

      {/* Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <input
                type="text"
                name="Hostel_Rooms_Name"
                placeholder="Hostel Room Name"
                value={formData.Hostel_Rooms_Name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="file"
                name="Hostel_Room_Image"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12">
              <textarea
                name="Discription"
                placeholder="Description"
                value={formData.Discription}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12 d-flex gap-2">
              <button type="submit" className={`btn ${editId ? "btn-warning" : "btn-primary"}`}>
                {editId ? "Update Hostel" : "Add Hostel"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditId(null);
                    setFormData({ Hostel_Rooms_Name: "", Discription: "", Hostel_Room_Image: null });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Hostel Table */}
      <div className="table-responsive card shadow-sm">
        <table className="table table-striped table-hover mb-0">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No hostel details found
                </td>
              </tr>
            ) : (
              hostels.map((hostel) => (
                <tr key={hostel.id}>
                  <td>{hostel.Hostel_Rooms_Name}</td>
                  <td>{hostel.Discription}</td>
                  <td>
                    {hostel.Hostel_Room_Image && (
                      <img src={`${API_BASE}${hostel.Hostel_Room_Image}`} alt="Hostel" width="80" />
                    )}
                  </td>
                  <td className="d-flex gap-2">
                    <button onClick={() => handleEdit(hostel)} className="btn btn-sm btn-warning">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(hostel.id)} className="btn btn-sm btn-danger">
                      Delete
                    </button>
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

export default AdminHostelDetail;

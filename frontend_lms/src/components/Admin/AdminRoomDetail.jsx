import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/hostel";

const AdminRoomDetail = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [roomForm, setRoomForm] = useState({
    id: null,
    room_type: "",
    total_room: "",
    booked_room: "",
    available_room: "",
    rent: "",
    ac: false,
    attached_bathroom: false,
    wifi: false,
    tv: false,
    wardrobe: false,
    study_table: false,
    common_area: false,
    mess_facility: false,
    laundry_facility: false,
    description: "",
    room_image: null,
  });

  // Fetch rooms + room types
  const fetchData = async () => {
    try {
      const typeRes = await axios.get(`${API_BASE}/hosteldetail/`);
      const roomRes = await axios.get(`${API_BASE}/roomdetail/`);
      setRoomTypes(typeRes.data);
      setRooms(roomRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setRoomForm({
      id: null,
      room_type: "",
      total_room: "",
      booked_room: "",
      available_room: "",
      rent: "",
      ac: false,
      attached_bathroom: false,
      wifi: false,
      tv: false,
      wardrobe: false,
      study_table: false,
      common_area: false,
      mess_facility: false,
      laundry_facility: false,
      description: "",
      room_image: null,
    });
  };

  const handleSubmit = async () => {
  try {
    const formData = new FormData();

    Object.keys(roomForm).forEach((key) => {
      if (roomForm[key] !== null && roomForm[key] !== "") {
        formData.append(key, roomForm[key]);
      }
    });

    if (roomForm.id) {
      await axios.patch(`${API_BASE}/roomdetail/${roomForm.id}/`, formData);
      alert("Room updated successfully!");
    } else {
      await axios.post(`${API_BASE}/roomdetail/`, formData);
      alert("Room added successfully!");
    }

    resetForm();
    fetchData();
  } catch (err) {
    console.error("Failed to save room:", err.response?.data || err.message);
    alert("Error saving room. Check console.");
  }
};

  const handleEdit = (room) => {
    setRoomForm({
      ...room,
      room_type: room.room_type, // API se ID already aati hai
      room_image: null, // reset image on edit
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      await axios.delete(`${API_BASE}/roomdetail/${id}/`);
      fetchData();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Admin Room Management</h2>

      {/* Form Card */}
      <div className="card shadow-sm p-4 mb-5">
        <h4>{roomForm.id ? "Update Room" : "Add Room"}</h4>

        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <select
              className="form-select"
              value={roomForm.room_type}
              onChange={(e) =>
                setRoomForm({ ...roomForm, room_type: e.target.value })
              }
            >
              <option value="">Select Room Type</option>
              {roomTypes.map((rt) => (
                <option key={rt.id} value={rt.id}>
                  {rt.Hostel_Rooms_Name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Total Rooms"
              value={roomForm.total_room}
              onChange={(e) =>
                setRoomForm({ ...roomForm, total_room: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Booked Rooms"
              value={roomForm.booked_room}
              onChange={(e) =>
                setRoomForm({ ...roomForm, booked_room: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Available Rooms"
              value={roomForm.available_room}
              onChange={(e) =>
                setRoomForm({ ...roomForm, available_room: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Rent"
              value={roomForm.rent}
              onChange={(e) =>
                setRoomForm({ ...roomForm, rent: e.target.value })
              }
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Room Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) =>
              setRoomForm({ ...roomForm, room_image: e.target.files[0] })
            }
          />
        </div>

        {/* Facilities */}
        <div className="mb-3 row g-2">
          {[
            { label: "AC", key: "ac" },
            { label: "Attached Bathroom", key: "attached_bathroom" },
            { label: "WiFi", key: "wifi" },
            { label: "TV", key: "tv" },
            { label: "Wardrobe", key: "wardrobe" },
            { label: "Study Table", key: "study_table" },
            { label: "Common Area", key: "common_area" },
            { label: "Mess", key: "mess_facility" },
            { label: "Laundry", key: "laundry_facility" },
          ].map((f) => (
            <div className="col-md-3 form-check" key={f.key}>
              <input
                type="checkbox"
                className="form-check-input"
                checked={roomForm[f.key]}
                onChange={(e) =>
                  setRoomForm({ ...roomForm, [f.key]: e.target.checked })
                }
                id={f.key}
              />
              <label className="form-check-label" htmlFor={f.key}>
                {f.label}
              </label>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={roomForm.description}
            onChange={(e) =>
              setRoomForm({ ...roomForm, description: e.target.value })
            }
          />
        </div>

        {/* Buttons */}
        <button
          className={`btn ${roomForm.id ? "btn-warning" : "btn-primary"}`}
          onClick={handleSubmit}
        >
          {roomForm.id ? "Update" : "Add"} Room
        </button>
        {roomForm.id && (
          <button className="btn btn-secondary ms-2" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>

      {/* Rooms Table */}
      <div className="card shadow-sm p-3">
        <h4>Rooms List</h4>
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center align-middle mb-0">
            <thead className="table-primary">
              <tr>
                <th>Type</th>
                <th>Total</th>
                <th>Booked</th>
                <th>Available</th>
                <th>Rent</th>
                <th>Image</th>
                <th>AC</th>
                <th>Bathroom</th>
                <th>WiFi</th>
                <th>TV</th>
                <th>Wardrobe</th>
                <th>Study Table</th>
                <th>Common Area</th>
                <th>Mess</th>
                <th>Laundry</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.rooms}</td>
                  <td>{room.total_room}</td>
                  <td>{room.booked_room}</td>
                  <td>{room.available_room}</td>
                  <td>{room.rent}</td>
                  <td>
                    {room.room_image ? (
                      <img
                        src={room.room_image}
                        alt="room"
                        style={{
                          width: "80px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{room.ac ? "✔️" : "❌"}</td>
                  <td>{room.attached_bathroom ? "✔️" : "❌"}</td>
                  <td>{room.wifi ? "✔️" : "❌"}</td>
                  <td>{room.tv ? "✔️" : "❌"}</td>
                  <td>{room.wardrobe ? "✔️" : "❌"}</td>
                  <td>{room.study_table ? "✔️" : "❌"}</td>
                  <td>{room.common_area ? "✔️" : "❌"}</td>
                  <td>{room.mess_facility ? "✔️" : "❌"}</td>
                  <td>{room.laundry_facility ? "✔️" : "❌"}</td>
                  <td>{room.description || "N/A"}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(room)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(room.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRoomDetail;

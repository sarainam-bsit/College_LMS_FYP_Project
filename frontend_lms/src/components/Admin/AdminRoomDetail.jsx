import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

 
  const fetchData = async () => {
    try {
      const typeRes = await axios.get(`${API_BASE}/hosteldetail/`);
      const roomRes = await axios.get(`${API_BASE}/roomdetail/`);
      setRoomTypes(typeRes.data);
      setRooms(roomRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      toast.error("Failed to fetch data from server!");
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
        toast.success("Room updated successfully!");
      } else {
        await axios.post(`${API_BASE}/roomdetail/`, formData);
        toast.success("Room added successfully!");
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error("Failed to save room:", err.response?.data || err.message);
      toast.error("Error saving room. Please check input fields.");
    }
  };

  const handleEdit = (room) => {
    setRoomForm({
      ...room,
      room_type: room.room_type,
      room_image: null,
    });
    toast.info(`Editing Room ID: ${room.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`${API_BASE}/roomdetail/${id}/`);
        toast.success("Room deleted successfully!");
        fetchData();
      } catch (err) {
        console.error("Delete error:", err);
        toast.error("Failed to delete room.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

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
        Room Details
      </h2>

      
      <div style={{ marginBottom: "20px",
          color: "rgba(8, 8, 104, 1)",
         
          fontWeight: "bolder"}}>
        <h4>{roomForm.id ? "Update Room" : "Add Room"}</h4>

        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <select
              className="form-select"
              value={roomForm.room_type}
              onChange={(e) => setRoomForm({ ...roomForm, room_type: e.target.value })}
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
              onChange={(e) => setRoomForm({ ...roomForm, total_room: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Booked Rooms"
              value={roomForm.booked_room}
              onChange={(e) => setRoomForm({ ...roomForm, booked_room: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Available Rooms"
              value={roomForm.available_room}
              onChange={(e) => setRoomForm({ ...roomForm, available_room: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Rent"
              value={roomForm.rent}
              onChange={(e) => setRoomForm({ ...roomForm, rent: e.target.value })}
            />
          </div>
        </div>

        
        <div className="mb-3">
          <label className="form-label">Room Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setRoomForm({ ...roomForm, room_image: e.target.files[0] })}
          />
        </div>

       
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
                onChange={(e) => setRoomForm({ ...roomForm, [f.key]: e.target.checked })}
                id={f.key}
              />
              <label className="form-check-label" htmlFor={f.key}>
                {f.label}
              </label>
            </div>
          ))}
        </div>

       
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={roomForm.description}
            onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
          />
        </div>

        
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

     
      <div className="card shadow-sm p-3">
        <h4>Rooms List</h4>
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center align-middle mb-0">
            <thead >
              <tr>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Type</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Total</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Booked</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Available</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Rent</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Image</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>AC</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Bathroom</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>WiFi</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>TV</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Wardrobe</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Study Table</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Common Area</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Mess</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Laundry</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Description</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", padding: '10px',border: "1px solid #ddd",color: "white", fontSize: '17px' }}>Actions</th>
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
                        style={{ width: "80px", height: "50px", objectFit: "cover" }}
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

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://127.0.0.1:8000/hostel/";

  useEffect(() => {
    axios
      .get(`${API_BASE}roomdetail/`)
      .then((res) => {
        const filtered = res.data.find((r) => r.id === parseInt(id));
        setRoom(filtered || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching room data:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <p
        className="text-center"
        style={{ marginTop: "80px", minHeight: "90vh" }}
      >
        Loading room...
      </p>
    );
  }

  if (!room) {
    return (
      <p
        className="text-center text-danger"
        style={{ marginTop: "80px", minHeight: "90vh" }}
      >
        Room not found.
      </p>
    );
  }

  // Helper to show ✔️ or ❌
  const FacilityItem = ({ label, available, icon }) => (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        available ? "text-success" : "text-danger"
      }`}
    >
      <span>
        <i className={`${icon} me-2`}></i> {label}
      </span>
      {available ? <i className="fa-solid fa-check-circle"></i> : <i className="fa-solid fa-times-circle"></i>}
    </li>
  );

  return (
    <>
      <Navbar />
      <div className="container py-4" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
          <div className="row g-0">
            {/* Left Side - Image */}
            <div className="col-md-5">
              <img
                src={room.room_image ? room.room_image : "/default-room.jpg"}
                className="img-fluid h-100 w-100"
                style={{ objectFit: "cover" }}
                alt={room.rooms}
              />
            </div>

            {/* Right Side - Details */}
            <div className="col-md-7 p-4">
              <h2 className="mb-3 text-primary fw-bold">{room.rooms}</h2>
              <p className="text-muted">{room.description}</p>

              {/* Facilities */}
              <h4 className="text-danger mt-3 mb-2">
                <i className="fa-solid fa-house me-2"></i> Facilities
              </h4>
              <ul className="list-group list-group-flush mb-3">
                <FacilityItem label="Study Table & Chair" available={room.study_table} icon="fa-solid fa-book" />
                <FacilityItem label="Personal Cupboard" available={room.wardrobe} icon="fa-solid fa-box" />
                <FacilityItem label="Attached Bathroom" available={room.attached_bathroom} icon="fa-solid fa-bath" />
                <FacilityItem label="AC / Fan" available={room.ac} icon="fa-solid fa-fan" />
                <FacilityItem label="Wi-Fi Access" available={room.wifi} icon="fa-solid fa-wifi" />
                <FacilityItem label="TV" available={room.tv} icon="fa-solid fa-tv" />
                <FacilityItem label="Common Area" available={room.common_area} icon="fa-solid fa-couch" />
                <FacilityItem label="Mess Facility" available={room.mess_facility} icon="fa-solid fa-utensils" />
                <FacilityItem label="Laundry Facility" available={room.laundry_facility} icon="fa-solid fa-shirt" />
              </ul>

              {/* Room Info - Cards */}
              <div className="row text-center mt-4">
                <div className="col-md-4 mb-3">
                  <div className="card border-0 shadow-sm bg-light">
                    <div className="card-body">
                      <h6 className="text-muted">Booked</h6>
                      <h5 className=" fw-bold">{room.booked_room} </h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card border-0 shadow-sm bg-light">
                    <div className="card-body">
                      <h6 className="text-muted">Total Rooms</h6>
                      <h5 className="fw-bold">{room.total_room}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card border-0 shadow-sm bg-light">
                    <div className="card-body">
                      <h6 className="text-muted">Available</h6>
                      <h5 className="fw-bold text-primary">{room.available_room}</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="card border-0 shadow-sm bg-light">
                    <div className="card-body">
                      <h6 className="text-muted">Rent</h6>
                      <h5 className="fw-bold text-success">{room.rent}</h5>
                    </div>
                  </div>
                </div>
              </div>


              {/* Apply Button */}
              <div className="d-grid mt-4">
                <Link
                  to="/hosteladmissionform"
                  className="btn btn-lg btn-danger shadow-sm"
                >
                  <i className="fa-solid fa-file-pen me-2"></i> Apply Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomDetail;

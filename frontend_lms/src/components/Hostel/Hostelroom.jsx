import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/hostel/"; // Django backend URL

const Hostelroom = () => {
  const [hostels, setHostels] = useState([]);

  const fetchHostels = async () => {
    try {
      const res = await axios.get(`${API_BASE}hosteldetail/`);
      setHostels(res.data);
    } catch (err) {
      console.error("Error fetching hostel data:", err);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  return (
    <>
      <style>{`
        .card-hover:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .image-hover:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2
              className="text-center mb-4 fw-bold shadow-sm"
              style={{
                backgroundColor: "rgb(70, 4, 67)",
                color: "white",
                padding: "12px 20px",
              }}
            >
              Hostel Rooms
            </h2>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3 mb-4">
          {hostels.length === 0 ? (
            <p className="text-center fw-bold" style={{ color: "#4c4c91" }}>No hostel data found</p>
          ) : (
            hostels.map((hostel) => (
              <div className="col" key={hostel.id}>
                <Link to={`/hostel/roomdetail/${hostel.id}`} className="text-decoration-none">
                  <div className="card card-hover h-100 border-0 shadow-sm overflow-hidden" style={{ backgroundColor: "#fff0f5" }}>
                    <img
                      src={
                        hostel.Hostel_Room_Image
                          ? hostel.Hostel_Room_Image.startsWith("http")
                            ? hostel.Hostel_Room_Image
                            : `${API_BASE}${hostel.Hostel_Room_Image}`
                          : ""
                      }
                      className="image-hover card-img-top"
                      alt={hostel.Hostel_Rooms_Name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-primary">{hostel.Hostel_Rooms_Name}</h5>
                      <p className="card-text text-dark" style={{ lineHeight: "1.5" }}>
                        {hostel.Discription}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Hostelroom;

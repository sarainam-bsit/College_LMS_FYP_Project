import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/hostel/"; // Django backend URL

const Hostelroom = () => {
  const [hostels, setHostels] = useState([]);

  // Fetch hostel data from backend
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
        .image:hover{
            transform: scale(1.08);
            transition: transform 0.3s ease;
        }
        .hover:hover{
            transform: scale(1.02);
            transition: transform 0.3s ease;
        }
      `}</style>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mb-2 mt-0 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>
              Hostel Rooms
            </h2>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3 mb-4">
          {hostels.length === 0 ? (
            <p className="text-center">No hostel data found</p>
          ) : (
            hostels.map((hostel) => (
              <div className="col" key={hostel.id}>
                <Link to={`/hostel/roomdetail/${hostel.id}`} className="text-decoration-none">
                  <div className="card">
                    <div className="card-body">
                      <img
                        src={
                          hostel.Hostel_Room_Image
                            ? hostel.Hostel_Room_Image.startsWith("http")
                              ? hostel.Hostel_Room_Image
                              : `${API_BASE}${hostel.Hostel_Room_Image}`
                            : ""
                        }
                        className="image card-img-top img-fluid"
                        alt={hostel.Hostel_Rooms_Name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h5 className="hover card-title fw-bold text-danger">{hostel.Hostel_Rooms_Name}</h5>
                        <p className="card-text">{hostel.Discription}</p>
                      </div>
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

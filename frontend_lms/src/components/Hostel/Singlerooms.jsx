import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import {Link} from 'react-router-dom';

const Singlerooms = () => {
  return (
    <>
      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="card border-0">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <h2 className="heading text-center mb-3 mt-4 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '300px' }}>
                Single Rooms
              </h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="card mb-3  border-0">
                <div className="row g-0 flex-column flex-md-row">

                  <div className="col-md-5 d-flex justify-content-center align-items-center">
                    <img
                      src="/single room.jpg"
                      className="img-fluid rounded-start w-100 "
                      style={{ objectFit: "cover" }}
                      alt="..."
                    />

                  </div>
                  <div className="col-md-7 p-4">
                    <h2 className='text-danger'><i class="fa-solid fa-house"></i> <b>Single Room Facilities</b></h2>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><i class="fa-solid fa-bed"></i> Comfortable Single Bed</li>
                      <li class="list-group-item"><i class="fa-solid fa-book"></i> Study Table & Chair</li>
                      <li class="list-group-item"><i class="fa-solid fa-box"></i> Personal Cupboard</li>
                      <li class="list-group-item"><i class="fa-solid fa-bath"></i> Attached Bathroom</li>
                      <li class="list-group-item"><i class="fa-solid fa-lightbulb"></i> Fan & Lights</li>
                      <li class="list-group-item"><i class="fa-solid fa-wifi"></i> Wi-Fi Access</li>
                      <li class="list-group-item"><i class="fa-solid fa-broom-ball"></i> Room Cleaning Service</li>
                      <li class="list-group-item"><i class="fa-solid fa-trash"></i> One Dustbin for a room</li>
                      <li class="list-group-item text-danger fs-4"><i class="fa-solid fa-door-closed fs-4"></i> <strong>Total Rooms:</strong> <b>50</b></li>
                      <li class="list-group-item text-danger fs-4"><i class="fa-solid fa-lock fs-4" style={{ color: 'brown' }} ></i> <strong>Booked Rooms:</strong> <b>35</b></li>
                      <li class="list-group-item text-danger fs-4"><i class="fa-solid fa-square-check fs-4" style={{ color: 'green' }}></i> <strong>Available Rooms:</strong> <b>15</b></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to="/hosteladmissionform" className="btn btn-danger btn-lg mb-3 me-md-2 px-5 " type="button">Online Apply</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Singlerooms
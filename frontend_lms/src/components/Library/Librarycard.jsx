import React from 'react';
import Navbar from '../Navbar';
const Librarycard = () => {
  return (
    <>
      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="card border-0">
          <div className="row justify-content-center">
            <div className="col-12 col-md-4">
              <h2 className="heading text-center mb-5 mt-4 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '300px' }}>
                Library Card
              </h2>
            </div>
          </div>
          <div className="container mt-3">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-6">
                <div className="card mb-3 bg-light border-0">
                  <div className="row g-0 flex-column flex-md-row">

                    <div className="col-md-5 d-flex justify-content-center align-items-center">
                      <img
                        src="/logo-removebg-preview (1).png"
                        className="img-fluid rounded-start w-60 "
                        style={{ objectFit: "cover" }}
                        alt="..."
                      />

                    </div>
                    <div className="col-md-7 p-4">
                      <ul className="list-group list-group-flush ">
                        <li className="list-group-item bg-light">Registration No</li>
                        <li className="list-group-item  bg-light">Roll No</li>
                        <li className="list-group-item bg-light">Student Name</li>
                        <li className="list-group-item bg-light">Email</li>
                        <li className="list-group-item bg-light ">BS Program</li>
                        <li className="list-group-item  bg-light ">Expiry Date</li>
                        <li className="list-group-item  bg-light ">Government Graduate College Civil Line SKP</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Librarycard
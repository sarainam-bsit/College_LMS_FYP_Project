import React from 'react';
import Navbar from './Navbar';
const ITsemester1lectures = () => {
  return (
    <>



      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mt-4 bg-dark text-white py-1 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Lectures</h2>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">C. Code</th>
                <th scope="col">Course Title</th>
                <th scope="col">Time</th>
                <th scope="col">Date</th>
                <th scope="col">Videos</th>


              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">DI-342</th>
                <td>Web Development</td>
                <td>8:30</td>
                <td>23-06-24</td>
                <td><button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#videoModal">
                 <i className="fa-solid fa-play"></i>
                </button></td>

              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <div className="modal fade modal-xl" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="videoModalLabel">Lecture 1</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="ratio ratio-16x9">
                <iframe src="https://www.youtube.com/embed/oFWsidurgFQ" title="youtube video" allowfullscreen></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ITsemester1lectures
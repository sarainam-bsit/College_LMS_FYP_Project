import React from 'react';
import { Link } from 'react-router-dom';


const Hostelroom = () => {
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
    <div className="container " >
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6">
          <h2 className="heading text-center mb-2 mt-0 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Hostel Rooms</h2>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-3 mb-4">
        <div className="col">
          <Link to="/singlerooms" className='text-decoration-none'>
            <div className="card">
              <div className="card-body">
                <img src="/single room.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <Link to="/singlerooms" className='text-danger'><h5 className="hover card-title fw-bold">Single Room</h5></Link>
                  <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <img src="/double room.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <Link to="/doublerooms" className='text-danger'><h5 className="hover card-title fw-bold">Double Room</h5></Link>
                <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <img src="/multiple room.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <Link to="/dormitoryrooms" className='text-danger'><h5 className="hover card-title fw-bold">Dormitory Room</h5></Link>
                <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    </>
  )
}

export default Hostelroom
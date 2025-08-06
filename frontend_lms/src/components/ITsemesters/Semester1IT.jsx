import React from 'react';
import Navbar from '../Navbar';
import {Link} from 'react-router-dom';
const Semester1IT = () => {
  return (
    <>
    <style>{`
        .headinghover:hover{
        transform: scale(1.04);
        transition: transform 0.3s ease, 
  
        }
        `}
        </style>
      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mt-4 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Semesters 1</h2>
          </div>
        </div>
        <div className="card" style={{marginTop: '60px'}}>
          <div className="card-body">
            <Link to="/ITsemester1timetable" className=' text-danger'><h4 className='headinghover fw-bold text-center'>TimeTable</h4></Link>
          </div>
        </div>
         <div className="card">
          <div className="card-body">
            <Link to="/ITsemester1courses" className=' text-danger'><h4 className='headinghover fw-bold text-center'>Courses</h4></Link>
          </div>
        </div>
         <div className="card">
          <div className="card-body">
            <Link to="/ITsemester1AQ" className=' text-danger'><h4 className='headinghover fw-bold text-center'>Assignments & Quizzes</h4></Link>
          </div>
        </div>
         <div className="card">
          <div className="card-body">
            <Link to="/ITsemester1grades" className=' text-danger'><h4 className='headinghover fw-bold text-center'>Grades</h4></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Semester1IT
import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';
const BSprogram = () => {
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
      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mb-4 mt-4 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>BS Programs</h2>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4 mb-4">
          <div className="col">
            <Link to="/semesterIT" className='text-decoration-none'>
              <div className="card">
                <div className="card-body">
                  <img src="/degree.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <Link to="/semesterIT" className='text-danger'><h5 className="hover card-title fw-bold">BS Information Technology</h5></Link>
                    <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img src="/degree.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <Link to="" className='text-danger'><h5 className="hover card-title fw-bold">BS Zoology</h5></Link>
                  <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img src="/degree.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <Link to="" className='text-danger'><h5 className="hover card-title fw-bold">BS Maths</h5></Link>
                  <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img src="/degree.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <Link to="" className='text-danger'><h5 className="hover card-title fw-bold">BS Physics</h5></Link>
                  <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img src="/degree.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <Link to="" className='text-danger'><h5 className="hover card-title fw-bold">BS Chemistry</h5></Link>
                  <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img src="/degree.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <Link to="" className='text-danger'><h5 className="hover card-title fw-bold">BS English</h5></Link>
                  <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img src="/degree.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <Link to="" className='text-danger'><h5 className="hover card-title fw-bold">BS Urdu</h5></Link>
                  <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img src="/degree.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <Link to="" className='text-danger'><h5 className="hover card-title fw-bold">BS Islamiyat</h5></Link>
                  <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img src="/degree.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <Link to="" className='text-danger'><h5 className="hover card-title fw-bold">BS Economics</h5></Link>
                  <p className="card-text">Semester wise courses, Lectures, Timetable, Teachers Details, Assignments, Quizzes and Grades.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img src="/degree.jpg" className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <Link to="" className='text-danger '><h5 className="hover card-title fw-bold">Short Courses</h5></Link>
                  <p className="card-text">Web Development, Graphic Designing, Digital Marketing, MS Office & Computer Basics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default BSprogram
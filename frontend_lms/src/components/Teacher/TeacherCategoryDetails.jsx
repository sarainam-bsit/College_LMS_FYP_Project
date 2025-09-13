import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const TeacherCategoryDetails = () => {
  const { departmentId, categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!categoryId) return;
    axios
      .get(`http://127.0.0.1:8000/dept/course-categories/${categoryId}/`)
      .then(res => setCategoryName(res.data.Category_Name))
      .catch(err => console.error("Error fetching category name:", err));
  }, [categoryId]);

  return (
    <>
      <style>{`
        .category-card {
          border-radius: 12px;
          border: none;
          background-color: #f5ecf4ff; /* light pink */
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .category-card:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 18px rgba(70, 4, 67, 0.4); /* purple shadow */
        }
        .category-card h4 {
          color: rgb(70, 4, 67); /* purple text */
          margin: 0;
        }
        .heading-main {
          background-color: rgb(70, 4, 67); /* deep purple */
          color: #fff;
          font-weight: bold;
          border-radius: 12px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.35);
        }
      `}</style>

      <div className="container p-3" style={{ marginTop: "80px", minHeight: "90vh", backgroundColor: "#ebeaf2ff" }}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading-main text-center mt-4 py-3 px-3 mx-auto" style={{ maxWidth: '420px' }}>
              {categoryName || "Loading..."}
            </h2>
          </div>
        </div>

        <div className="card category-card mt-4">
          <div className="card-body text-center">
            <Link to={`/teacher/department/${departmentId}/category/${categoryId}/timetable`} className='text-decoration-none'>
              <h4 className='fw-bold'>TimeTable</h4>
            </Link>
          </div>
        </div>

        <div className="card category-card mt-3">
          <div className="card-body text-center">
            <Link to={`/teacher/department/${departmentId}/category/${categoryId}/datesheet`} className='text-decoration-none'>
              <h4 className='fw-bold'>DateSheet</h4>
            </Link>
          </div>
        </div>

        <div className="card category-card mt-3">
          <div className="card-body text-center">
            <Link to={`/teacher/department/${departmentId}/category/${categoryId}/courses`} className='text-decoration-none'>
              <h4 className='fw-bold'>Courses</h4>
            </Link>
          </div>
        </div>

        <div className="card category-card mt-3">
          <div className="card-body text-center">
            <Link to={`/teacher/department/${departmentId}/category/${categoryId}/TaskDetail`} className='text-decoration-none'>
              <h4 className='fw-bold'>Assignments & Quizzes</h4>
            </Link>
          </div>
        </div>

        <div className="card category-card mt-3 mb-4">
          <div className="card-body text-center">
            <Link to={`/teacher/department/${departmentId}/category/${categoryId}/gradeStudents`} className='text-decoration-none'>
              <h4 className='fw-bold'>Grades</h4>
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}

export default TeacherCategoryDetails;

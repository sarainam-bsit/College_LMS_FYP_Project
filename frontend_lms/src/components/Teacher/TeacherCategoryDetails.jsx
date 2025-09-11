import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const TeacherCategoryDetails = () => {
  const { departmentId, categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
 

  // departmentId = "IT", categoryName = "Semester 1" for example
  useEffect(() => {
    if (!categoryId) return;

    // Fetch category name by ID
    axios
      .get(`http://127.0.0.1:8000/dept/course-categories/${categoryId}/`)
      .then(res => setCategoryName(res.data.Category_Name))
      .catch(err => console.error("Error fetching category name:", err));
  }, [categoryId]);

  return (
    <>
      <style>{`
        .headinghover:hover{
          transform: scale(1.04);
          transition: transform 0.3s ease;
        }
      `}</style>

     

      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mt-4 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>
              {categoryName || "Loading..."}
            </h2>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <Link to={`/teacher/department/${departmentId}/category/${categoryId}/timetable`} className='text-danger'>
              <h4 className='headinghover fw-bold text-center'>TimeTable</h4>
            </Link>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">

            <Link
              to={`/teacher/department/${departmentId}/category/${categoryId}/courses`}
              className='text-danger'
            >
              <h4 className='headinghover fw-bold text-center'>Courses</h4>
            </Link>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <Link to={`/teacher/department/${departmentId}/category/${categoryId}/TaskDetail`} className='text-danger'>
              <h4 className='headinghover fw-bold text-center'>Assignments & Quizzes</h4>
            </Link>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <Link to={`/teacher/department/${departmentId}/category/${categoryId}/gradeStudents`} className='text-danger'>
              <h4 className='headinghover fw-bold text-center'>Grades</h4>
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}

export default TeacherCategoryDetails;

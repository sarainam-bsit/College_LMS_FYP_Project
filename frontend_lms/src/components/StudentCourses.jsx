import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const StudentCourses = () => {
  const { departmentId, categoryId } = useParams(); // URL se le raha hai
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const API_BASE = "http://127.0.0.1:8000/Course/courses/";

  useEffect(() => {
    const studentId = localStorage.getItem("studentId"); // student id login ke time save hogi

    if (!studentId) {
      setError("Student not found. Please login again.");
      return;
    }
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE}courses_by_student/`, {
          params: {
              student_id: studentId,
              department_id: departmentId,
              category_id: categoryId,
            },
        });
        setCourses(res.data);
      } catch (err) {
  if (err.response && err.response.data && err.response.data.error) {
    setError(err.response.data.error);
  } else {
    setError("Error fetching timetable.");
  }
}
    };

    if (departmentId && categoryId ) {
      fetchCourses();
    }
  }, [departmentId, categoryId]);

  return (
    <>
      <Navbar />
      <div
        className="container p-1 text-center"
        style={{ marginTop: "80px", minHeight: "90vh" }}
      >
        <h2 className="text-primary mb-4">My Courses</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive card shadow-sm">
          <table className="table table-striped table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Credit Hours</th>
                <th>Category</th>
                <th>Actions</th> {/* New column */}
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={6}>No courses found</td>
                </tr>
              ) : (
                courses.map((course, index) => (
                  <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>{course.C_Code}</td>
                    <td>{course.C_Title}</td>
                    <td>{course.Credit_Hour}</td>
                    <td>{course.C_Category_Full}</td>
                    <td>
                      <Link
                        to={`/course/${course.id}/lectures/`}
                        className="btn btn-sm btn-primary"
                      >
                        📚 View Lectures
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentCourses;

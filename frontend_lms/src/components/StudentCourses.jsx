import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const StudentCourses = () => {
  const { departmentId, categoryId } = useParams();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const API_BASE = "http://127.0.0.1:8000/Course/courses/";

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

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
          setError("Degree Completed.");
        }
      }
    };

    if (departmentId && categoryId) {
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
        {/* Heading */}
        <h2
          className="mb-4 py-2 px-3 mx-auto rounded shadow-lg"
          style={{
            maxWidth: "350px",
            backgroundColor: "rgb(70, 4, 67)", // deep purple
            color: "white",
            fontWeight: "bold",
          }}
        >
          My Courses
        </h2>

        {/* Error */}
        {error && (
          <div className="alert alert-danger shadow-sm">{error}</div>
        )}

        {/* Table */}
        <div className="table-responsive card shadow-lg mt-3">
          <table className="table table-bordered table-hover text-center align-middle mb-0">
            <thead>
              <tr>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>#</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Course Code</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Course Title</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Credit Hours</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Category</th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-3">
                    No courses found
                  </td>
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
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "rgb(4, 4, 63)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        View Lectures
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

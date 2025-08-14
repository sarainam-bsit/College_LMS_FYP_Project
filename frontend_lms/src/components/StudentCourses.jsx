import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";


const StudentCourses = () => {
  const { departmentId, categoryId } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!departmentId || !categoryId) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `http://127.0.0.1:8000/Course/courses/courses_by_department_category/`,
          {
            params: { department_id: departmentId, category_id: categoryId },
          }
        );

        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [departmentId, categoryId]);

  return (
    <div className="container " style={{ marginTop: "80px", minHeight: "80vh" }}>
      <h2 className="text-center mb-4 fw-bold">Courses</h2>

      {/* Loading */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading courses...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* No courses */}
      {!loading && courses.length === 0 && !error && (
        <p className="text-center text-muted mt-4">No courses found.</p>
      )}

      {/* Courses Table */}
      {!loading && courses.length > 0 && (
        <div className="table-responsive shadow-lg rounded">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Department</th>
                <th>Category</th>
                <th>Teacher</th>
                <th>Lectures</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="text-center">
                  <td>{course.C_Code}</td>
                  <td>{course.C_Title}</td>
                  <td>{course.C_Department}</td>
                  <td>{course.C_Category_Full}</td>
                  <td>{course.Teacher}</td>
                  <td>
                    <Link
                      to={`/course/${course.id}/lectures`}
                      className="btn btn-sm btn-primary"
                    >
                      View Lectures
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;

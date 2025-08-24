import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const StudentGrades = () => {
  const [gradeData, setGradeData] = useState({ semesters: [], CGPA: 0 });
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(
        `http://127.0.0.1:8000/Grade/student-history/student_grades/?student_id=${studentId}`
      )
      .then((res) => {
        setGradeData({
          semesters: res.data.semesters || [],
          CGPA: res.data.CGPA || 0,
        });
      })
      .catch((err) => console.error("Error fetching grades:", err));
  }, [studentId]);

  return (
    <div className="container mt-4">
      <h1 className="display-6 mb-4 text-center">My Gradebook</h1>

      {(!gradeData.semesters || gradeData.semesters.length === 0) ? (
        <p className="text-center text-muted">No grades uploaded yet.</p>
      ) : (
        <>
          {gradeData.semesters.map((semester, index) => (
            <div key={index} className="mb-5 p-4 border rounded shadow-sm bg-light">
              <h2 className="h5 mb-3">
                Department: <span className="fw-bold">{semester.department}</span> | 
                Category: <span className="fw-bold">{semester.category}</span>
              </h2>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-secondary">
                    <tr className="text-center">
                      <th>Course Code</th>
                      <th>Course Title</th>
                      <th>Credit Hour</th>
                      <th>Course Total</th>
                      <th>Course Obtained</th>
                      <th>Sessional Total</th>
                      <th>Sessional Obtained</th>
                      <th>Grade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(semester.courses || []).map((course, i) => (
                      <tr key={i} className="text-center">
                        <td>{course.course_code}</td>
                        <td className="text-start">{course.course_title}</td>
                        <td>{course.credit_hour}</td>
                        <td>{course.course_total}</td>
                        <td>{course.course_obtained}</td>
                        <td>{course.sessional_total}</td>
                        <td>{course.sessional_obtained}</td>
                        <td className={course.grade === "F" ? "text-danger fw-bold" : ""}>{course.grade}</td>
                        <td className={course.status === "Supply" ? "text-danger fw-bold" : "text-success"}>{course.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(semester.supply_courses || []).length > 0 && (
                <div className="mt-2 text-danger fw-bold">
                  Supply Courses: {(semester.supply_courses || []).join(", ")}
                </div>
              )}

              <div className="mt-3 p-3 border rounded bg-white shadow-sm">
                <div className="row text-center">
                  <div className="col-md-4 mb-2 mb-md-0">
                    <span className="fw-semibold">Total Obtained:</span> <span className="fw-bold">{semester.total_obtained}</span> / <span className="fw-bold">{semester.total_max}</span>
                  </div>
                  <div className="col-md-4 mb-2 mb-md-0">
                    <span className="fw-semibold">GPA:</span> <span className="fw-bold">{semester.GPA}</span>
                  </div>
                  <div className="col-md-4">
                    <span className="fw-semibold">Pending Courses:</span> <span className="fw-bold">{semester.pending_courses || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 text-center fw-bold fs-5">
            Overall CGPA: <span className="text-primary">{gradeData.CGPA}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentGrades;

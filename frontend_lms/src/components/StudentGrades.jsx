import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
        });
      })
      .catch((err) => console.error("Error fetching grades:", err));
  }, [studentId]);

  return (
    <div
      className="container p-3"
      style={{
        marginTop: "80px",
        minHeight: "90vh",
        backgroundColor: "#ebeaf2ff", // light background like DeptAdmin
        borderRadius: "12px",
      }}
    >
      {/* Heading */}
      <h2
        className="mb-4 py-2 px-3 mx-auto rounded shadow"
        style={{
          maxWidth: "380px",
          backgroundColor: "rgb(70, 4, 67)", // deep purple
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        My Gradebook
      </h2>

      {!gradeData.semesters || gradeData.semesters.length === 0 ? (
        <p className="text-center text-muted fs-5">No grades uploaded yet.</p>
      ) : (
        <>
          {gradeData.semesters.map((semester, index) => (
            <div
              key={index}
              className="mb-5 p-4 rounded shadow-lg"
              style={{
                backgroundColor: "#f5ecf4ff", // soft pinkish like DeptAdmin form
                border: "2px solid white",
              }}
            >
              {/* Semester Info */}
              <h4
                className="mb-3 py-2 px-3 rounded"
                style={{
                  backgroundColor: "rgba(216, 216, 241, 1)", // dark navy
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: 'rgba(6, 6, 63, 1)'
                }}
              >
                Department:{" "}
                <span className="fw-bold">{semester.department}</span> | Category:{" "}
                <span className="fw-bold">{semester.category}</span>
              </h4>

              {/* Table */}
              <div className="table-responsive card shadow-sm mt-3">
                <table className="table table-bordered align-middle mb-0 text-center">
                  <thead>
                    <tr >
                      <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Course Code</th>
                      <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Course Title</th>
                      <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Credit Hour</th>
                      <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Course Total</th>
                      <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Course Obtained</th>
                      <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Sessional Total</th>
                      <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Sessional Obtained</th>
                      <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Grade</th>
                      <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(semester.courses || []).map((course, i) => (
                      <tr key={i}>
                        <td>{course.course_code}</td>
                        <td className="text-start">{course.course_title}</td>
                        <td>{course.credit_hour}</td>
                        <td>{course.course_total}</td>
                        <td>{course.course_obtained}</td>
                        <td>{course.sessional_total}</td>
                        <td>{course.sessional_obtained}</td>
                        <td
                          className={
                            course.grade === "F"
                              ? "text-danger fw-bold"
                              : "fw-semibold"
                          }
                        >
                          {course.grade}
                        </td>
                        <td
                          className={
                            course.status === "Supply"
                              ? "text-danger fw-bold"
                              : "text-success fw-semibold"
                          }
                        >
                          {course.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Supply Courses */}
              {(semester.supply_courses || []).length > 0 && (
                <div className="mt-3 text-danger fw-bold text-start">
                  Supply Courses: {(semester.supply_courses || []).join(", ")}
                </div>
              )}

              {/* Summary Box */}
              <div
                className="mt-3 p-3 rounded shadow-sm"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div className="row text-center">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <span className="fw-semibold">Total Obtained:</span>{" "}
                    <span className="fw-bold">{semester.total_obtained}</span> /{" "}
                    <span className="fw-bold">{semester.total_max}</span>
                  </div>
                  <div className="col-md-6">
                    <span className="fw-semibold">Pending Courses:</span>{" "}
                    <span className="fw-bold">
                      {semester.pending_courses || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default StudentGrades;

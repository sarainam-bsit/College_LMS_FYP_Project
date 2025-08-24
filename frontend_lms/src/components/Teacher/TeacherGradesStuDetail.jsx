
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const TeacherGradesStuDetail = () => {
  const { courseId } = useParams();
  const teacherId = localStorage.getItem("teacherId");

  const [normalStudents, setNormalStudents] = useState([]);
  const [supplyStudents, setSupplyStudents] = useState([]);

  useEffect(() => {
    if (!teacherId || !courseId) return;

    axios
      .get(
        `http://127.0.0.1:8000/Grade/grades/students_by_course/?teacher_id=${teacherId}&course_id=${courseId}`
      )
      .then((res) => {
        setNormalStudents(res.data.normal_students || []);
        setSupplyStudents(res.data.supply_students || []);
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, [teacherId, courseId]);

  return (
    <div className="container" style={{marginTop: '6%'}}>
      <h2 className="mb-5 text-center fw-bold text-primary">
        Students for Selected Course
      </h2>

      {/* Normal Students */}
      {normalStudents.length > 0 && (
        <div className="mb-5">
          <h4 className="text-center mb-4 text-success">Regular Students</h4>
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registration No</th>
                    <th>Roll No</th>
                    <th>Upload Grades</th>
                  </tr>
                </thead>
                <tbody>
                  {normalStudents.map((stu, index) => (
                    <tr key={`n-${index}`}>
                      <th>{index + 1}</th>
                      <td>{stu.Student_Name}</td>
                      <td>{stu.Student_Email}</td>
                      <td>{stu.Reg_No}</td>
                      <td>{stu.Roll_No}</td>
                      <td>
                        <Link
                          to="/teacher/uploadstudentgrades"
                          state={{ student: stu, courseId: courseId }}
                          className="btn btn-sm btn-primary"
                        >
                          Upload Grades
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Supply Students */}
      {supplyStudents.length > 0 && (
        <div className="mb-5">
          <h4 className="text-center mb-4 text-danger">Supply Students</h4>
          <div className="card shadow-sm border-danger">
            <div className="card-body p-0">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-secondary">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registration No</th>
                    <th>Roll No</th>
                    <th>Upload Grades</th>
                  </tr>
                </thead>
                <tbody>
                  {supplyStudents.map((stu, index) => (
                    <tr key={`s-${index}`} className="fw-bold">
                      <th>{index + 1}</th>
                      <td>{stu.Student_Name} (Supply)</td>
                      <td>{stu.Student_Email}</td>
                      <td>{stu.Reg_No}</td>
                      <td>{stu.Roll_No}</td>
                      <td>
                        <Link
                          to="/teacher/uploadstudentgrades"
                          state={{ student: stu, courseId: courseId }}
                          className="btn btn-sm btn-danger"
                        >
                          Upload Grades
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {normalStudents.length === 0 && supplyStudents.length === 0 && (
        <div className="alert alert-info text-center fw-bold" role="alert">
          No students found for this course.
        </div>
      )}
    </div>
  );
};

export default TeacherGradesStuDetail;

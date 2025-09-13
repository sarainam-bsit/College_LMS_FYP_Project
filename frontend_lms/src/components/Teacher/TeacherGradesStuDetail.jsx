
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
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6">
          <h2 className="heading text-center mb-5 mt-3  text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '500px', backgroundColor: 'rgb(4, 4, 63)' }}>
            Students for Selected Courses
          </h2>
        </div>
      </div>

      {/* Normal Students */}
      {normalStudents.length > 0 && (
        <div className="mb-5">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "rgb(70, 4, 67)"}}>Regular Students</h2>
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>#</th>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>Name</th>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>Email</th>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>Registration No</th>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>Roll No</th>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>Upload Grades</th>
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
          <h2 className="text-center mb-4 fw-bold" style={{ color: "rgb(70, 4, 67)"}}>Supply Students</h2>
          <div className="card shadow-sm border-danger">
            <div className="card-body p-0">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-secondary">
                  <tr>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>#</th>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>Name</th>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>Email</th>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>Registration No</th>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>Roll No</th>
                    <th style={{ backgroundColor: "rgb(70, 4, 67)", color: 'white', fontSize:'20px'}}>Upload Grades</th>
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

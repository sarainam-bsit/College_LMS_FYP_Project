import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const StudentTimetable = () => {
  const { departmentId, categoryId } = useParams(); // URL se le raha hai
  const [timetables, setTimetables] = useState([]);
  const [error, setError] = useState("");

  const API_BASE = "http://127.0.0.1:8000/TimeTable/timetable/";

  useEffect(() => {
    const studentId = localStorage.getItem("studentId"); // student id login ke time save hogi

    if (!studentId) {
      setError("Student not found. Please login again.");
      return;
    }
    const fetchTimetable = async () => {
      try {
        const res = await axios.get(`${API_BASE}timetable_by_student/`, {
          params: {
              student_id: studentId,
              department_id: departmentId,
              category_id: categoryId,
            },
        });
        setTimetables(res.data);
      } catch (err) {
  if (err.response && err.response.data && err.response.data.error) {
    setError(err.response.data.error);
  } else {
    setError("Error fetching timetable.");
  }
}
    };

    if (departmentId && categoryId) {
      fetchTimetable();
    }
  }, [departmentId, categoryId]);

  return (
    <>
    <Navbar />
      <div
        className="container p-1 text-center"
        style={{ marginTop: '80px', minHeight: '90vh' }}
      >
      <h2 className="text-primary mb-4">My Timetable</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive card shadow-sm">
        <table className="table table-striped table-hover text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>Department</th>
              <th>Category</th>
              <th>Course</th>
              <th>Teacher</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            {timetables.length === 0 ? (
              <tr>
                <td colSpan={5}>No timetable found</td>
              </tr>
            ) : (
              timetables.map((t) => (
                <tr key={t.id}>
                  <td>{t.department_name}</td>
                  <td>{t.category_name}</td>
                  <td>{t.course_name}</td>
                  <td>{t.teacher_name}</td>
                  <td>{t.Day}</td>
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

export default StudentTimetable;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const StudentDateSheet = () => {
  const { departmentId, categoryId } = useParams();
  const [datesheet, setDatesheet] = useState([]);
  const [error, setError] = useState("");

  const API_BASE = "http://127.0.0.1:8000/TimeTable/datesheet/";

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      setError("Student not found. Please login again.");
      return;
    }

    const fetchDateSheet = async () => {
      try {
        const res = await axios.get(`${API_BASE}student-datesheet/`, {
          params: {
            student_id: studentId,
            department_id: departmentId,
            category_id: categoryId,
          },
        });
        setDatesheet(res.data);
      } catch (err) {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError("Something went wrong while fetching the datesheet.");
        }
      }
    };

    if (departmentId && categoryId) {
      fetchDateSheet();
    }
  }, [departmentId, categoryId]);

  return (
    <>
      
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
          My DateSheet
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

    
        <div className="table-responsive card shadow-lg mt-3">
          <table className="table table-bordered table-hover text-center align-middle mb-0">
            <thead>
              <tr>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  Department
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  Category
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  Course
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  Teacher
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  Exam Date
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  Start Time
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  End Time
                </th>
              </tr>
            </thead>
            <tbody>
              {datesheet.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-3">
                    No datesheet found
                  </td>
                </tr>
              ) : (
                datesheet.map((d) => (
                  <tr key={d.id}>
                    <td>{d.department_name}</td>
                    <td>{d.category_name}</td>
                    <td>{d.course_name}</td>
                    <td>{d.teacher_name}</td>
                    <td>{d.Exam_Date}</td>
                    <td>{d.Start_Time}</td>
                    <td>{d.End_Time}</td>
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

export default StudentDateSheet;

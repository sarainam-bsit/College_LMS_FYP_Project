// src/components/Teacher/TeacherDateSheet.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TeacherDateSheet = () => {
  const { categoryId } = useParams(); // sirf category le raha hoon
  const [datesheet, setDatesheet] = useState([]);
  const [error, setError] = useState("");

  const API_BASE = "http://127.0.0.1:8000/TimeTable/datesheet/";

  useEffect(() => {
    const teacherId = localStorage.getItem("teacherId"); // login ke time save hoga

    if (!teacherId) {
      setError("Teacher not found. Please login again.");
      return;
    }

    const fetchDateSheet = async () => {
      try {
        const res = await axios.get(`${API_BASE}teacher-datesheet/`, {
          params: {
            teacher_id: teacherId,
            category_id: categoryId,
          },
        });
        setDatesheet(res.data);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Error fetching datesheet.");
        }
      }
    };

    if (categoryId) {
      fetchDateSheet();
    }
  }, [categoryId]);

  return (
    <>
      <div
        className="container p-1 text-center"
        style={{ marginTop: "80px", minHeight: "90vh" }}
      >
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2
              className="heading text-center mb-5 mt-3 text-white py-3 px-3 mx-auto rounded shadow-lg"
              style={{
                maxWidth: '250px', backgroundColor: 'rgb(4, 4, 63)',
              }}
            >
              My DateSheet
            </h2>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive card shadow-sm">
          <table className="table table-striped table-hover text-center align-middle">
            <thead>
              <tr>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", fontSize: '20px' }}>
                  Department
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", fontSize: '20px' }}>
                  Category
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", fontSize: '20px' }}>
                  Course
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", fontSize: '20px' }}>
                  Teacher
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", fontSize: '20px' }}>
                  Date
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", fontSize: '20px' }}>
                  Start Time
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", fontSize: '20px' }}>
                  End Time
                </th>
              </tr>
            </thead>
            <tbody>
              {datesheet.length === 0 ? (
                <tr>
                  <td colSpan={7}>No datesheet found</td>
                </tr>
              ) : (
                datesheet.map((d) => (
                  <tr key={d.id}>
                    <td>{d.department_name}</td>
                    <td>{d.category_name}</td>
                    <td>{d.course_name}</td>
                    <td>{d.teacher_name}</td>
                    <td>{d.Date}</td>
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

export default TeacherDateSheet;

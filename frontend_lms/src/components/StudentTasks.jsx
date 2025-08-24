import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const StudentTasks = () => {
  const { categoryId } = useParams(); // Get categoryId from URL
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const API_BASE = "http://127.0.0.1:8000/Tasks/tasks/";

  useEffect(() => {
    const studentId = localStorage.getItem("studentId"); // Logged-in student ID

    if (!studentId) {
      setError("Student not found. Please login again.");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${API_BASE}tasks_by_student/`, {
          params: {
            student_id: studentId,
            category_id: categoryId,
          },
        });
        setTasks(res.data); // Set all tasks from this category
      } catch (err) {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError("Error fetching tasks.");
        }
      }
    };

    if (categoryId) {
      fetchTasks();
    }
  }, [categoryId]);

  return (
    <>
      <Navbar />
      <div
        className="container p-1 text-center"
        style={{ marginTop: "80px", minHeight: "90vh" }}
      >
        <h2 className="text-primary mb-4">My Tasks</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive card shadow-sm">
          <table className="table table-striped table-hover text-center align-middle">
            <thead className="table-primary">
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Task Type</th>
                <th>Title</th>
                <th>Link</th>
                <th>Created</th>
                <th>Ended</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={7}>No tasks found</td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="fw-bold">{task.Course_code || "-"}</td>
                    <td>{task.Course_name || "-"}</td>
                    <td>
                      <span
                        className={`badge ${
                          task.Task_type === "ASSIGNMENT"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {task.Task_type}
                      </span>
                    </td>
                    <td>{task.Title}</td>
                    <td>
                      {task.Link ? (
                        <a
                          href={task.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary"
                        >
                          Open
                        </a>
                      ) : (
                        "No Link"
                      )}
                    </td>
                    <td>
                      {task.Created_at
                        ? new Date(task.Created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      {task.Ended_at
                        ? new Date(task.Ended_at).toLocaleDateString()
                        : "-"}
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

export default StudentTasks;

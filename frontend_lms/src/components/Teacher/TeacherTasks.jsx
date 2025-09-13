import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherTasks = () => {
  const { courseId } = useParams();
  const teacherId = localStorage.getItem("teacherId");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(courseId || "");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [formData, setFormData] = useState({
    Title: "",
    Task_type: "ASSIGNMENT",
    Link: "",
    Created_at: "",
    Ended_at: "",
    Course: "",
    Course_code: "",
    Course_name: "",
  });

  // Fetch teacher courses
  useEffect(() => {
    if (!teacherId) return;
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/Tasks/tasks/courses_by_teacher/?teacher_id=${teacherId}`
        );
        setCourses(res.data);
        if (!selectedCourse && res.data.length > 0) {
          setSelectedCourse(String(res.data[0].id));
        }
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to fetch courses");
        setError("Failed to fetch courses.");
      }
    };
    fetchCourses();
  }, [teacherId]);

  // Fetch tasks for selected course
  useEffect(() => {
    if (!selectedCourse) return;
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/Tasks/tasks/by_course/?course_id=${selectedCourse}`
        );
        setTasks(res.data);

        const course = courses.find((c) => String(c.id) === String(selectedCourse));
        setFormData((prev) => ({
          ...prev,
          Course: selectedCourse,
          Course_code: course?.C_Code || "",
          Course_name: course?.C_Title || "",
        }));

        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to fetch tasks");
        setError("Failed to fetch tasks.");
        setLoading(false);
      }
    };
    fetchTasks();
  }, [selectedCourse, courses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacherId || !selectedCourse) {
      return toast.warn("⚠️ Select course and login as teacher");
    }

    try {
      if (editingTaskId) {
        await axios.put(
          `http://127.0.0.1:8000/Tasks/tasks/${editingTaskId}/`,
          { ...formData, teacher_id: teacherId }
        );
        setEditingTaskId(null);
        toast.success("✅ Task updated successfully");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/Tasks/tasks/",
          { ...formData, teacher_id: teacherId }
        );
        toast.success("🎉 Task added successfully");
      }

      setFormData((prev) => ({
        ...prev,
        Title: "",
        Task_type: "ASSIGNMENT",
        Link: "",
        Created_at: "",
        Ended_at: "",
      }));

      const res = await axios.get(
        `http://127.0.0.1:8000/Tasks/tasks/by_course/?course_id=${selectedCourse}`
      );
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "❌ Error submitting task");
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setFormData({
      Title: task.Title,
      Task_type: task.Task_type,
      Link: task.Link,
      Created_at: task.Created_at.slice(0, 16),
      Ended_at: task.Ended_at.slice(0, 16),
      Course: task.Course,
      Course_code: task.Course_code,
      Course_name: task.Course_name,
    });
    setSelectedCourse(String(task.Course));
    toast.info(`✏️ Editing Task: ${task.Title}`);
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/Tasks/tasks/${taskId}/`);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("🗑️ Task deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete task");
    }
  };

  if (!teacherId) return <p className="text-center mt-5">Login as teacher to continue</p>;
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <>
      
      <div
        style={{
          padding: "30px",
          fontFamily: "Arial, sans-serif",
          marginTop: "4%",
          backgroundColor: "#ebeaf2ff",
          color: "rgba(44, 44, 122, 1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
           Teacher Tasks
        </h2>

        {selectedCourse && (
          <div
            style={{
              backgroundColor: "#f5ecf4ff",
              padding: "20px",
              borderRadius: "10px",
              border: "2px solid white",
              marginBottom: "30px",
            }}
          >
            <h4 style={{ textAlign: "center", color: "rgb(70, 4, 67)", marginBottom: "15px", fontSize: '30px', fontWeight: "bold" }}>
              {editingTaskId ? " Edit Task" : " Add Task"}
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <label className="form-label fw-bold fs-5"> Selected Course</label>
              <input
                type="text"
                className="form-control"
                disabled
                value={
                  courses.find((c) => String(c.id) === String(selectedCourse))
                    ? `${courses.find((c) => String(c.id) === String(selectedCourse)).C_Code} - ${
                        courses.find((c) => String(c.id) === String(selectedCourse)).C_Title
                      }`
                    : ""
                }
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
                <input
                  type="text"
                  name="Title"
                  placeholder="Task Title"
                  value={formData.Title}
                  onChange={handleChange}
                  required
                  style={{ flex: 1, padding: "8px", borderRadius: "5px" }}
                />
                <select
                  name="Task_type"
                  value={formData.Task_type}
                  onChange={handleChange}
                  style={{ flex: 1, padding: "8px", borderRadius: "5px" }}
                >
                  <option value="ASSIGNMENT">Assignment</option>
                  <option value="QUIZ">Quiz</option>
                </select>
              </div>

              <input
                type="url"
                name="Link"
                placeholder="Google Classroom Link"
                value={formData.Link}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", borderRadius: "5px", marginBottom: "15px" }}
              />

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
                <input
                  type="datetime-local"
                  name="Created_at"
                  value={formData.Created_at}
                  onChange={handleChange}
                  style={{ flex: 1, padding: "8px", borderRadius: "5px" }}
                />
                <input
                  type="datetime-local"
                  name="Ended_at"
                  value={formData.Ended_at}
                  onChange={handleChange}
                  style={{ flex: 1, padding: "8px", borderRadius: "5px" }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  backgroundColor: "rgb(70, 4, 67)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                {editingTaskId ? "Update Task" : "Add Task"}
              </button>

              {editingTaskId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingTaskId(null);
                    setFormData({
                      Title: "",
                      Task_type: "ASSIGNMENT",
                      Link: "",
                      Created_at: "",
                      Ended_at: "",
                    });
                  }}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    backgroundColor: "rgb(4, 4, 63)",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        )}

        {/* Task List */}
        <h4 style={{ fontWeight: "bold", marginBottom: "10px", fontSize: '27px' }}>Task List</h4>
        {tasks.length === 0 ? (
          <div className="alert alert-info">No tasks found for this course</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
              <thead style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", fontSize:'20px' }}>
                <tr>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Type</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Link</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Start</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>End</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{task.Title}</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{task.Task_type}</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <a
                        href={task.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#4e73df",
                          color: "white",
                          borderRadius: "5px",
                          textDecoration: "none",
                        }}
                      >
                         Open
                      </a>
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {new Date(task.Created_at).toLocaleString()}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {new Date(task.Ended_at).toLocaleString()}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button
                        onClick={() => handleEdit(task)}
                        style={{
                          marginRight: "5px",
                          padding: "5px 10px",
                          backgroundColor: "rgb(70, 4, 67)",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                         Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "rgb(4, 4, 63)",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default TeacherTasks;

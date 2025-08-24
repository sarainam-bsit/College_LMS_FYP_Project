import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

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

        // Set default selected course if not already set
        if (!selectedCourse && res.data.length > 0) {
          setSelectedCourse(String(res.data[0].id));
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
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

        // Set form course info
        const course = courses.find((c) => String(c.id) === String(selectedCourse));
        setFormData((prev) => ({
          ...prev,
          Course: selectedCourse,
          Course_code: course?.C_Code || "",
          Course_name: course?.C_Title || "",
        }));

        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
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
    if (!teacherId || !selectedCourse) return alert("Select course and login as teacher");

    try {
      if (editingTaskId) {
        await axios.put(
          `http://127.0.0.1:8000/Tasks/tasks/${editingTaskId}/`,
          { ...formData, teacher_id: teacherId }
        );
        setEditingTaskId(null);
      } else {
        await axios.post("http://127.0.0.1:8000/Tasks/tasks/", { ...formData, teacher_id: teacherId });
      }

      setFormData((prev) => ({
        ...prev,
        Title: "",
        Task_type: "ASSIGNMENT",
        Link: "",
        Created_at: "",
        Ended_at: "",
      }));

      // Refresh tasks list
      const res = await axios.get(
        `http://127.0.0.1:8000/Tasks/tasks/by_course/?course_id=${selectedCourse}`
      );
      setTasks(res.data);
    } catch (err) {
      console.error("Error submitting task:", err);
      alert(err.response?.data?.detail || "Error submitting task.");
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
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/Tasks/tasks/${taskId}/`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("❌ Error deleting task.");
    }
  };

  if (!teacherId) return <p className="text-center mt-5">Login as teacher to continue</p>;
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center text-dark mb-4">📌 Teacher Tasks</h2>

        {/* Task Form */}
        {selectedCourse && (
          <div className="card shadow-sm p-4 mb-5">
            <h4 className="mb-3 text-primary">
              {editingTaskId ? "✏️ Edit Task" : "➕ Add Task"}
            </h4>

            <div className="mb-3">
              <label className="form-label fw-bold">Select Course</label>
              <select
                className="form-select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.C_Code} - {c.C_Title}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Task Title</label>
                  <input
                    type="text"
                    name="Title"
                    value={formData.Title}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Task Type</label>
                  <select
                    name="Task_type"
                    value={formData.Task_type}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="ASSIGNMENT">Assignment</option>
                    <option value="QUIZ">Quiz</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Google Classroom Link</label>
                  <input
                    type="url"
                    name="Link"
                    value={formData.Link}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="http://classroom.google.com/..."
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Start Date</label>
                  <input
                    type="datetime-local"
                    name="Created_at"
                    value={formData.Created_at}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">End Date</label>
                  <input
                    type="datetime-local"
                    name="Ended_at"
                    value={formData.Ended_at}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-success">
                {editingTaskId ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>
        )}

        {/* Task List */}
        <h4 className="text-dark">📋 Task List</h4>
        {tasks.length === 0 ? (
          <div className="alert alert-info mt-3">No tasks found for this course.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Link</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.Title}</td>
                    <td>{task.Task_type}</td>
                    <td>
                      <a
                        href={task.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        🔗 Open
                      </a>
                    </td>
                    <td>{new Date(task.Created_at).toLocaleString()}</td>
                    <td>{new Date(task.Ended_at).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(task)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(task.id)}
                      >
                        🗑 Delete
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

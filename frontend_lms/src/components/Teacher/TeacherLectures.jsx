import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TeacherLectures = () => {
  const teacherId = localStorage.getItem("teacherId");
  const { courseId } = useParams();

  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(courseId || "");
  const [formData, setFormData] = useState({
    Title: "",
    Date: "",
    Time: "",
    Video: null,
  });
  const [editingLectureId, setEditingLectureId] = useState(null);

  // Fetch teacher's courses
  useEffect(() => {
    if (!teacherId) return;
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/Lecture/lectures/courses_by_teacher/?teacher_id=${teacherId}`
        );
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, [teacherId]);

  // Auto-select course from URL
  useEffect(() => {
    if (courseId) {
      setSelectedCourse(courseId);
    }
  }, [courseId]);

  // Fetch lectures
  useEffect(() => {
    if (!selectedCourse) {
      setLectures([]);
      return;
    }
    const fetchLectures = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/Lecture/lectures/by_course/?course_id=${selectedCourse}`
        );
        setLectures(res.data);
      } catch (err) {
        console.error("Error fetching lectures:", err);
      }
    };
    fetchLectures();
  }, [selectedCourse]);

  // Input handler
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacherId || !selectedCourse) {
      return alert("Please select a course and log in as a teacher");
    }

    const payload = new FormData();
    payload.append("teacher_id", parseInt(teacherId));
    payload.append("Lec_course", parseInt(selectedCourse));
    payload.append("Title", formData.Title);
    payload.append("Date", formData.Date);
    payload.append("Time", formData.Time);
    if (formData.Video) payload.append("Video", formData.Video);

    try {
      if (editingLectureId) {
        await axios.put(
          `http://127.0.0.1:8000/Lecture/lectures/${editingLectureId}/`,
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditingLectureId(null);
      } else {
        await axios.post(
          `http://127.0.0.1:8000/Lecture/lectures/`,
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setFormData({ Title: "", Date: "", Time: "", Video: null });

      const res = await axios.get(
        `http://127.0.0.1:8000/Lecture/lectures/by_course/?course_id=${selectedCourse}`
      );
      setLectures(res.data);
    } catch (err) {
      console.error("Error submitting lecture:", err);
      alert(
        err.response?.data?.detail ||
          "Error submitting lecture. Check if you are uploading for your assigned course."
      );
    }
  };

  const handleEdit = (lec) => {
    setEditingLectureId(lec.id);
    setFormData({
      Title: lec.Title,
      Date: lec.Date,
      Time: lec.Time,
      Video: null,
    });
    setSelectedCourse(String(lec.Lec_course));
  };

  const handleDelete = async (lecId) => {
    if (!window.confirm("Are you sure you want to delete this lecture?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/Lecture/lectures/${lecId}/`);
      setLectures(lectures.filter((lec) => lec.id !== lecId));
    } catch (err) {
      console.error("Error deleting lecture:", err);
      alert("Error deleting lecture");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-dark mb-4">📚 Teacher Lectures</h2>

      {!teacherId && (
        <div className="alert alert-danger text-center">
          Please log in as a teacher.
        </div>
      )}

      {teacherId && (
        <>
          {/* Form & Selected Course inside one card */}
          {selectedCourse && (
            <div className="card shadow-sm p-4 mb-5">
              <h4 className="mb-3 text-primary">
                {editingLectureId ? "✏️ Edit Lecture" : "➕ Add Lecture"}
              </h4>

              {/* Selected Course inside card */}
              <div className="mb-3">
  <label className="form-label fw-bold">Selected Course</label>
  <input
    type="text"
    className="form-control"
    disabled
    value={
      courses.find(c => String(c.id) === String(selectedCourse))
        ? `${courses.find(c => String(c.id) === String(selectedCourse)).C_Code} - ${courses.find(c => String(c.id) === String(selectedCourse)).C_Title}`
        : ""
    }
  />
</div>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="Title"
                      className="form-control"
                      placeholder="Lecture Title"
                      value={formData.Title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="date"
                      name="Date"
                      className="form-control"
                      value={formData.Date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      name="Time"
                      className="form-control"
                      value={formData.Time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    name="Video"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  {editingLectureId ? "Update Lecture" : "Add Lecture"}
                </button>
              </form>
            </div>
          )}

          {/* Lecture list */}
          {selectedCourse && (
            <>
              <h4 className="text-dark">📖 Lecture List</h4>
              {lectures.length === 0 ? (
                <div className="alert alert-info mt-3">
                  No lectures found for this course.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-bordered align-middle text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Video</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lectures.map((lec) => (
                        <tr key={lec.id}>
                          <td>{lec.Lec_course_code}</td>
                          <td>{lec.Lec_course_name}</td>
                          <td>{lec.Title}</td>
                          <td>{lec.Date}</td>
                          <td>{lec.Time}</td>
                          <td>
                            {lec.Video ? (
                              <a
                                href={
                                  lec.Video.startsWith("http")
                                    ? lec.Video
                                    : `http://127.0.0.1:8000${lec.Video}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                ▶ View
                              </a>
                            ) : (
                              "No Video"
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleEdit(lec)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(lec.id)}
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherLectures;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error("❌ Failed to fetch courses");
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
        toast.error("❌ Failed to fetch lectures");
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
      return toast.warn("⚠️ Please select a course and log in as a teacher");
    }

    const payload = new FormData();
    payload.append("teacher_id", parseInt(teacherId));
    payload.append("Lec_course", parseInt(selectedCourse));
    payload.append("Title", formData.Title);
    payload.append("Date", formData.Date);
    payload.append("Time", formData.Time);
    if (formData.Video instanceof File) {
      payload.append("Video", formData.Video);
    }

    try {
      if (editingLectureId) {
        await axios.patch(
          `http://127.0.0.1:8000/Lecture/lectures/${editingLectureId}/`,
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditingLectureId(null);
        toast.success("✅ Lecture updated successfully");
      } else {
        await axios.post(`http://127.0.0.1:8000/Lecture/lectures/`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("🎉 Lecture added successfully");
      }

      setFormData({ Title: "", Date: "", Time: "", Video: null });

      const res = await axios.get(
        `http://127.0.0.1:8000/Lecture/lectures/by_course/?course_id=${selectedCourse}`
      );
      setLectures(res.data);
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
          "❌ Error submitting lecture. Check if this course belongs to you."
      );
    }
  };

  const handleEdit = (lec) => {
    setEditingLectureId(lec.id);
    setFormData({
      Title: lec.Title,
      Date: lec.Date,
      Time: lec.Time,
      Video: lec.Video || null,
    });
    setSelectedCourse(String(lec.Lec_course));
    toast.info(`Editing Lecture: ${lec.Title}`);
  };

  const handleDelete = async (lecId) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this lecture?"))
      return;
    try {
      await axios.delete(`http://127.0.0.1:8000/Lecture/lectures/${lecId}/`);
      setLectures(lectures.filter((lec) => lec.id !== lecId));
      toast.success("🗑️ Lecture deleted");
    } catch (err) {
      toast.error("❌ Failed to delete lecture");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        marginTop: "4%",
        backgroundColor: "#ebeaf2ff", // light purple background
        color: "rgba(44, 44, 122, 1)",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "rgba(44, 44, 122, 1)",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Teacher Lectures
      </h1>

      {!teacherId && (
        <div className="alert alert-danger text-center mt-4">
          ❌ Please log in as a teacher.
        </div>
      )}

      {teacherId && selectedCourse && (
        <>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              marginBottom: "30px",
              backgroundColor: "#f5ecf4ff",
              padding: "20px",
              borderRadius: "10px",
              border: "2px solid white",
            }}
          >
            <h4 style={{ textAlign: "center", fontWeight: "bold", fontSize: '30px' }}>
              {editingLectureId ? " Edit Lecture" : " Add Lecture"}
            </h4>

            <div style={{ marginBottom: "15px" }}>
              <label className="form-label fw-bold fs-5">Selected Course</label>
              <input
                type="text"
                className="form-control"
                disabled
                value={
                  courses.find((c) => String(c.id) === String(selectedCourse))
                    ? `${courses.find(
                        (c) => String(c.id) === String(selectedCourse)
                      ).C_Code} - ${
                        courses.find(
                          (c) => String(c.id) === String(selectedCourse)
                        ).C_Title
                      }`
                    : ""
                }
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <input
                type="text"
                name="Title"
                placeholder="Lecture Title"
                value={formData.Title}
                onChange={handleInputChange}
                required
                style={{ padding: "8px", flex: 1, borderRadius: "5px" }}
              />
              <input
                type="date"
                name="Date"
                value={formData.Date}
                onChange={handleInputChange}
                required
                style={{ padding: "8px", borderRadius: "5px" }}
              />
              <input
                type="time"
                name="Time"
                value={formData.Time}
                onChange={handleInputChange}
                required
                style={{ padding: "8px", borderRadius: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="file"
                name="Video"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                borderRadius: "5px",
                backgroundColor: "rgb(70, 4, 67)", // dark purple
                color: "white",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              {editingLectureId ? "Update Lecture" : "Add Lecture"}
            </button>

            {editingLectureId && (
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    Title: "",
                    Date: "",
                    Time: "",
                    Video: null,
                  })
                }
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  backgroundColor: "rgb(4, 4, 63)", // navy blue
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Cancel
              </button>
            )}
          </form>

          {/* Lecture Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white", fontSize:'20px' }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Code
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Course
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Title
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Date
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Time
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Video
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {lectures.length === 0 ? (
                <tr>
                  <td colSpan={7}> No lectures found</td>
                </tr>
              ) : (
                lectures.map((lec) => (
                  <tr key={lec.id} style={{ textAlign: "center" }}>
                    <td style={{ padding: "10px", border: "1px solid white" }}>
                      {lec.Lec_course_code}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid white" }}>
                      {lec.Lec_course_name}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid white" }}>
                      {lec.Title}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid white" }}>
                      {lec.Date}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid white" }}>
                      {lec.Time}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid white" }}>
                      {lec.Video ? (
                        <a
                          href={
                            lec.Video.startsWith("http")
                              ? lec.Video
                              : `http://127.0.0.1:8000${lec.Video}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      ) : (
                        "No Video"
                      )}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button
                        onClick={() => handleEdit(lec)}
                        style={{
                          marginRight: "5px",
                          padding: "5px 10px",
                          backgroundColor: "rgb(70, 4, 67)",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          transition: "transform 0.2s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.transform = "scale(1.1)")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(lec.id)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "rgb(4, 4, 63)",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          transition: "transform 0.2s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.transform = "scale(1.1)")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TeacherLectures;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    Lec_course: "",
    Title: "",
    Date: "",
    Time: "",
    Video: null,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchLectures = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/Lecture/lectures/");
      setLectures(res.data);
    } catch (err) {
      toast.error("Failed to fetch lectures.");
    } finally {
      setLoading(false);
    }
  };

 
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/Course/courses/");
      setCourses(res.data);
    } catch (err) {
      toast.error("Failed to fetch courses.");
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchCourses();
  }, []);

  
  const handleChange = (e) => {
    if (e.target.name === "Video") {
      setForm({ ...form, Video: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Lec_course", form.Lec_course);
    formData.append("Title", form.Title);
    formData.append("Date", form.Date);
    formData.append("Time", form.Time);
    if (form.Video) formData.append("Video", form.Video);

    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/Lecture/lectures/${editId}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Lecture updated successfully!");
        setEditId(null);
      } else {
        await axios.post("http://127.0.0.1:8000/Lecture/lectures/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Lecture added successfully!");
      }
      setForm({ Lec_course: "", Title: "", Date: "", Time: "", Video: null });
      fetchLectures();
    } catch (err) {
      toast.error("Failed to save lecture.");
    }
  };

  
  const handleEdit = (lec) => {
    setEditId(lec.id);
    setForm({
      Lec_course: lec.Lec_course,
      Title: lec.Title,
      Date: lec.Date,
      Time: lec.Time,
      Video: null,
    });
    toast.info(`Editing Lecture: ${lec.Title}`);
  };

 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lecture?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/Lecture/lectures/${id}/`);
      toast.success("Lecture deleted successfully!");
      fetchLectures();
    } catch (err) {
      toast.error("Failed to delete lecture.");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        marginTop: "4%",
        backgroundColor: "#ebeaf2ff",
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
        Manage Lectures
      </h1>

     
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
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Select Course:
          </label>
          <select
            name="Lec_course"
            value={form.Lec_course}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.C_Code} - {course.C_Title}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Lecture Title:
          </label>
          <input
            type="text"
            name="Title"
            value={form.Title}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Date:
            </label>
            <input
              type="date"
              name="Date"
              value={form.Date}
              onChange={handleChange}
              required
              style={{
                padding: "8px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Time:
            </label>
            <input
              type="time"
              name="Time"
              value={form.Time}
              onChange={handleChange}
              required
              style={{
                padding: "8px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Upload Video:
          </label>
          <input type="file" name="Video" onChange={handleChange} />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            borderRadius: "5px",
            backgroundColor: "rgb(70, 4, 67)",
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          {editId ? "Update Lecture" : "Add Lecture"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({
                Lec_course: "",
                Title: "",
                Date: "",
                Time: "",
                Video: null,
              });
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "rgb(4, 4, 63)",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Cancel
          </button>
        )}
      </form>

    
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Course Code
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Course Title
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Department
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Lecture Title
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Video</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center">
                Loading...
              </td>
            </tr>
          ) : lectures.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center">
                No lectures found
              </td>
            </tr>
          ) : (
            lectures.map((lec) => (
              <tr key={lec.id}>
                <td style={{ padding: "10px", border: "1px solid white" }}>
                  {lec.Lec_course_code}
                </td>
                <td style={{ padding: "10px", border: "1px solid white" }}>
                  {lec.Lec_course_name}
                </td>
                <td style={{ padding: "10px", border: "1px solid white" }}>
                  {lec.Lec_department_name}
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
                      href={lec.Video}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "No video"
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
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
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
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UploadLectures;

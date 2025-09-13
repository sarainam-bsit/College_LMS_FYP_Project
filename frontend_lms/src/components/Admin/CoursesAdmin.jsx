import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoursesAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [dropdowns, setDropdowns] = useState({ categories: [], teachers: [] });
  const [form, setForm] = useState({
    C_Category: "",
    Teacher: "",
    C_Code: "",
    C_Title: "",
    Credit_Hour: 0,
  });
  const [editId, setEditId] = useState(null);

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/Course/courses/");
      setCourses(res.data);
    } catch (err) {
      toast.error("Failed to fetch courses");
    }
  };

  // Fetch dropdowns
  const fetchDropdowns = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/Course/courses/dropdowns/");
      setDropdowns({
        categories: res.data.categories,
        teachers: res.data.teachers,
      });
    } catch (err) {
      toast.error("Failed to fetch dropdowns");
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchDropdowns();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://127.0.0.1:8000/Course/courses/${editId}/`, form);
        toast.success("Course updated successfully!");
        setEditId(null);
      } else {
        await axios.post("http://127.0.0.1:8000/Course/courses/", form);
        toast.success("Course added successfully!");
      }
      setForm({
        C_Category: "",
        Teacher: "",
        C_Code: "",
        C_Title: "",
        Credit_Hour: 0,
      });
      fetchCourses();
    } catch (err) {
      toast.error("Error saving course");
    }
  };

  const handleEdit = (course) => {
    setEditId(course.id);
    setForm({
      C_Category: course.C_Category,
      Teacher: course.Teacher,
      C_Code: course.C_Code,
      C_Title: course.C_Title,
      Credit_Hour: course.Credit_Hour,
    });
    toast.info(`Editing Course: ${course.C_Title}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/Course/courses/${id}/`);
      toast.success("Course deleted successfully!");
      fetchCourses();
    } catch (err) {
      toast.error("Error deleting course");
    }
  };

  return (
    <div
      
      style={{
        marginTop: "6%",
        backgroundColor: "#ebeaf2ff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{ color: "rgba(44, 44, 122, 1)", fontWeight: "bold" }}
      >
        Courses
      </h2>

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
        className="row g-3"
      >
        {/* Category Dropdown */}
        <div className="col-md-6">
          <select
            name="C_Category"
            value={form.C_Category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Category</option>
            {dropdowns.categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.Related_Department_Name} - {cat.Related_Department_Discription} -{" "}
                {cat.Category_Type} ({cat.Category_Name})
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select
            name="Teacher"
            value={form.Teacher}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Teacher</option>
            {dropdowns.teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.Teacher_Name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="C_Code"
            placeholder="Course Code"
            value={form.C_Code}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="number"
            name="Credit_Hour"
            placeholder="Credit Hour"
            value={form.Credit_Hour}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-12">
          <input
            type="text"
            name="C_Title"
            placeholder="Course Title"
            value={form.C_Title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-12 d-flex gap-2">
          <button
            type="submit"
            style={{
              padding: "10px 20px",
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
            {editId ? "Update Course" : "Add Course"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({
                  C_Category: "",
                  Teacher: "",
                  C_Code: "",
                  C_Title: "",
                  Credit_Hour: 0,
                });
                toast.info("Edit cancelled!");
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
        </div>
      </form>

 
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Code</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Credit Hour</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Title</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '23px' }}>Category</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Teacher</th>
            <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id}>
                <td style={{ padding: "10px", border: "1px solid white" }}>{course.C_Code}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{course.Credit_Hour}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>{course.C_Title}</td>
                <td style={{ padding: "10px", border: "1px solid white" }}>
                  {course.C_Category_Full || ""}
                </td>
                <td style={{ padding: "10px", border: "1px solid white" }}>
                  {course.Teacher_Name || ""}
                </td>
                <td style={{ padding: "10px", border: "1px solid white" }}>
                  <button
                    onClick={() => handleEdit(course)}
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
                    onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "rgb(4, 4, 63)",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center" style={{ padding: "15px" }}>
                No courses found
              </td>
            </tr>
          )}
        </tbody>
      </table>

     
    </div>
  );
};

export default CoursesAdmin;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadStudentGrades = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, courseId, courseCode, courseTitle } = location.state || {};

  const [marks, setMarks] = useState({
    course_total: 100,
    course_obtained: "",
    sessional_total: 20,
    sessional_obtained: "",
    remarks: "",
  });
  const [errors, setErrors] = useState({});
  const [gradeId, setGradeId] = useState(null);
  const [courseInfo, setCourseInfo] = useState({
    code: courseCode || "",
    title: courseTitle || "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/Grade/grades/category_dropdown/")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch course info if missing
  useEffect(() => {
    if ((!courseInfo.code || !courseInfo.title) && courseId) {
      axios
        .get(`http://127.0.0.1:8000/Course/courses/${courseId}/`)
        .then((res) =>
          setCourseInfo({
            code: res.data.C_Code,
            title: res.data.C_Title,
          })
        )
        .catch((err) => console.error("Error fetching course info:", err));
    }
  }, [courseId]);

  // Fetch existing grade
  useEffect(() => {
    if (!student || !courseId) return;

    setMarks({
      course_total: 100,
      course_obtained: "",
      sessional_total: 20,
      sessional_obtained: "",
      remarks: "",
    });
    setGradeId(null);
    setSelectedCategory("");

    axios
      .get(`http://127.0.0.1:8000/Grade/grades/?student=${student.id}&course=${courseId}`)
      .then((res) => {
        if (res.data.length > 0) {
          const g = res.data[0];
          setMarks({
            course_total: g.Course_Total_Marks,
            course_obtained: g.Course_Obtained_Marks,
            sessional_total: g.Sessional_Total_Marks,
            sessional_obtained: g.Sessional_Obtained_Marks,
            remarks: g.Remarks,
          });
          setGradeId(g.id);
          setSelectedCategory(g.Category);
        }
      })
      .catch((err) => console.error(err));
  }, [student, courseId]);

  const handleChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedCategory) newErrors.category = "Select category";
    if (marks.course_obtained === "") newErrors.course_obtained = "This field is required";
    if (marks.sessional_obtained === "") newErrors.sessional_obtained = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const totalObtained = Number(marks.course_obtained || 0) + Number(marks.sessional_obtained || 0);
  const totalMarks = Number(marks.course_total) + Number(marks.sessional_total);
  const status = totalObtained >= totalMarks * 0.4 ? "Pass" : "Supply";
  const percentage = (totalObtained / totalMarks) * 100;
  let grade = "";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else grade = "F";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      Student: student.id,
      Course: courseId,
      Category: selectedCategory,
      Course_Total_Marks: Number(marks.course_total),
      Course_Obtained_Marks: Number(marks.course_obtained),
      Sessional_Total_Marks: Number(marks.sessional_total),
      Sessional_Obtained_Marks: Number(marks.sessional_obtained),
      Remarks: marks.remarks,
      Total_Obtained: totalObtained,
      Total_Marks: totalMarks,
      status,
      grade,
    };

    if (gradeId) {
      axios
        .put(`http://127.0.0.1:8000/Grade/grades/${gradeId}/`, payload)
        .then(() => toast.success("✅ Grade updated successfully!"))
        .catch((err) => toast.error("⚠️ Error updating grade"));
    } else {
      axios
        .post(`http://127.0.0.1:8000/Grade/grades/`, payload)
        .then(() => toast.success("✅ Grade uploaded successfully!"))
        .catch((err) => toast.error("⚠️ Error uploading grade"));
    }
  };

  const handleDelete = () => {
    if (!gradeId) return toast.warning("⚠️ No grade to delete!");
    if (!window.confirm("Are you sure you want to delete this grade?")) return;

    axios
      .delete(`http://127.0.0.1:8000/Grade/grades/${gradeId}/`)
      .then(() => {
        toast.success("🗑️ Grade deleted successfully!");
        navigate(-1);
      })
      .catch((err) => toast.error("⚠️ Error deleting grade"));
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-center" autoClose={2500} />
      <div className="card shadow-lg p-4 bg-light">
<div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6">
          <h2 className="heading text-center mb-4 mt-3  text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px', backgroundColor: 'rgba(6, 6, 93, 1)' }}>
           Upload Grades
          </h2>
        </div>
      </div>
        <form onSubmit={handleSubmit}>
          {/* Student Info */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Student Name</label>
              <input type="text" className="form-control" value={student.Student_Name} readOnly />
            </div>
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Registration No</label>
              <input type="text" className="form-control" value={student.Reg_No} readOnly />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Roll No</label>
              <input type="text" className="form-control" value={student.Roll_No} readOnly />
            </div>
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Email</label>
              <input type="text" className="form-control" value={student.Student_Email} readOnly />
            </div>
          </div>

          {/* Category */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Course Category (Semester/Part)</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.Related_Department_Name}] - {c.Category_Name}
                  </option>
                ))}
              </select>
              {errors.category && <small className="text-danger">{errors.category}</small>}
            </div>
          </div>

          {/* Course Code & Title */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Course Code</label>
              <input type="text" className="form-control" value={courseInfo.code} readOnly />
            </div>
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Course Title</label>
              <input type="text" className="form-control" value={courseInfo.title} readOnly />
            </div>
          </div>

          {/* Marks */}
          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label className="fw-bold">Course Total</label>
              <input type="number" className="form-control" name="course_total" value={marks.course_total} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="fw-bold">Course Obtained</label>
              <input type="number" className="form-control" name="course_obtained" value={marks.course_obtained} onChange={handleChange} />
              {errors.course_obtained && <small className="text-danger">{errors.course_obtained}</small>}
            </div>
            <div className="col-md-4 mb-3">
              <label className="fw-bold">Sessional Total</label>
              <input type="number" className="form-control" name="sessional_total" value={marks.sessional_total} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label className="fw-bold">Sessional Obtained</label>
              <input type="number" className="form-control" name="sessional_obtained" value={marks.sessional_obtained} onChange={handleChange} />
              {errors.sessional_obtained && <small className="text-danger">{errors.sessional_obtained}</small>}
            </div>
          </div>

          {/* Totals & Grade */}
          <div className="row mb-3 text-center">
            <div className="col-md-4 mb-3">
              <label className="fw-bold">Total Obtained</label>
              <input className="form-control fw-bold text-success" value={totalObtained} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="fw-bold">Total Marks</label>
              <input className="form-control fw-bold" value={totalMarks} readOnly />
            </div>
            <div className="col-md-4 mb-3">
              <label className="fw-bold">Status / Grade</label>
              <input className="form-control fw-bold text-primary" value={`${status} (${grade})`} readOnly />
            </div>
          </div>

          {/* Remarks */}
          <div className="card bg-white shadow-sm mb-3 p-3">
            <label className="fw-bold text-secondary">Remarks</label>
            <textarea
              className="form-control"
              name="remarks"
              value={marks.remarks}
              onChange={handleChange}
              placeholder="Enter any remarks for the student"
              rows={3}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="text-center">
            <button type="submit" className="btn btn-success me-2">
              {gradeId ? "Update Grade" : "Submit Grade"}
            </button>
            {gradeId && (
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete Grade
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadStudentGrades;

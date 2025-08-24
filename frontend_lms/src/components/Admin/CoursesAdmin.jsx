import { useState, useEffect } from 'react';
import axios from 'axios';

const CoursesAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [dropdowns, setDropdowns] = useState({ categories: [], teachers: [] });
  const [form, setForm] = useState({ C_Category: '', Teacher: '', C_Code: '', C_Title: '', Credit_Hour: 0 });
  const [editId, setEditId] = useState(null);

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/Course/courses/');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch dropdowns
  const fetchDropdowns = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/Course/courses/dropdowns/');
      setDropdowns({
        categories: res.data.categories,
        teachers: res.data.teachers
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchDropdowns();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://127.0.0.1:8000/Course/courses/${editId}/`, form);
        setEditId(null);
      } else {
        await axios.post('http://127.0.0.1:8000/Course/courses/', form);
      }
      setForm({ C_Category: '', Teacher: '', C_Code: '', C_Title: '', Credit_Hour: 0 });
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert('Error saving course.');
    }
  };

  const handleEdit = (course) => {
    setEditId(course.id);
    setForm({
      C_Category: course.C_Category, // category ID
      Teacher: course.Teacher,       // teacher ID
      C_Code: course.C_Code,
      C_Title: course.C_Title,
      Credit_Hour: course.Credit_Hour,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/Course/courses/${id}/`);
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert('Error deleting course.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Manage Courses</h2>

      {/* Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <form className="row g-3" onSubmit={handleSubmit}>
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
                {dropdowns.categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.Related_Department_Name} - {cat.Category_Type} ({cat.Category_Name})
                  </option>
                ))}
              </select>
            </div>

            {/* Teacher Dropdown */}
            <div className="col-md-6">
              <select
                name="Teacher"
                value={form.Teacher}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Teacher</option>
                {dropdowns.teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.Teacher_Name}</option>
                ))}
              </select>
            </div>

            {/* Course Code */}
            <div className="col-md-6">
              <input type="text" name="C_Code" placeholder="Course Code" value={form.C_Code} onChange={handleChange} className="form-control" required/>
            </div>

            {/* Credit Hour */}
            <div className="col-md-6">
              <input type="number" name="Credit_Hour" placeholder="Credit Hour" value={form.Credit_Hour} onChange={handleChange} className="form-control" required/>
            </div>

            {/* Course Title */}
            <div className="col-md-12">
              <input type="text" name="C_Title" placeholder="Course Title" value={form.C_Title} onChange={handleChange} className="form-control" required/>
            </div>

            {/* Buttons */}
            <div className="col-12 d-flex gap-2">
              <button type="submit" className={`btn ${editId ? 'btn-warning' : 'btn-primary'}`}>
                {editId ? 'Update Course' : 'Add Course'}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary" onClick={() => { 
                  setEditId(null); 
                  setForm({ C_Category: '', Teacher: '', C_Code: '', C_Title: '', Credit_Hour: 0 }); 
                }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Courses Table */}
      <div className="table-responsive card shadow-sm">
        <table className="table table-striped table-hover mb-0">
          <thead className="table-primary">
            <tr>
              <th>Code</th>
              <th>Credit Hour</th>
              <th>Title</th>
              <th>Category</th>
              <th>Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.C_Code}</td>
                <td>{course.Credit_Hour}</td>
                <td>{course.C_Title}</td>
                <td>{course.C_Category_Full || ''}</td>
                <td>{course.Teacher_Name || ''}</td>
                <td className="d-flex gap-2">
                  <button onClick={() => handleEdit(course)} className="btn btn-sm btn-warning">Edit</button>
                  <button onClick={() => handleDelete(course.id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">No courses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesAdmin;

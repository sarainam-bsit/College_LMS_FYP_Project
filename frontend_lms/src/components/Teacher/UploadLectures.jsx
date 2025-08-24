import { useState, useEffect } from 'react';
import axios from 'axios';

const UploadLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    Lec_course: '',
    Title: '',
    Date: '',
    Time: '',
    Video: null,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch lectures from API
  const fetchLectures = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://127.0.0.1:8000/Lecture/lectures/');
      setLectures(res.data);
    } catch (err) {
      console.error('Error fetching lectures:', err);
      alert('Failed to fetch lectures.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses for dropdown
  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/Course/courses/');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchCourses();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === 'Video') {
      setForm({ ...form, Video: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Submit form: Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Lec_course', form.Lec_course);
    formData.append('Title', form.Title);
    formData.append('Date', form.Date);
    formData.append('Time', form.Time);
    if (form.Video) formData.append('Video', form.Video);

    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/Lecture/lectures/${editId}/`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setEditId(null);
      } else {
        await axios.post(
          'http://127.0.0.1:8000/Lecture/lectures/',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }
      setForm({ Lec_course: '', Title: '', Date: '', Time: '', Video: null });
      fetchLectures();
    } catch (err) {
      console.error('Error saving lecture:', err);
      alert('Failed to save lecture.');
    }
  };

  // Edit lecture
  const handleEdit = (lec) => {
    setEditId(lec.id);
    setForm({
      Lec_course: lec.Lec_course,
      Title: lec.Title,
      Date: lec.Date,
      Time: lec.Time,
      Video: null,
    });
  };

  // Delete lecture
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lecture?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/Lecture/lectures/${id}/`);
      fetchLectures();
    } catch (err) {
      console.error('Error deleting lecture:', err);
      alert('Failed to delete lecture.');
    }
  };

  return (
    <div className="container p-0" style={{ marginTop: "65px", minHeight: "90vh" }}>
      <h2 className="mb-4 text-primary">Manage Lectures</h2>

      {/* Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <select
                name="Lec_course"
                value={form.Lec_course}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.C_Code} - {course.C_Title}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="Title"
                placeholder="Lecture Title"
                value={form.Title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <input
                type="date"
                name="Date"
                value={form.Date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <input
                type="time"
                name="Time"
                value={form.Time}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <input
                type="file"
                name="Video"
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-12 d-flex gap-2">
              <button type="submit" className={`btn ${editId ? 'btn-warning' : 'btn-primary'}`}>
                {editId ? 'Update Lecture' : 'Add Lecture'}
              </button>
              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditId(null);
                    setForm({ Lec_course: '', Title: '', Date: '', Time: '', Video: null });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive card shadow-sm">
        <table className="table table-striped table-hover mb-0">
          <thead className="table-primary">
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Department</th>
              <th>Lecture Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Video</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : lectures.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No lectures found
                </td>
              </tr>
            ) : (
              lectures.map((lec) => (
                <tr key={lec.id}>
                  <td>{lec.Lec_course_code}</td>
                  <td>{lec.Lec_course_name}</td>
                  <td>{lec.Lec_department_name}</td>
                  <td>{lec.Title}</td>
                  <td>{lec.Date}</td>
                  <td>{lec.Time}</td>
                  <td>
                    {lec.Video ? (
                      <a href={lec.Video} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    ) : (
                      'No video'
                    )}
                  </td>
                  <td className="d-flex gap-2">
                    <button onClick={() => handleEdit(lec)} className="btn btn-sm btn-warning">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(lec.id)} className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadLectures;

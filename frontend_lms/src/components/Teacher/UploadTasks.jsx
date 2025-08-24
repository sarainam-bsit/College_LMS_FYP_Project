import { useState, useEffect } from 'react';
import axios from 'axios';

const UploadTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    Course: '',
    Task_type: 'ASSIGNMENT',
    Title: '',
    Link: '',
    Ended_at: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/A&Q/tasks/');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/Course/courses/');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchCourses();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://127.0.0.1:8000/A&Q/tasks/${editId}/`, form);
        setEditId(null);
      } else {
        await axios.post('http://127.0.0.1:8000/A&Q/tasks/', form);
      }
      setForm({ Course: '', Task_type: 'ASSIGNMENT', Title: '', Link: '', Ended_at: '' });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Error saving task');
    }
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setForm({
      Course: task.Course,
      Task_type: task.Task_type,
      Title: task.Title,
      Link: task.Link,
      Ended_at: task.Ended_at
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/A&Q/tasks/${id}/`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Error deleting task');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Manage Assignments & Quizzes</h2>

      {/* Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <select name="Course" value={form.Course} onChange={handleChange} className="form-select" required>
                <option value="">Select Course</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.C_Code} - {c.C_Title}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select name="Task_type" value={form.Task_type} onChange={handleChange} className="form-select" required>
                <option value="ASSIGNMENT">Assignment</option>
                <option value="QUIZ">Quiz</option>
              </select>
            </div>
            <div className="col-md-3">
              <input type="text" name="Title" value={form.Title} onChange={handleChange} className="form-control" placeholder="Title" required />
            </div>
            <div className="col-md-3">
              <input type="url" name="Link" value={form.Link} onChange={handleChange} className="form-control" placeholder="Google Classroom Link" required />
            </div>
            <div className="col-md-4">
              <input type="date" name="Ended_at" value={form.Ended_at} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-12 d-flex gap-2">
              <button type="submit" className={`btn ${editId ? 'btn-warning' : 'btn-primary'}`}>
                {editId ? 'Update' : 'Add'}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary" onClick={() => setEditId(null)}>
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
              <th>Type</th>
              <th>Title</th>
              <th>Link</th>
              <th>Ended At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr><td colSpan={7} className="text-center">No tasks found</td></tr>
            ) : tasks.map(task => (
              <tr key={task.id}>
                <td>{task.Course_code}</td>
                <td>{task.Course_name}</td>
                <td>{task.Department_Name}</td>
                <td>{task.Task_type}</td>
                <td>{task.Title}</td>
                <td><a href={task.Link} target="_blank" rel="noopener noreferrer">Open Link</a></td>
                <td>{task.Ended_at}</td>
                <td className="d-flex gap-2">
                  <button onClick={() => handleEdit(task)} className="btn btn-sm btn-warning">Edit</button>
                  <button onClick={() => handleDelete(task.id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadTasks;

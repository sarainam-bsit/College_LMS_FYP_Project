import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TeacherCategory = () => {
  const { deptId } = useParams();
  const [categories, setCategories] = useState([]);
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    // Fetch department name
    axios
      .get(`http://127.0.0.1:8000/dept/dept_api/${deptId}/`)
      .then(res => setDepartmentName(res.data.Department_Name))
      .catch(err => console.error("Error fetching department:", err));

    // Fetch categories
    axios
      .get(`http://127.0.0.1:8000/dept/course-categories/by_department/?department_id=${deptId}`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, [deptId]);

  return (
    <div className="container p-3" style={{ marginTop: "80px", minHeight: "90vh" }}>
      {/* Page Heading */}
      <h2
        className="text-center text-light p-3 rounded shadow-lg mx-auto "
        style={{ backgroundColor: "#222", maxWidth: "30%" }}
      >
        📚 {departmentName}
      </h2>

      {/* Categories Grid */}
      <div className="row mt-5">
        {categories.length > 0 ? (
  categories.map(cat => (
    <div key={cat.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <Link
        to={`/teacher/department/${deptId}/category/${cat.id}`}
        className='text-decoration-none'
      >
        <div
          className="card text-white shadow-lg border-0"
          style={{
            backgroundColor: '#000',
            borderRadius: '15px',
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: "pointer",
            transition: "all 0.3s ease-in-out"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#111";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "#000";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {cat.Category_Name}
        </div>
      </Link>
    </div>
  ))
) : (
  <p className="text-center text-muted">No categories found.</p>
)}
</div>
    </div>
  );
};

export default TeacherCategory;

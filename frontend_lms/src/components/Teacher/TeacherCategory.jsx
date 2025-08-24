import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherCategory = () => {
  const { deptId } = useParams(); // URL se department id
  const [categories, setCategories] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const teacherId = localStorage.getItem("teacherId");
    if (!teacherId) {
      setError("Teacher not found. Please login again.");
      return;
    }

    // Backend se categories fetch karo teacher aur department ke hisaab se
    axios
      .get(`http://127.0.0.1:8000/dept/course-categories/by_teacher/?teacher_id=${teacherId}`)
      .then(res => {
        // filter only categories for current department
        const deptCategories = res.data.filter(cat => cat.Related_Department === parseInt(deptId));

        if (deptCategories.length === 0) {
          setError("No categories found for this department");
        } else {
          setCategories(deptCategories);
          setDepartmentName(deptCategories[0].Related_Department_Name);
        }
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
        setError("Error fetching categories");
      });
  }, [deptId]);

  return (
    <div className="container p-3" style={{ marginTop: "80px", minHeight: "90vh" }}>
      
      {/* Department Heading */}
      <h2
        className="text-center text-light p-3 rounded shadow-lg mx-auto"
        style={{ backgroundColor: "#222", maxWidth: "30%" }}
      >
        📚 {departmentName || "Department"}
      </h2>

      {/* Error Message */}
      {error && <p className="text-center text-danger mt-3">{error}</p>}

      {/* Categories Grid */}
      <div className="row mt-5">
        {categories.map(cat => (
          <div key={cat.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Link
              to={`/teacher/department/${deptId}/category/${cat.id}`} // teacher_id hide
              className="text-decoration-none"
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
        ))}
      </div>
    </div>
  );
};

export default TeacherCategory;

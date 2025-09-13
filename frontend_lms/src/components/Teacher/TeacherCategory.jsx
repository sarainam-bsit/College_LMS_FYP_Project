import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TeacherCategory = () => {
  const { deptId } = useParams();
  const [categories, setCategories] = useState([]);
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
   
    axios
      .get(`http://127.0.0.1:8000/dept/dept_api/${deptId}/`)
      .then(res => setDepartmentName(res.data.Department_Name))
      .catch(err => console.error("Error fetching department:", err));

 
    axios
      .get(`http://127.0.0.1:8000/dept/course-categories/by_department/?department_id=${deptId}`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, [deptId]);

  return (
    <div 
      className="container p-3" 
      style={{ marginTop: "80px", minHeight: "90vh", backgroundColor: "#ebeaf2ff", fontFamily: "Arial, sans-serif" }}
    >
    
      <h2
        className="text-center text-white p-3 rounded shadow-lg mx-auto mb-5"
        style={{ backgroundColor: "rgb(70, 4, 67)", maxWidth: "350px", fontWeight: "bold", letterSpacing: "1px" }}
      >
        {departmentName}
      </h2>

    
      <div className="row g-4">
        {categories.length > 0 ? (
          categories.map(cat => (
            <div key={cat.id} className="col-lg-3 col-md-4 col-sm-6">
              <Link
                to={`/teacher/department/${deptId}/category/${cat.id}`}
                className='text-decoration-none'
              >
                <div
                  className="card shadow-sm border-0 d-flex align-items-center justify-content-center text-center"
                  style={{
                    backgroundColor: "#f5ecf4ff",
                    borderRadius: "12px",
                    padding: "40px 20px",
                    minHeight: "140px",
                    transition: "all 0.3s ease-in-out",
                    border: "2px solid transparent",
                    cursor: "pointer"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.border = "2px solid rgb(70, 4, 67)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(70, 4, 67, 0.4)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.border = "2px solid transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h5
                    className="fw-bold"
                    style={{
                      color: "rgba(44,44,122,1)",
                      fontSize: "1.2rem",
                      wordWrap: "break-word"
                    }}
                  >
                    {cat.Category_Name}
                  </h5>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-muted fs-5" style={{ width: "100%" }}>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherCategory;

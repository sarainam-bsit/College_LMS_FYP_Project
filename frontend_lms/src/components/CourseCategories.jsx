import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CourseCategories = () => {
  const { deptId } = useParams();
  const [categories, setCategories] = useState([]);
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    
    axios
      .get(`http://127.0.0.1:8000/dept/dept_api/${deptId}/`)
      .then((res) => setDepartmentName(res.data.Department_Name))
      .catch((err) => console.error("Error fetching department:", err));

    
    axios
      .get(
        `http://127.0.0.1:8000/dept/course-categories/by_department/?department_id=${deptId}`
      )
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, [deptId]);

  return (
    <div
      className="container p-3"
      style={{ marginTop: "80px", minHeight: "90vh", backgroundColor: "#ebeaf2ff" }}
    >
      
      <h2
        className="text-center p-3 rounded shadow-lg mx-auto"
        style={{
          backgroundColor: "rgb(70, 4, 67)",
          color: "white",
          maxWidth: "350px",
          fontWeight: "bold",
        }}
      >
        {departmentName}
      </h2>

    
      <div className="row mt-5">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Link
                to={`/department/${deptId}/category/${cat.id}`}
                className="text-decoration-none"
              >
                <div
                  className="card shadow-sm border-0 d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#f5ecf4ff",
                    borderRadius: "12px",
                    padding: "40px 20px",
                    minHeight: "140px",
                    transition: "all 0.3s ease-in-out",
                    border: "2px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.border = "2px solid rgb(70, 4, 67)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(70, 4, 67, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.border = "2px solid transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Category Name */}
                  <h5
                    className="fw-bold text-center"
                    style={{
                      color: "rgba(44,44,122,1)",
                      fontSize: "1.2rem",
                      wordWrap: "break-word",
                    }}
                  >
                    {cat.Category_Name}
                  </h5>
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

export default CourseCategories;

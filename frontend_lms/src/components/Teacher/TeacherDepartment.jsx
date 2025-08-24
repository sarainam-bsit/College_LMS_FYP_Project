import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
const TeacherDepartment = ({ deptId }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/dept/dept_api/")
    .then(response => response.json())
    .then(data =>{
      setDepartments(data);
      setLoading(false);
    })
    .catch(error =>{
      console.error('Error fetching department:', error);
      setLoading(false);
    });
  }, []);
  if (loading){
    return <p>Loading departments...</p>;
  }

  return (
    <>
      <style>{`
    .image:hover{
        transform: scale(1.08);
        transition: transform 0.3s ease;
    }
        .hover:hover{
        transform: scale(1.02);
        transition: transform 0.3s ease;
       
        }
    `}</style>
    
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mb-4 mt-4 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>BS Programs</h2>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4 mb-4">
          {departments.map(dept =>(
          <div className="col" key={dept.id}>
            <Link to={`/semesterIT`} className='text-decoration-none'>
              <div className="card">
                <div className="card-body">
                  <img src={dept.Department_Image} className="image card-img-top img-fluid" alt="..." style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <Link to={`/teacher/department/${dept.id}/categories`} className='text-danger'><h5 className="hover card-title fw-bold">{dept.Department_Name}</h5></Link>
                    <p className="card-text">{dept.Discription}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TeacherDepartment
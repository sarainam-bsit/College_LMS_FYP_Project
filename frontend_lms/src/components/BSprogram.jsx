import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const BSprogram = () => {
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
    return <p className="text-center mt-5">Loading departments...</p>;
  }

  return (
    <>
      <style>{`
        .image:hover {
          transform: scale(1.08);
          transition: transform 0.3s ease;
        }
        .hover:hover {
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
        .card-custom {
          background-color: #f5ecf4ff;
          border-radius: 12px;
          border: none;
          transition: transform 0.3s;
        }
        .card-custom:hover {
          transform: scale(1.02);
        }
        .card-title-custom {
          color: rgb(4, 4, 63);
        }
      `}</style>

      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh", backgroundColor: "#ebeaf2ff" }}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mb-4 mt-4 py-3 px-3 mx-auto rounded shadow-lg"
                style={{
                  maxWidth: '300px',
                  backgroundColor: "rgb(70, 4, 67)",
                  color: "white",
                  fontWeight: "700"
                }}
            >
              Programs
            </h2>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4 mb-4">
          {departments.map(dept =>(
            <div className="col" key={dept.id}>
              <Link to={`/categories/${dept.id}`} className='text-decoration-none'>
                <div className="card card-custom shadow-sm">
                  <img src={dept.Department_Image} className="image card-img-top img-fluid" alt={dept.Department_Name} style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} />
                  <div className="card-body text-center">
                    <h5 className="hover card-title card-title-custom fw-bold">{dept.Department_Name}</h5>
                    <p className="card-text">{dept.Discription}</p>
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

export default BSprogram;

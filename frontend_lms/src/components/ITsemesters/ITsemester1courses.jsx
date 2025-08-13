import React from 'react';
import Navbar from '../Navbar';
import {Link} from 'react-router-dom';
const ITsemester1courses = () => {
  return (
    <>
     <style>{`
        .lectures:hover{
        transform: scale(1.04);
    transition: transform 0.3s ease, 
        }
        `}
        </style>
    <Navbar />
            <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6">
                        <h2 className="heading text-center mt-4 bg-dark text-white py-1 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Courses</h2>
                    </div>
                </div>
                <div className="table-responsive">
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Departments</th>
                            <th scope="col">C. Category</th>
                            <th scope="col">C. Code</th>
                            <th scope="col">Course Title</th>
                            <th scope="col">Teachers</th>
                            <th scope="col">Lectures</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">DI-321</th>
                             <td>Web Development</td>
                            <td>Mam Sherish</td>
                            <td>IT Department</td>
                            <Link to="/ITsemester1lectures"className=' text-danger'><td className='lectures fw-bold'>Lectures</td></Link>
                            
                        </tr>
                    </tbody>
                </table>
                </div>
                
               
            </div>
    </>
  )
}

export default ITsemester1courses
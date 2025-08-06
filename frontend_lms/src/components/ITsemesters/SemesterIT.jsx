import React from 'react';
import Navbar from '../Navbar';
import {Link} from 'react-router-dom';
const SemesterIT = () => {
    return (
        <>
        <style>{`
        .hover:hover{
        transform: scale(1.04);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, 
    box-shadow 0.3s ease;
        }
        `}
        </style>
            <Navbar />
            <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6">
                        <h2 className="heading text-center mb-4 mt-4 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>IT Semesters</h2>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4 mt-4 mb-4">
                    <div className="col">
                        <Link to="/semester1IT" className='text-decoration-none'>
                    <div className="hover card bg-dark d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                        <div className="card-body  d-flex justify-content-center align-items-center">
                            <h1 className='text-white'>Semester1</h1>
                        </div>
                    </div>
                    </Link>
                    </div>
                    <div className="col">
                    <div className="card bg-dark d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                        <div className="card-body  d-flex justify-content-center align-items-center">
                            <h1 className='text-white'>Semester 2</h1>
                        </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="card bg-dark d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                        <div className="card-body  d-flex justify-content-center align-items-center">
                            <h1 className='text-white'>Semester 3</h1>
                        </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="card bg-dark d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                        <div className="card-body  d-flex justify-content-center align-items-center">
                            <h1 className='text-white'>Semester 4</h1>
                        </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="card bg-dark d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                        <div className="card-body  d-flex justify-content-center align-items-center">
                            <h1 className='text-white'>Semester 5</h1>
                        </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="card bg-dark d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                        <div className="card-body  d-flex justify-content-center align-items-center">
                            <h1 className='text-white'>Semester 6</h1>
                        </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="card bg-dark d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                        <div className="card-body  d-flex justify-content-center align-items-center">
                            <h1 className='text-white'>Semester 7</h1>
                        </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="card bg-dark d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                        <div className="card-body  d-flex justify-content-center align-items-center">
                            <h1 className='text-white'>Semester 8</h1>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SemesterIT
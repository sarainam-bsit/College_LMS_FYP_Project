import React from 'react';
import Navbar from '../Navbar';
const ITsemester1timetable = () => {
    return (
        <>
            <Navbar />
            <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6">
                        <h2 className="heading text-center mt-4 bg-dark text-white py-1 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>TimeTable</h2>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">C. Code</th>
                                <th scope="col">Course Title</th>
                                <th scope="col">Teachers</th>
                                <th scope="col">Departments</th>
                                <th scope="col">Time</th>
                                <th scope="col">Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">DI-321</th>
                                <td>Web Development</td>
                                <td>Mam Sherish</td>
                                <td>IT Department</td>
                                <td>8:30</td>
                                <td>23-06-24</td>

                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default ITsemester1timetable
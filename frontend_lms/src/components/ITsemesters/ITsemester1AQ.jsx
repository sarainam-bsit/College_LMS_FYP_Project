import React from 'react';
import Navbar from '../Navbar';

const ITsemester1AQ = () => {
  return (
    <>

      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mt-4 bg-dark text-white py-1 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Assignments & Quizzes</h2>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">Type</th>
                 <th scope="col">C. Code</th>
                <th scope="col">Course Title</th>
                <th scope="col"> Teacher Name</th>
                <th scope="col">Ended Date</th>
                <th scope="col">Google Classroom Link</th>
                <th scope="col">Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Assignment#1</th>
                 <td>DI-321</td>
                <td>Web development</td>
                <td>Mam Sherish</td>
                <td>3-06-24</td>
                <td></td>
                <td>8/10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default ITsemester1AQ
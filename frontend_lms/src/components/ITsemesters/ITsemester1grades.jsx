import React from 'react';
import Navbar from '../Navbar';
const ITsemester1grades = () => {
  return (
    <>
      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mt-4 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '300px' }}>Grades</h2>
          </div>
        </div>
        <div className="card mt-3">
          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">Seventh Semester</li>

          </ul>
          <div className="table-responsive">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col">C. Code</th>
                  <th scope="col">Course Title</th>
                  <th scope="col">Mids</th>
                  <th scope="col">A&Q</th>
                  <th scope="col">Presentations</th>
                  <th scope="col">Attendance</th>
                  <th scope="col">Final</th>
                  <th scope="col">Total Marks</th>
                  <th scope="col">Obt Marks</th>
                   <th scope="col">CH</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Grade Points</th>
                  <th scope="col">Status</th>
                </tr>

              </thead>
              <tbody>
                <tr>
                  <th scope="row">DI-423</th>
                  <td>Database Administration</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>4</td>
                  <td>A</td>
                  <td>3.7</td>
                  <td>Pass</td>

                </tr>
                

              </tbody>
            </table>
            <ul className="list-group list-group-horizontal-xxl mt-5">
  <li className="list-group-item w-50" >CH: 16</li>
  <li className="list-group-item w-50">CGPA: 3.61</li>
  <li className="list-group-item w-50">GPA: 3.93</li>
</ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ITsemester1grades
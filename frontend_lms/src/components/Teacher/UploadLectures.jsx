import React from "react";
import TeacherNavbar from "./TeacherNavbar";

const UploadLectures = () => {
 

  return (
    <>
      <TeacherNavbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mt-4 bg-dark text-white py-1 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: "400px" }} >Upload Lectures</h2>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">C.Code</th>
                <th scope="col">Course Title</th>
                <th scope="col">Lectures No</th>
                <th scope="col">Lectures Title</th>
                <th scope="col">Action</th>
                <th scope="col">Add</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button className="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#AddLectureModal" >Add</button>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#EditLectureModal" >Edit</button>
                </td>
                <td>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal fade modal-lg" id="AddLectureModal" tabIndex="-1" aria-labelledby="AddLectureModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddLectureModalLabel">Add Lecture</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mt-2">
                  <label htmlFor="cCode" className="form-label">C.Code</label>
                  <input type="text" className="form-control" id="cCode" required />
                </div>
                <div className="mt-2">
                  <label htmlFor="courseTitle" className="form-label">Course Title</label>
                  <input type="text" className="form-control" id="courseTitle" required />
                </div>
                <div className="mt-2">
                  <label htmlFor="lectureNo" className="form-label">Lecture No</label>
                  <input type="text" className="form-control" id="lectureNo" required />
                </div>
                <div className="mt-2">
                  <label htmlFor="lectureTitle" className="form-label">Lecture Title</label>
                  <input type="text" className="form-control" id="lectureTitle" required />
                </div>
                <div className="mt-2">
                  <label htmlFor="lectureFile" className="form-label">Attached Lecture File</label>
                  <input type="file" className="form-control" id="lectureFile" required />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade modal-lg" id="EditLectureModal" tabIndex="-1" aria-labelledby="EditLectureModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditLectureModalLabel">Add Lecture</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mt-2">
                  <label htmlFor="cCode" className="form-label">C.Code</label>
                  <input type="text" className="form-control" id="cCode" required />
                </div>
                <div className="mt-2">
                  <label htmlFor="courseTitle" className="form-label">Course Title</label>
                  <input type="text" className="form-control" id="courseTitle" required />
                </div>
                <div className="mt-2">
                  <label htmlFor="lectureNo" className="form-label">Lecture No</label>
                  <input type="text" className="form-control" id="lectureNo" required />
                </div>
                <div className="mt-2">
                  <label htmlFor="lectureTitle" className="form-label">Lecture Title</label>
                  <input type="text" className="form-control" id="lectureTitle" required />
                </div>
                <div className="mt-2">
                  <label htmlFor="lectureFile" className="form-label">Attached Lecture File</label>
                  <input type="file" className="form-control" id="lectureFile" required />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadLectures;

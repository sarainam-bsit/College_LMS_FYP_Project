import React from 'react'
import { Link } from 'react-router-dom';
const Profile = () => {
  return (
    <>

      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="row justify-content-center">
          <div className="col-12 col-md-4 mt-5">
            <div className="card" >
              <img src="/principle.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <ul class="list-group">
                  <li class="list-group-item"><input type="text" className="form-control" value="Sara Inam" readOnly /></li>
                  <li class="list-group-item"><input type="text" className="form-control" value="Government Graduate Colllege Civil Line SKP" readOnly /></li>
                </ul>
                <div className="d-flex justify-content-center">
                  <Link to="" className="btn btn-primary w-50 w-md-25">Change Picture</Link>
                </div>
              </div>
            </div>
            
          </div>
          <div className="col-12 col-md-6 mt-4">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6">
                      <h5 className=" heading text-center  mt-2 bg-dark text-white py-2 px-2 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Personal Information</h5>
                    </div>
                  </div>
                  <div className="row mb-3 g-2 mt-3">
                    <div className="col-12 col-md-6">
                      <input type="text" className="form-control" value="Sara Inam" readOnly />
                    </div>
                    <div className="col-12 col-md-6">
                      <input type="text" class="form-control" value="Muhammad Inam" readOnly />
                    </div>
                  </div>
                  <div className="row mb-3 g-2 mt-3">
                    <div className="col-12 col-md-6">
                      <input type="text" className="form-control" value="Registration no" readOnly />
                    </div>
                    <div className="col-12 col-md-6">
                      <input type="text" className="form-control" value="Roll no" readOnly />
                    </div>
                  </div>
                  <div className="row mb-3 g-2 mt-3">
                    <div className="col-12 col-md-6">
                      <input type="text" class="form-control" value="CNIC" readOnly />
                    </div>
                    <div className="col-12 col-md-6">
                      <input type="text" class="form-control" value="Father's CNIC" readOnly />
                    </div>
                  </div>
                  <div className="row mb-3 g-2 mt-3">
                    <div className="col-12 col-md-6">
                      <input type="text" className="form-control" value="BS Program" readOnly />
                    </div>
                    <div className="col-12 col-md-6">
                      <input type="text" class="form-control" placeholder="Gender" required />
                    </div>
                  </div>
                  <div className=" mb-3 mt-3">

                    <input type="email" className="form-control" value="College Provided Email" readOnly />
                  </div>
                  <div className=" mb-3 mt-3">

                    <input type="text" className="form-control" id="Address" placeholder="Home address" required />
                  </div>
                  <div className=" mb-3 mt-3">

                    <input type="tel" className="form-control" id="phone" name="phone" placeholder="Phone no" pattern="[0-9]{4}-[0-9]{7}" required />
                  </div>
                  <div className="mb-3 mt-3">
                    <input type="text" class="form-control" id="inputCity" placeholder='City' required />
                  </div>
                  <div className=" mb-3 mt-3">
                    <input type="text" className="form-control" value="Government Graduate College Civil Line SKP" readOnly />
                  </div>
                  <div className=" mb-3 mt-3">

                  </div>
                  <button type="update" className="btn btn-primary ">Update</button>

                </form>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-12 mt-4 mb-4">
            <div className="card">
            <div className="row justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6">
                      <h5 className=" heading text-center  mt-2 bg-dark text-white py-2 px-2 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Accademic Details</h5>
                    </div>
                  </div>
            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col">Level</th>
                  <th scope="col">Degree Title</th>
                  <th scope="col">Board/Institute</th>
                  <th scope="col">Registration No</th>
                  <th scope="col">Roll No</th>
                  <th scope="col">Passing Year</th>
                </tr>

              </thead>
              <tbody>
                <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                
              </tbody>
            </table>

          </div>
          </div>
        </div>
     
      </div>
    </>

  )
}

export default Profile
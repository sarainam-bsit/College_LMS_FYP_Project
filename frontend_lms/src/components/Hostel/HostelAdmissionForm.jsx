import React from 'react';

const HostelAdmissionForm = () => {
  return (
 <div className="container p-1">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6">
            <h2 className="heading text-center mt-4 bg-dark text-white py-1 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Hostel Admission Form</h2>
          </div>
        </div>
         <div className="card bg-light w-100 mx-3 my-3" >
                    <div className="card-body">
                        <form className='form'>
                            <div className="row mb-3 g-2 mt-3">
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control" placeholder="Your name" aria-label="Your name" required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control" placeholder="Father's name" aria-label="Father's name" required />
                                </div>
                            </div>
                            <div className="row mb-3 g-2 mt-3">
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control" id="registrationNumber" placeholder="Registration no" required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control" id="rollNumber" placeholder="Roll no" required />
                                </div>
                            </div>
                            <div className="row mb-3 g-2 mt-3">
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control" placeholder="CNIC" aria-label="First name" required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control" placeholder="Father's CNIC" aria-label="Last name" required />
                                </div>
                            </div>
                            <div className="row mb-3 g-2 mt-3">
                                <div className="col-12 col-md-6">
                                    <label className="visually-hidden" for="autoSizingSelect">Preference</label>
                                    <select className="form-select" id="autoSizingSelect" required>
                                        <option value="1">BS Programs</option>
                                        <option value="2">BS Zoology</option>
                                        <option value="2">BS IT</option>
                                        <option value="2">BS Maths</option>
                                        <option value="2">BS English</option>
                                        <option value="2">BS Physics</option>
                                        <option value="2">BS Islamiyat</option>
                                        <option value="2">BS Economics</option>
                                        <option value="2">Short Courses</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="visually-hidden" for="autoSizingSelect">Preference</label>
                                    <select className="form-select" id="autoSizingSelect" required>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className=" mb-3 mt-3">

                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="College Provided Email" aria-describedby="emailHelp" required />
                            </div>
                            <div className="row mb-3 g-2 mt-3">
                                <div className="col-12 col-md-6">
                                    <input type="password" className="form-control" id="password" placeholder="Enter password" required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="visually-hidden" for="autoSizingSelect">Preference</label>
                                    <select className="form-select" id="autoSizingSelect" required>
                                        <option value="1">Room Type</option>
                                        <option value="2">Single Rooms</option>
                                        <option value="2">Double Rooms</option>
                                        <option value="2">Dormitory Rooms</option>
                                    </select>
                                </div>
                               
                            </div>
                            <div className="row mb-3 g-2 mt-3">
                                <div className="col-12 col-md-6">
                                     <label className="visually-hidden" for="autoSizingSelect">Preference</label>
                                    <select className="form-select" id="autoSizingSelect" required>
                                        <option value="1">Duration: 1 year</option>
                                        <option value="2">Duration: 1-2 year</option>
                                        <option value="2">Duration: 1-3 year</option>
                                        <option value="2">Duration: 4 year</option>
                                        
                                    </select>
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="tel" className="form-control" id="phone" name="phone" placeholder="Phone no" pattern="[0-9]{4}-[0-9]{7}" required />
                                </div>
                               
                            </div>
                             <div className="mb-3 mt-3">
                                    <textarea type="text" rows= '3' className="form-control" id="home address" name="home address" placeholder="Home Address" required />
                                </div>


                            <button type="submit" className="btn btn-primary ">Submit</button>
                        </form>
                    </div>
                </div>
        </div>
  )
}

export default HostelAdmissionForm
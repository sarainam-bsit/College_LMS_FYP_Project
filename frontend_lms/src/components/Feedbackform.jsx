import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Feedbackform = () => {
  return (
    <>
      <Navbar />
      <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
        <div className="card border-0">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <h2 className="heading text-center mb-2 mt-2 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>
                Give Feedback
              </h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="card mb-3 shadow-lg border-0">
                <div className="row g-0 flex-column flex-md-row">
               
                  <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img
                      src="/logo-removebg-preview (1).png"
                      className="img-fluid rounded-start w-50 "
                      style={{ objectFit: "cover" }}
                      alt="..."
                    />
                    
                  </div>

                
                  <div className="col-md-6 p-4">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="exampleInputName" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Type Your Message Here</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
                      </div>
                      <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                      </div>
                      <button type="submit" className="btn btn-primary ">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Feedbackform;

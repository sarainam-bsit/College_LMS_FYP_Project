import React from 'react';
import './Feedback.css';


const Feedback = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6">
          <h2 className="heading text-center mb-4 mt-3 bg-dark text-white py-3 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Student Feedback</h2>
        </div>
      </div>
      <div id="feedbackCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">


          <div className="carousel-item active">
            <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
              <div className="col">
                <div className="cardhover card h-100">
                  <img src="/pexels-anastasiya-gepp-654466-1462630.jpg" className="card-img-top" alt="Student 1" />
                  <div className="card-body">
                    <h5 className="card-title">Ayesha</h5>
                    <p className="card-text">Very helpful platform. Loved the course content!</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardhover card h-100">
                  <img src="/pexels-george-dolgikh-551816-1326947.jpg" className="card-img-top" alt="Student 2" />
                  <div className="card-body">
                    <h5 className="card-title">Ali</h5>
                    <p className="card-text">The LMS made my learning experience smooth and easy.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardhover card h-100">
                  <img src="/pexels-olly-3769021.jpg" className="card-img-top" alt="Student 3" />
                  <div className="card-body">
                    <h5 className="card-title">Fatima</h5>
                    <p className="card-text">Assignments and grades were well organized. Thank you!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="carousel-item">
            <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
              <div className="col">
                <div className="cardhover card h-100">
                  <img src="/pexels-anastasiya-gepp-654466-1462630.jpg" className="card-img-top" alt="Student 4" />
                  <div className="card-body">
                    <h5 className="card-title">Usman</h5>
                    <p className="card-text">It was easy to download lectures and stay updated.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardhover card h-100">
                  <img src="/pexels-anastasiya-gepp-654466-1462630.jpg" className="card-img-top" alt="Student 5" />
                  <div className="card-body">
                    <h5 className="card-title">Hira</h5>
                    <p className="card-text">I liked the notification feature. Very useful!</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="cardhover card h-100">
                  <img src="/pexels-george-dolgikh-551816-1326947.jpg" className="card-img-top" alt="Student 6" />
                  <div className="card-body">
                    <h5 className="card-title">Ahmed</h5>
                    <p className="card-text">Easy login and smooth interface. Great job!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        <button className="carousel-control-prev" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="prev" style={{ top: '50%', transform: 'translateY(-50%)', width: 'auto' }}>
          <span className="custom-arrow "><i className="fa-solid fa-less-than fs-1  text-white"></i></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="next" style={{ top: '50%', transform: 'translateY(-50%)', width: 'auto' }}>
          <span className="custom-arrow"><i className="fa-solid fa-greater-than fs-1  text-white" ></i></span>
        </button>
      </div>
    </div>
  );
};

export default Feedback;

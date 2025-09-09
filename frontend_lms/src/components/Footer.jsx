import React from 'react';
import {Link} from "react-router-dom";
import './Footer.css'; 
const Footer = () => {
  return (
    <>


    <footer className='bg-dark text-light py-4  w-100 mb-0'>
      <div className="container px-4">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3">
            <img src="/logo-removebg-preview (1).png" className="image-fluid  " alt="logo" style={{ height: "50px", width: "auto" }} />
            <h6  >College LMS</h6>
            <p>Lorem ipsum, dolor sit amet , aspernatur labore tempore?</p>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className='text-danger'>Menu</h4>
            <ul className="list-unstyled">
              <li className='footerlinks'><Link to=""className='text-decoration-none text-light'>Home</Link></li>
              <li className='footerlinks'><Link to="/about"className='text-decoration-none text-light'>About</Link></li>
              <li className='footerlinks'><Link to="/contact"className='text-decoration-none text-light'>Contact</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className='text-danger'>More</h4>
            <ul className="list-unstyled">
              <li className='footerlinks'><Link to=""className='text-decoration-none text-light'>Feedback</Link></li>
              <li className='footerlinks'><Link to="/notifications"className='text-decoration-none text-light'>Notifications</Link></li>
              <li className='footerlinks'><Link to=""className='text-decoration-none text-light'>Privacy Policy</Link></li>
              
            </ul>
          </div>
        <div className="col-12 col-md-6 col-lg-3">
            <h4 className='text-danger'>Category</h4>
            <ul className="list-unstyled">
              <li className='footerlinks'><Link to=""className='text-decoration-none text-light'>BS Programs</Link></li>
              <li className='footerlinks'><Link to=""className='text-decoration-none text-light'>Hostel</Link></li>
              <li className='footerlinks'><Link to=""className='text-decoration-none text-light'>Library</Link></li>
            </ul>
          </div>
         <div className="col-12 col-md-6 col-lg-3 pt-4">
            
            <div>
              <Link to=""className='text-decoration-none text-light'><i className="fa-brands fa-square-instagram fs-4 me-3"></i></Link>
               <Link to=""className='text-decoration-none text-light'><i className="fa-brands fa-square-facebook fs-4 me-3"></i></Link>
              <Link to=""className='text-decoration-none text-light'><i className="fa-brands fa-square-whatsapp fs-4 me-3"></i></Link>
              <Link to=""className='text-decoration-none text-light'><i className="fa-brands fa-linkedin fs-4"></i></Link>

            </div>
            
          </div>
        </div>
        <hr/>
        <div className='d-flex flex-column flex-md-row justify-content-between'>
          <p>2025 College LMS. All Right Reserved</p>
        
        <div className='d-flex '>
              <Link to=""className='text-decoration-none text-light me-4'>Term of Use</Link>
               <Link to=""className='text-decoration-none text-light'>Privacy Policy</Link>
        </div>
        </div>
      </div>

    </footer>
    </>


  )
}

export default Footer
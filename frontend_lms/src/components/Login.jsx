import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OTPverification from "./OTPverification";
import CarouselBackground from "./Admin/CarouselBackground";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://127.0.0.1:8000/Account/Login_api/';

const Login = ({ setIsLoggedIn, setUserRole }) => {
  const [loginData, setLoginData] = useState({ Email: '', Password: '', Role: '' });
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

 

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage({});
    setSuccessMessage('');
    setUserEmail(loginData.Email);

    const formData = new FormData();
    formData.append('Email', loginData.Email);
    formData.append('Password', loginData.Password);
    formData.append('Role', loginData.Role);

    try {
      const response = await axios.post(BASE_URL, formData);
      const role = response.data.role;
      setLoginData({ Email: '', Password: '', Role: '' });
      setErrorMessage({});

      if (role === 'student' || role === 'teacher') {
        setIsLoggedIn(true);
        setUserRole(role);
        localStorage.setItem('userRole', role);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('studentId', response.data.student_id);
        localStorage.setItem('teacherId', response.data.teacher_id);

        setSuccessMessage(response.data?.message);
        toast.success(response.data?.message);

        setTimeout(() => {
          navigate(role === 'student' ? '/home' : '/TeacherDashboard');
        }, 1000);
      } else {
        setErrorMessage({ general: 'Unknown role received' });
      }
    } catch (error) {
      setSuccessMessage('');
      const backendErrors = error.response?.data || {};

      if (backendErrors.errorcode === 'VERIFY_OTP') {
        toast.info(backendErrors.errors);
        setShowOTP(true);
        setUserEmail(loginData.Email);
      } else if (backendErrors.errorcode === 'REGISTRATION_REQUIRED') {
        toast.warning(backendErrors.errors);
        navigate('/registration', { state: { fromLogin: true } });
      } else {
        setErrorMessage(backendErrors.errors || {});
      }
    }
  };

  return (
    <>
      <style>{`
        .background-wrapper { position: relative; height: 100vh; overflow: hidden; }
        .login-overlay { position: absolute; top:0; left:0; width:100%; height:100%; 
          background: rgba(0,0,0,0.6); display:flex; justify-content:center; align-items:center; }
        .login-card { backdrop-filter: blur(15px); background: rgba(222, 49, 204, 0.15);
          border-radius: 20px; padding: 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          width: 90%; max-width: 400px; color: #fff; }
        .login-card h2 { text-align:center; margin-bottom:20px; background: rgb(2,2,40); font-weight:bold;
          padding: 10px; border-radius: 12px; }
        .LoginInput, .LoginSelect { background: rgba(255,255,255,0.2); border:none; color:white; }
        .LoginInput::placeholder { color: #ddd; }
        .LoginBtn { width:100%; margin-top:15px; color:white; font-size:1.2rem; font-weight:bold;
          background: rgb(2,2,40); border:none; }
        .LoginBtn:hover { background: rgb(2,2,40); }
        .LoginLabel { font-weight:bold; color:#f5f5f5; }
        .field-error { color:#d20d0dc7; font-size:1rem; margin-top:4px; }
        .LoginSelect option {color: black;}
      `}</style>

      <div className="background-wrapper">
        <CarouselBackground /> 
        <div className="login-overlay">
          <div className="login-card">
            <form onSubmit={submitForm}>
              <h2>Login</h2>

              {successMessage && (
                <div style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px', textAlign:'center' }}>
                  {successMessage}
                </div>
              )}

              <div className="mb-3">
                <label className='LoginLabel'>Email</label>
                <input
                  type="email"
                  name="Email"
                  value={loginData.Email}
                  onChange={handleChange}
                  className="LoginInput form-control"
                  placeholder="College Email"
                />
                {errorMessage.Email && (
                  <div className="field-error">{Array.isArray(errorMessage.Email) ? errorMessage.Email[0] : errorMessage.Email}</div>
                )}
              </div>

              <div className="mb-3">
                <label className='LoginLabel'>Password</label>
                <input
                  type="password"
                  name="Password"
                  value={loginData.Password}
                  onChange={handleChange}
                  className="LoginInput form-control"
                  placeholder="Enter Password"
                />
                {errorMessage.Password && (
  <div className="field-error">
    {Array.isArray(errorMessage.Password)
      ? errorMessage.Password.map((err, index) => (
          <div key={index}>{err}</div>
        ))
      : errorMessage.Password
    }
  </div>
)}
              </div>

              <div className="mb-3">
                <label className='LoginLabel'>Role</label>
                <select
                  name="Role"
                  value={loginData.Role}
                  onChange={handleChange}
                  className="LoginSelect form-select"
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                {errorMessage.Role && <div className="field-error">{errorMessage.Role}</div>}
              </div>
<button type="submit" className="LoginBtn p-1">Submit</button>
              <div className="mt-3">
                <p><Link className="text-decoration-none text-white" to="/reset">Forget Password?</Link></p>
              </div>

              

              {/* OTP Modal */}
              <OTPverification
                show={showOTP}
                onClose={() => { setShowOTP(false); setUserEmail(null); }}
                email={userEmail}
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
              />

              {errorMessage.general && <div className="field-error">{errorMessage.general}</div>}

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

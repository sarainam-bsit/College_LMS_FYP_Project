import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OTPverification from "./OTPverification";
import Home from './Home';
import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Main from './Main';


const BASE_URL = 'http://127.0.0.1:8000/Account/Login_api/';

const Login = ({ setIsLoggedIn, setUserRole }) => {
    const [loginData, setLoginData] = useState({
        Email: '',
        Password: '',
        Role: '',
    });
    const [errorMessage, setErrorMessage] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
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
            console.log('Login response:', response.data);

            const role = response.data.role;  // backend se role
            setLoginData({ Email: '', Password: '', Role: '' });
            setErrorMessage({});

            if (role === 'student' || role === 'teacher') {
                setIsLoggedIn(true);
                setUserRole(role);
                localStorage.setItem('userRole', role);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('studentId', response.data.student_id);
                localStorage.setItem('teacherId', response.data.teacher_id);

                // ✅ ye hi important hai

                setSuccessMessage(response.data?.message);
                toast.success(response.data?.message);

                if (role === 'student') {
                    setTimeout(() => {
                        navigate('/home');
                    }, 1000);
                } else if (role === 'teacher') {
                    setTimeout(() => {
                        navigate('/TeacherDashboard');
                    }, 1000);
                }
            } else {
                setErrorMessage({ general: 'Unknown role received' });
            }
        } catch (error) {
            setSuccessMessage('');
            const backendErrors = error.response?.data || {};

            if (backendErrors.errorcode === 'VERIFY_OTP') {
                toast.info(backendErrors.errors);   // 🔵 Info toast
                setShowOTP(true);
                setUserEmail(loginData.Email);
            } else if (backendErrors.errorcode === 'REGISTRATION_REQUIRED') {
                toast.warning(backendErrors.errors);  // 🟡 Warning toast
                navigate('/registration', { state: { fromLogin: true } });
            } else {
                setErrorMessage(backendErrors.errors || {});
            }
        }
    };

    return (
        <>
            <style>{`
        .background-wrapper {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }
        .background-wrapper > * {
          pointer-events: none;
        }
        .login-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.59);
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: all;
        }
        .login-card {
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          width: 90%;
          max-width: 400px;
          color: #fff;
        }
        .login-card h2 {
          color: #fff;
          text-align: center;
          margin-bottom: 20px;
          background: rgba(0,0,0,0.5);
          padding: 10px;
          border-radius: 12px;
        }
        .LoginInput, .LoginSelect{
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
        }
        .LoginSelect option {
          background-color: #2c2c2c;
          color: #f5f5f5;
        }
        .LoginInput::placeholder {
          color: #ddd;
        }
        .LoginBtn {
          width: 50%;
          margin-top: 15px;
          margin-left: 25%;
          background: #d2691e;
          border: none;
        }
        .LoginBtn:hover {
          background: #8b4513;
        }
        .LoginLabel{
          font-weight: bold;
          color: #f5f5f5;
        }
        .LoginInput:focus,
        .LoginSelect:focus {
          background: rgba(255, 255, 255, 0.3);
          border: 1px solid #ff9800;
          box-shadow: 0 0 8px #ff9800;
          color: white;
        }
      `}</style>

            <div className="background-wrapper">
                <Home />
                <div className="login-overlay">
                    <div className="login-card">
                        <form >
                            <h2>Login</h2>



                            {successMessage && (
                                <div style={{ backgroundColor: 'lightgreen', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                                    {successMessage}
                                </div>
                            )}


                            <div className="mt-3">
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
                                    <small style={{ color: 'red' }}>
                                        {Array.isArray(errorMessage.Email) ? errorMessage.Email[0] : errorMessage.Email}
                                    </small>
                                )}
                            </div>

                            <div className="mt-3">
                                <label className='LoginLabel'>Password</label>
                                <input
                                    type="password"
                                    name="Password"
                                    value={loginData.Password}
                                    onChange={handleChange}
                                    className="LoginInput form-control"
                                    placeholder="Enter your password"

                                />
                                {errorMessage.Password && (
                                    <div style={{ color: 'red' }}>
                                        {Array.isArray(errorMessage.Password) ? (
                                            errorMessage.Password.map((err, index) => (
                                                <div key={index}>{err}</div>
                                            ))
                                        ) : (
                                            <div>{errorMessage.Password}</div>
                                        )}
                                    </div>
                                )}

                            </div>

                            <div className="mt-3">
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
                                {errorMessage.Role && (
                                    <div className="text-danger">{errorMessage.Role}</div>
                                )}
                            </div>

                            <div className="mt-3">
                                <p>
                                    <Link className="text-decoration-none text-warning" to="/reset">
                                        Forget Password?
                                    </Link>
                                </p>
                            </div>

                            <button onClick={submitForm} type="submit" className="LoginBtn btn btn-warning">Submit</button>

                            <OTPverification
                                show={showOTP}
                                onClose={() => {
                                    setShowOTP(false);
                                    setUserEmail(null);
                                }}
                                email={userEmail}
                                setIsLoggedIn={setIsLoggedIn}
                                setUserRole={setUserRole}   // ✅ add this line
                            />

                            {errorMessage.general && (
                                <div className="alert alert-danger">{errorMessage.general}</div>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
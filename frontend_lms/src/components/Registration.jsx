import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Home from './Home';
import OTPverification from "./OTPverification";
const BaseUrl = 'http://127.0.0.1:8000/Account/register_api/';

const Registration = () => {
    const [studentData, setstudentData] = useState({
        Reg_No: '',
        Roll_No: '',
        Student_Email: '',
        Student_Password: '',
        Re_enter_Password: '',
        status: ''
    });
    const [errorMessage, setErrorMessage] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [studentId, setStudentId] = useState(null);

    const handleChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        document.title = 'Student Registration';
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();

        const studentFormData = new FormData();
        studentFormData.append('Reg_No', studentData.Reg_No);
        studentFormData.append('Roll_No', studentData.Roll_No);
        studentFormData.append('Student_Email', studentData.Student_Email);
        studentFormData.append('Student_Password', studentData.Student_Password);
        studentFormData.append('Re_enter_Password', studentData.Re_enter_Password);

        try {
            const response = await axios.post(BaseUrl, studentFormData);
            if (response.status === 200) {
                setstudentData({
                    Reg_No: '',
                    Roll_No: '',
                    Student_Email: '',
                    Student_Password: '',
                    Re_enter_Password: '',
                    status: 'success'
                });
                setErrorMessage({});
                setSuccessMessage(response.data.message);

                if (response.data.student_id) {
                    setStudentId(response.data.student_id);
                    setTimeout(() => {
                        setShowOTP(true);
                    }, 1000);
                }
            } else {
                setErrorMessage({ general: "OTP generation failed. Try again." });
            }
        } catch (error) {
            console.log("Backend Error Response:", error.response?.data);
            setSuccessMessage('');

            if (error.response?.data?.errors) {
                setErrorMessage(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setErrorMessage({ general: error.response.data.message });
            } else {
                setErrorMessage({ general: "Something went wrong!" });
            }
            setstudentData({ ...studentData, status: 'error' });
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

                .register-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.59);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    pointer-events: all;
                    z-index: 2000;
                }

                .register-card {
                    backdrop-filter: blur(15px);
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 20px;
                    padding: 30px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                    width: 95%;
                    max-width: 600px;
                    color: #fff;
                }

                .register_heading {
                    color: #fff;
                    text-align: center;
                    margin-bottom: 20px;
                    background: rgba(0,0,0,0.5);
                    padding: 10px;
                    border-radius: 12px;
                }

                .registerInput{
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                }

                .registerInput::placeholder {
                    color: #ddd;
                }
                .registerInput:focus{
                    background: rgba(255, 255, 255, 0.3);
                    border: 1px solid #ff9800;
                    box-shadow: 0 0 8px #ff9800;
                    color: white;
                }
            `}</style>

            <div className="background-wrapper">
                <Home />
                <div className="register-overlay">
                    <div className="register-card">
                        <form>
                            <h2 className='register_heading'>Register</h2>

                            {successMessage && (
                                <div style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>
                                    {successMessage}
                                </div>
                            )}
                            <div className="row mb-3 g-2 mt-3">
                                <div className="col-12 col-md-6">
                                    <input type="text" value={studentData.Reg_No} name='Reg_No' onChange={handleChange} className="registerInput form-control" placeholder="Registration No" required />
                                    {errorMessage.Reg_No && (
                                        <small style={{ color: 'red' }}>
                                            {Array.isArray(errorMessage.Reg_No) ? errorMessage.Reg_No[0] : errorMessage.Reg_No}
                                        </small>
                                    )}

                                </div>

                                <div className="col-12 col-md-6">
                                    <input type="text" name='Roll_No' value={studentData.Roll_No} onChange={handleChange} className="registerInput form-control" placeholder="Roll No" required />
                                    {errorMessage.Roll_No && (
                                        <small style={{ color: 'red' }}>
                                            {Array.isArray(errorMessage.Roll_No) ? errorMessage.Roll_No[0] : errorMessage.Roll_No}
                                        </small>
                                    )}
                                </div>

                            </div>
                            <div className="mb-3 mt-3">
                                <input type="email" name='Student_Email' value={studentData.Student_Email} onChange={handleChange} className="registerInput form-control" placeholder="College Provided Email" required />
                                {errorMessage.Student_Email && (
                                    <small style={{ color: 'red' }}>
                                        {Array.isArray(errorMessage.Student_Email) ? errorMessage.Student_Email[0] : errorMessage.Student_Email}
                                    </small>
                                )}
                            </div>

                            <div className="row mb-3 g-2 mt-3">
                                <div className="col-12 col-md-6">
                                    <input type="password" name='Student_Password' value={studentData.Student_Password} onChange={handleChange} className="registerInput form-control" placeholder="Enter password" required />
                                    {errorMessage.Student_Password && (
                                        <small style={{ color: 'red' }}>
                                            {Array.isArray(errorMessage.Student_Password) ? errorMessage.Student_Password[0] : errorMessage.Student_Password}
                                        </small>
                                    )}
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="password" name='Re_enter_Password' value={studentData.Re_enter_Password} onChange={handleChange} className="registerInput form-control" placeholder="Re-enter Password" required />
                                    {errorMessage.Re_enter_Password && (
                                        <small style={{ color: 'red' }}>
                                            {Array.isArray(errorMessage.Re_enter_Password) ? errorMessage.Re_enter_Password[0] : errorMessage.Re_enter_Password}
                                        </small>
                                    )}
                                </div>

                            </div>
                            {errorMessage.general && (
                                <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                                    {errorMessage.general}
                                </div>
                            )}
                            <div className=" d-flex justify-content-center">
                                <button type="submit" onClick={submitForm} className="btn btn-dark" style={{ width: "200px" }}>Submit</button>
                            </div>
                            <OTPverification
                                show={showOTP}
                                onClose={() => setShowOTP(false)}
                                studentId={studentId}
                            />
                            <div className="d-flex mt-3 justify-content-center align-items-center gap-2">
                                <p className="mb-0">Already have an Account?</p>
                                <p className="mb-0"><Link to="/login" className="text-warning">Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Registration;

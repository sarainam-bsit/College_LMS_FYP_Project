import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BaseUrl = 'http://127.0.0.1:8000/Account/verify_OTP_api/';

const OTPverification = ({ show, onClose, email, setIsLoggedIn, setUserRole }) => {
    const [OTPData, setOTPData] = useState({ OTP_Digits: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (show) {
            document.title = "OTP Verification";
        }
    }, [show]);

    const handleChange = (event) => {
        setOTPData({ ...OTPData, [event.target.name]: event.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!OTPData.OTP_Digits) {
            setErrorMessage("Please enter OTP.");
            return;
        }

        try {
            const response = await axios.post(BaseUrl, {
                OTP_Digits: OTPData.OTP_Digits,
                Email: email,


            });

            // setSuccessMessage(response.data.message);
            toast.success(response.data.message)
            setErrorMessage('');
            setOTPData({ OTP_Digits: '' });
            const role = response.data.role || ''; // pehle define karo
            if (role) {
                localStorage.setItem('role', role);
            }

            // Redirect after short delay
            setTimeout(() => {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userRole", role);  // Save here!
                setIsLoggedIn(true);
                setUserRole(role);
                if (role === 'student' && response.data.student_id) {
    localStorage.setItem('studentId', response.data.student_id);
} else if (role === 'teacher' && response.data.teacher_id) {
    localStorage.setItem('teacherId', response.data.teacher_id);
}

                if (role === 'student') {
                    
                    navigate('/home');
                } else if (role === 'teacher') {
                  
                    navigate('/TeacherDashboard');

                } else {
                    navigate('/login');
                }
            }, 1000);
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.error);
        }
    };

    const resendOTP = async () => {
        try {
            const response = await axios.post(BaseUrl, {
                resend: "true",
                Email: email

            });

            // setSuccessMessage(response.data.message);
            toast.success(response.data.message)
            setErrorMessage('');
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.error);
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header " style={{ backgroundColor: "rgb(70, 4, 67)" }}>
                        <h5 className="modal-title text-white">OTP Verification</h5>
                    </div>
                    <div className="modal-body" style={{ backgroundColor: "rgba(244, 219, 242, 1)" }}>
                        {successMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</p>}
                        {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}

                        <div className="mt-3">
                            <label htmlFor="6DigitOTP" className="form-label" style={{ color: "rgb(4, 4, 63)" }}>Enter 6 digit OTP</label>
                            <input
                                type="number"
                                name="OTP_Digits"
                                value={OTPData.OTP_Digits}
                                onChange={handleChange}
                                className="form-control"
                                id="6DigitOTP"
                                placeholder="Enter OTP"
                                required
                            />
                        </div>
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: "rgba(244, 219, 242, 1)" }}>
                        <button className="btn text-white" style={{ backgroundColor: "rgb(70, 4, 67)" }} onClick={submitForm}>Verify OTP</button>
                        <button className="btn text-white" style={{ backgroundColor: "rgb(70, 4, 67)" }} onClick={resendOTP}>Resend OTP</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPverification;

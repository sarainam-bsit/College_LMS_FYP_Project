import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BaseUrl = 'http://127.0.0.1:8000/Account/verify_OTP_api/'; // Tumhara backend reset OTP verify endpoint

const ForgetPasswordOTP = ({ show, onClose, email }) => {
    const [OTPData, setOTPData] = useState({ OTP_Digits: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (show) {
            document.title = "Forget Password OTP Verification";
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
            }, { withCredentials: true });

            setSuccessMessage(response.data.message || 'OTP verified successfully.');
            setErrorMessage('');
            setOTPData({ OTP_Digits: '' });

            // OTP verify hone ke baad reset password page pe le jao
            setTimeout(() => {
                onClose(); // Modal band karo
                navigate('/reset_password', { state: { otpVerified: true, email: email } }); // Reset password page pe bhejo email ke sath
            }, 1500);
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.error || 'Invalid or expired OTP.');
        }
    };

    const resendOTP = async () => {
        try {
            const response = await axios.post(BaseUrl, {
                resend: "true",
                Email: email,
            }, { withCredentials: true });

            setSuccessMessage(response.data.message || "New OTP sent.");
            setErrorMessage('');
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.error || 'Something went wrong.');
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered" style={{ marginTop: "10px" }}>
                <div className="modal-content" style={{ borderRadius: "15px", overflow: "hidden" }}>
                    <div className="modal-header bg-dark">
                        <h5 className="modal-title text-white">OTP Verification for Forget Password</h5>
                    </div>
                    <div className="modal-body">
                        {successMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</p>}
                        {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}

                        <div className="mt-3">
                            <label htmlFor="6DigitOTP" className="form-label">Enter 6 digit OTP</label>
                            <input
                                type="text"
                                name="OTP_Digits"
                                value={OTPData.OTP_Digits}
                                onChange={handleChange}
                                className="form-control"
                                id="6DigitOTP"
                                placeholder="Enter OTP"
                                required
                                maxLength={6}
                                pattern="\d{6}"
                                title="Please enter a 6 digit OTP"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-dark" onClick={submitForm}>Submit</button>
                        <button className="btn btn-primary" onClick={resendOTP}>Resend OTP</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordOTP;

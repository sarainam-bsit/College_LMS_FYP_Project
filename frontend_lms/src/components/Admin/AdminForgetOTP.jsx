import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BaseUrl = 'http://127.0.0.1:8000/adminaccount/verify-otp/'; // Tumhara backend reset OTP verify endpoint

const AdminForgetOTP = ({ show, onClose, email }) => {
    const [OTPData, setOTPData] = useState({ otp: '' });
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

        if (!OTPData.otp) {
            setErrorMessage("Please enter OTP.");
            return;
        }

        try {
            const response = await axios.post(
                BaseUrl,
                {
                    otp: OTPData.otp,   // ✅ lowercase
                    email: email,       // ✅ lowercase
                },
                { withCredentials: true }
            );

            setSuccessMessage(response.data.message || 'OTP verified successfully.');
            setErrorMessage('');
            setOTPData({ otp: '' });

            // OTP verify hone ke baad reset password page pe le jao
            setTimeout(() => {
                onClose(); // Modal band karo
                navigate('/admin_reset_password', {
                    state: { otpVerified: true, email: email },
                });
            }, 1500);
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.error || 'Invalid or expired OTP.');
        }
    };

    const resendOTP = async () => {
        try {
            const response = await axios.post(
                BaseUrl,
                {
                    resend: "true",
                    email: email,   // ✅ lowercase
                },
                { withCredentials: true }
            );

            setSuccessMessage(response.data.message || "New OTP sent.");
            setErrorMessage('');
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.error || 'Something went wrong.');
        }
    };

    if (!show) return null;

    return (
        <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">OTP Verification for Forget Password</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {successMessage && (
                            <p style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</p>
                        )}
                        {errorMessage && (
                            <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>
                        )}

                        <div className="mt-3">
                            <label htmlFor="6DigitOTP" className="form-label">
                                Enter 6 digit OTP
                            </label>
                            <input
                                type="text"
                                name="otp"
                                value={OTPData.otp}
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
                        <button className="btn btn-dark" onClick={submitForm}>
                            Submit
                        </button>
                        <button className="btn btn-primary" onClick={resendOTP}>
                            Resend OTP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminForgetOTP;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VERIFY_URL = 'http://127.0.0.1:8000/adminaccount/verify-otp/';
const RESEND_URL = 'http://127.0.0.1:8000/adminaccount/resend-otp/'; // Backend resend OTP endpoint

const AdminForgetOTP = ({ show, onClose, email }) => {
    const [OTPData, setOTPData] = useState({ otp: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSending, setIsSending] = useState(false); // resend button loading
    const navigate = useNavigate();

    useEffect(() => {
        if (show) document.title = "Forget Password OTP Verification";
    }, [show]);

    const handleChange = (e) => {
        setOTPData({ ...OTPData, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (!OTPData.otp) {
            setErrorMessage("Please enter OTP.");
            return;
        }

        try {
            const response = await axios.post(
                VERIFY_URL,
                { otp: OTPData.otp, email: email },
                { withCredentials: true }
            );

            setSuccessMessage(response.data.message || 'OTP verified successfully.');
            setErrorMessage('');
            setOTPData({ otp: '' });

            setTimeout(() => {
                onClose();
                navigate('/admin_reset_password', { state: { otpVerified: true, email: email } });
            }, 1500);
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.error || 'Invalid or expired OTP.');
        }
    };

    const resendOTP = async () => {
        setIsSending(true);
        try {
            const response = await axios.post(
                RESEND_URL,
                { email: email },
                { withCredentials: true }
            );

            setSuccessMessage(response.data.message || "New OTP sent.");
            setErrorMessage('');
        } catch (error) {
            setSuccessMessage('');
            // Agar OTP abhi valid hai to backend se ye message milega
            setErrorMessage(
                error.response?.data?.error ||
                error.response?.data?.message ||
                'Something went wrong.'
            );
        } finally {
            setIsSending(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered" style={{ marginTop: "10px" }}>
                <div className="modal-content" style={{ borderRadius: "15px", overflow: "hidden" }}>
                    <div className="modal-header bg-dark">
                        <h5 className="modal-title text-white">Admin OTP Verification</h5>
                    </div>
                    <div className="modal-body">
                        {successMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</p>}
                        {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}

                        <div className="mt-3">
                            <label htmlFor="6DigitOTP" className="form-label">Enter 6 digit OTP</label>
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
                        <button className="btn btn-dark" onClick={submitForm}>Submit</button>
                        <button className="btn btn-primary" onClick={resendOTP} disabled={isSending}>
                            {isSending ? "Sending..." : "Resend OTP"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminForgetOTP;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VERIFY_URL = 'http://127.0.0.1:8000/adminaccount/verify-otp/';
const RESEND_URL = 'http://127.0.0.1:8000/adminaccount/resend-otp/';

const AdminForgetOTP = ({ show, onClose, email }) => {
    const [OTPData, setOTPData] = useState({ otp: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSending, setIsSending] = useState(false); 
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
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
            <div className="modal-dialog modal-dialog-centered" style={{ marginTop: "30px" }}>
                <div className="modal-content" style={{ borderRadius: "15px", overflow: "hidden" }}>
                    <div className="modal-header text-white" style={{ backgroundColor: "rgb(70, 4, 67)" }}>
                        <h5 className="modal-title">Admin OTP Verification</h5>
                    </div>
                    <div className="modal-body" style={{ backgroundColor: "rgba(239, 227, 238, 1)" }}>
                        {successMessage && <div style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>{successMessage}</div>}
                        {errorMessage && <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>{errorMessage}</div>}

                        <label htmlFor="6DigitOTP" className="form-label" style={{ color: "rgb(4, 4, 63)", fontWeight: 'bold' }}>Enter 6-digit OTP</label>
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
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '6px',
                                padding: '8px',
                                marginTop: '5px',
                                border: '1px solid #ccc',
                                fontSize: '16px',
                                color: '#000'
                            }}
                        />
                    </div>
                    <div className="modal-footer" style={{ backgroundColor: "rgba(239, 227, 238, 1)" }}>
                        <button 
                            className="btn text-white" 
                            style={{ backgroundColor: "rgb(70, 4, 67)" }} 
                            onClick={submitForm}
                        >
                            Verify OTP
                        </button>
                        <button 
                            className="btn text-white" 
                            style={{ backgroundColor: "rgb(4, 4, 63)" }} 
                            onClick={resendOTP} 
                            disabled={isSending}
                        >
                            {isSending ? "Sending..." : "Resend OTP"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminForgetOTP;

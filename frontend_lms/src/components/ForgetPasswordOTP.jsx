import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BaseUrl = 'http://127.0.0.1:8000/Account/verify_OTP_api/';

const ForgetPasswordOTP = ({ show, onClose, email }) => {
    const [OTPData, setOTPData] = useState({ OTP_Digits: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (show) document.title = "Forget Password OTP Verification";
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

            setTimeout(() => {
                onClose();
                navigate('/reset_password', { state: { otpVerified: true, email: email } });
            }, 1500);
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.error || 'Invalid or expired OTP.');
        }
    };

    const resendOTP = async () => {
        setIsSending(true);
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
                        <h5 className="modal-title">OTP Verification</h5>
                    </div>
                    <div className="modal-body" style={{ backgroundColor: "rgba(239, 227, 238, 1)" }}>
                        {successMessage && <div style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>{successMessage}</div>}
                        {errorMessage && <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>{errorMessage}</div>}

                        <label htmlFor="6DigitOTP" style={{ color: "rgb(4, 4, 63)", fontWeight: 'bold' }}>Enter 6-digit OTP</label>
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

export default ForgetPasswordOTP;

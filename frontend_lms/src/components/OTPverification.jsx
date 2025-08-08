import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BaseUrl = 'http://127.0.0.1:8000/Account/verify_OTP_api/';

const OTPverification = ({ show, onClose, email }) => {
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
                Email: email
                
            });

            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setOTPData({ OTP_Digits: '' });

            // Redirect after short delay
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.error );
        }
    };

    const resendOTP = async () => {
        try {
            const response = await axios.post(BaseUrl, {
                resend: "true",
                Email: email
              
            });

            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.response?.data?.error );
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">OTP Verification</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {successMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</p>}
                        {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}

                        <div className="mt-3">
                            <label htmlFor="6DigitOTP" className="form-label">Enter 6 digit OTP</label>
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
                    <div className="modal-footer">
                        <button className="btn btn-dark" onClick={submitForm}>Submit</button>
                        <button className="btn btn-primary" onClick={resendOTP}>Resend OTP</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPverification;

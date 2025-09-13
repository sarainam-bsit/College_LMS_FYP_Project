import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminForgetOTP from './AdminForgetOTP';

const AdminForgetPassword = () => {
    const [emailData, setEmailData] = useState({
        email: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showOTP, setShowOTP] = useState(false);

    useEffect(() => {
        document.title = 'Forget_Password';
    }, []);

    const handleChange = (event) => {
        setEmailData({
            ...emailData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/adminaccount/admin_forget_password/',
                { email: emailData.email },   
                { withCredentials: true }
            );

            setMessage(response.data.message);
            setError('');
            setTimeout(() => {
                setShowOTP(true);
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.errors?.email?.[0] || "Something went wrong");
            setMessage('');
        }
    };

    return (
        <>
            <style>{`
            .forget-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* full viewport height */
        background-color: rgba(244, 219, 242, 0.1); /* optional subtle background */
    }
        
                .forget-container {
                    max-width: 400px;
                    margin: 60px auto;
                    padding: 25px 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    background-color: rgba(239, 227, 238, 1);
                    font-family: 'Segoe UI', sans-serif;
                }
                .forget-heading {
                    text-align: center;
                    margin-bottom: 20px;
                    color: rgb(4, 4, 63);
                    font-size: 2rem;
                    font-weight: bold;
                }
                .forget-input {
                    width: 100%;
                    padding: 12px 15px;
                    margin: 8px 0 5px 0;
                    border-radius: 6px;
                    border: 1.5px solid #ccc;
                    font-size: 16px;
                    outline: none;
                    transition: border-color 0.3s;
                }
                .forget-input:focus {
                    border-color: rgb(4, 4, 63);
                }
                .forget-button {
                    background-color:rgb(4, 4, 63);
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    margin-top: 20px;
                    font-size: 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: 0.3s ease;
                    width: 100%;
                    font-weight: bold;
                }
                .forget-button:hover {
                    background-color: rgb(4, 4, 63);
                    transform: scale(1.03);
                }
                .message {
                    color: green;
                    text-align: center;
                    margin-bottom: 10px;
                    font-size: 0.95rem;
                }
                .error {
                    color: red;
                    margin-left: 9px;
                    margin-bottom: 10px;
                    font-size: 0.95rem;
                }
            `}</style>
<div className="forget-wrapper">
            <div className="forget-container">
                <h2 className="forget-heading">Forget Password</h2>
                {message && <div className="message">{message}</div>}

                <form onSubmit={handleSubmit} >
                    <label style={{ fontWeight: '500', marginBottom: '5px', display: 'block', color: 'rgb(4, 4, 63)' }}>Email:</label>
                    <input
                        type="email"
                        name='email'   
                        value={emailData.email}
                        onChange={handleChange}
                        placeholder="Enter your registered email"
                        className="forget-input"
                    />
                    {error && <div className="error">{error}</div>}
                    <button type="submit" className="forget-button">
                        Send Reset Link
                    </button>

                    <AdminForgetOTP
                        show={showOTP}
                        onClose={() => setShowOTP(false)}
                        email={emailData.email}  
                    />
                </form>
            </div>
            </div>
        </>
    );
};

export default AdminForgetPassword;

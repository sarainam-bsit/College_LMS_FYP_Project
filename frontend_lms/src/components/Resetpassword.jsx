import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://127.0.0.1:8000/Account/reset_password/';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    Email: '',
    New_Password: '',
    Confirm_Password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
  if (!location.state?.otpVerified) {
    navigate('/forget-password');
  } else {
    // Set email in form from location.state.email
    setFormData(prev => ({ ...prev, Email: location.state.email || '' }));
  }
}, [location.state, navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');
    setFieldErrors({});

    try {
      const response = await axios.post(BASE_URL, formData,  { withCredentials: true });
      setMessage(response.data.message);
      setFormData({ Email: '', New_Password: '', Confirm_Password: '' });
    } catch (err) {
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.error);
      }
      setError(err.response?.data?.error);
    }
  };

  return (
    <>
      <style>{`
        .reset-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .reset-heading {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
        }
        .reset-input {
          width: 100%;
          padding: 12px 15px;
          margin: 10px 0 5px 0;
          border-radius: 6px;
          border: 1.5px solid #ccc;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s;
        }
        .reset-input:focus {
          border-color: #3498db;
        }
        .reset-button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 12px 20px;
          font-size: 16px;
          border-radius: 6px;
          margin-top: 20px;
          cursor: pointer;
          transition: 0.3s ease;
          width: 100%;
          font-weight: bold;
        }
        .reset-button:hover {
          background-color: #2980b9;
          transform: scale(1.03);
        }
        .reset-message {
          color: green;
          margin-bottom: 15px;
          text-align: center;
        }
        .reset-error {
          color: red;
          margin-bottom: 15px;
          text-align: center;
        }
      `}</style>

      <div className="reset-container">
        <h2 className="reset-heading">Reset Password</h2>
        {message && <div className="reset-message">{message}</div>}
        {error && <div className="reset-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
  type="email"
  name="Email"
  placeholder="Your registered email"
  value={formData.Email}
  onChange={handleChange}
  className="reset-input"
  readOnly // <- disable editing
/>
          {fieldErrors.Email && (
            <div style={{
              color: "red",
              fontSize: "0.85rem",
              marginTop: "0px",
              fontWeight: "500",
              marginLeft: '9px',
            }}>
              {fieldErrors.Email}
            </div>
          )}

          <input
            type="password"
            name="New_Password"
            placeholder="New Password"
            value={formData.New_Password}
            onChange={handleChange}
            className="reset-input"
          />
          {fieldErrors.New_Password && (
            <div style={{
              color: "red",
              fontSize: "0.85rem",
              marginTop: "0px",
              fontWeight: "500",
              marginLeft: '9px',
            }}>
              {fieldErrors.New_Password}
            </div>
          )}

          <input
            type="password"
            name="Confirm_Password"
            placeholder="Confirm New Password"
            value={formData.Confirm_Password}
            onChange={handleChange}
            className="reset-input"
          />
          {fieldErrors.Confirm_Password && (
            <div style={{
              color: "red",
              fontSize: "0.85rem",
              marginTop: "0px",
              fontWeight: "500",
              marginLeft: '9px',
            }}>
              {fieldErrors.Confirm_Password}
            </div>
          )}

          <button type="submit" className="reset-button">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;

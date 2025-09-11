import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = 'http://127.0.0.1:8000/adminaccount/admin_reset_password/';

const AdminResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    new_password: '',
    confirm_password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.otpVerified) {
      navigate('/admin_forget_password');
    } else {
      // OTP verify hone ke baad email set karo
      setFormData(prev => ({ ...prev, email: location.state.email || '' }));
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
  const response = await axios.post(BASE_URL, formData, { withCredentials: true });
  toast.success(response.data.message || "Password reset successful");
  navigate('/adminlogin');
} catch (err) {
  if (err.response?.status === 400 && err.response.data.errors?.password) {
    toast.error(err.response.data.errors.password[0]); // Ye show karega "No existing password" message
    navigate('/adminlogin');
  } else if (err.response?.data?.errors) {
    setFieldErrors(err.response.data.errors);
  } else {
    setError(err.response?.data?.error || "Something went wrong.");
  }
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
          background-color: rgba(239, 227, 238, 1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .reset-heading {
          text-align: center;
          margin-bottom: 25px;
          color: rgb(4, 4, 63);
          font-size: 2rem;
          font-weight: bold;
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
          border-color: rgb(4, 4, 63);
        }
        .reset-button {
          background-color: rgb(4, 4, 63);
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
          background-color: rgb(4, 4, 63);
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
            name="email"
            placeholder="Your registered email"
            value={formData.email}
            onChange={handleChange}
            className="reset-input"
            readOnly // email OTP ke baad set hoga
          />
          {fieldErrors.email && (
            <div style={{
              color: "red",
              fontSize: "0.85rem",
              marginTop: "0px",
              fontWeight: "500",
              marginLeft: '9px',
            }}>
              {fieldErrors.email}
            </div>
          )}

          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={formData.new_password}
            onChange={handleChange}
            className="reset-input"
          />
          {fieldErrors.new_password && (
            <div style={{
              color: "red",
              fontSize: "0.85rem",
              marginTop: "0px",
              fontWeight: "500",
              marginLeft: '9px',
            }}>
              {fieldErrors.new_password}
            </div>
          )}

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm New Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="reset-input"
          />
          {fieldErrors.confirm_password && (
            <div style={{
              color: "red",
              fontSize: "0.85rem",
              marginTop: "0px",
              fontWeight: "500",
              marginLeft: '9px',
            }}>
              {fieldErrors.confirm_password}
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

export default AdminResetPassword;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_VERIFY_OTP = "http://127.0.0.1:8000/adminaccount/verify-otp/";
const API_RESEND_OTP = "http://127.0.0.1:8000/adminaccount/resend-otp/";

const AdminOTPVerification = ({ show, onClose, email }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (!show) return null;

  const handleVerify = async () => {
    try {
      await axios.post(API_VERIFY_OTP, { email, otp });
      setMessage("OTP verified successfully!");
      setTimeout(() => {
        onClose();
        navigate("/adminhome");
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post(API_RESEND_OTP, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Resend OTP failed");
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ borderRadius: "15px", overflow: "hidden" }}>
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Admin OTP Verification</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {message && <div className="alert alert-info">{message}</div>}
            <label className="form-label">Enter 6-digit OTP</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={handleVerify}>
              Verify OTP
            </button>
            <button className="btn btn-primary" onClick={handleResend}>
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOTPVerification;

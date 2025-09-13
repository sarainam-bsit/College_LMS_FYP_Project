import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_VERIFY_OTP = "http://127.0.0.1:8000/adminaccount/verify-otp/";
const API_RESEND_OTP = "http://127.0.0.1:8000/adminaccount/resend-otp/";

const AdminOTPVerification = ({ show, onClose, email, setIsLoggedIn, setUserRole }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (!show) return null;

  const handleVerify = async () => {
    try {
      const response = await axios.post(API_VERIFY_OTP, { email, otp });
  
    
   localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin");

      
      setIsLoggedIn(true);
      setUserRole("admin");

      onClose();
      toast.success(response.data.message);
      navigate("/adminhome");
    
    
  
 

    } catch (err) {
      setMessage(err.response?.data?.error || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post(API_RESEND_OTP, { email });
     
      toast.success(res.data.message)
    } catch (err) {
      setMessage(err.response?.data?.error || "Resend OTP failed");
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-dialog-centered" style={{ marginTop: "30px" }}>
        <div className="modal-content" style={{ borderRadius: "15px", overflow: "hidden" }}>
          <div className="modal-header  text-white" style={{ backgroundColor: "rgb(70, 4, 67)" }}>
            <h5 className="modal-title">Admin OTP Verification</h5>
          </div>
          <div className="modal-body" style={{ backgroundColor: "rgba(244, 219, 242, 1)" }} >
            {message && <div className="alert alert-info">{message}</div>}
            <label className="form-label" style={{ color: "rgb(4, 4, 63)" }}>Enter 6-digit OTP</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="modal-footer" style={{ backgroundColor: "rgba(244, 219, 242, 1)" }}>
            <button className="btn text-white" style={{ backgroundColor: "rgb(70, 4, 67)" }} onClick={handleVerify}>
              Verify OTP
            </button>
            <button className="btn text-white" style={{ backgroundColor: "rgb(4, 4, 63)" }} onClick={handleResend}>
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOTPVerification;

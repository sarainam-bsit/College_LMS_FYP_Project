import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminOTPVerification from "./AdminOTPVerification";
import AdminHome from "./AdminHome";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_LOGIN = "http://127.0.0.1:8000/adminaccount/login/";

export default function AdminLogin({ setIsLoggedIn, setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({}); // field-wise errors

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFieldErrors({}); // reset

    try {
      const res = await axios.post(API_LOGIN, { email, password });

      if (res.data.message?.includes("OTP")) {
        setShowOtp(true);
        toast.info(res.data.message);
      } else {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");

        setIsLoggedIn(true);
        setUserRole("admin");

        toast.success(res.data.message);
        navigate("/adminhome");
      }
    } catch (err) {
      // Backend errors are inside 'errors' key
      const backendErrors = err.response?.data?.errors || {};
      setFieldErrors(backendErrors);
    }
  };

  return (
    <>
      <style>{`
        .background-wrapper { position: relative; height: 100vh; overflow: hidden; }
        .login-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; }
        .login-card { backdrop-filter: blur(15px); background: rgba(255,255,255,0.15); border-radius: 20px; padding: 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.4); width: 90%; max-width: 400px; color: #fff; }
        .login-card h3 { color: #fff; text-align: center; margin-bottom: 20px; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 12px; }
        .LoginInput { background: rgba(255,255,255,0.2); border: none; color: white; }
        .LoginInput::placeholder { color: #ddd; }
        .LoginBtn { width: 100%; margin-top: 15px; background: #d2691e; border: none; }
        .LoginBtn:hover { background: #8b4513; }
        .LoginLabel { font-weight: bold; color: #f5f5f5; }
        .field-error { color: #d20d0dc7; font-size: 1rem; margin-top: 4px; }
      `}</style>

      <div className="background-wrapper">
        <AdminHome />
        <div className="login-overlay">
          <div className="login-card">
            <form onSubmit={handleLogin}>
              <h3>Admin Login</h3>

              <div className="mb-3">
                <label className="LoginLabel">Email</label>
                <input
                  type="email"
                  className="LoginInput form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {fieldErrors.email &&
                  fieldErrors.email.map((err, i) => (
                    <div key={i} className="field-error">{err}</div>
                  ))}
              </div>

              <div className="mb-3">
                <label className="LoginLabel">Password</label>
                <input
                  type="password"
                  className="LoginInput form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {fieldErrors.password &&
                  fieldErrors.password.map((err, i) => (
                    <div key={i} className="field-error">{err}</div>
                  ))}
              </div>

              <button type="submit" className="LoginBtn btn btn-warning">
                Login
              </button>
              <div className="mt-3">
                                <p>
                                    <Link className="text-decoration-none text-warning" to="/adminreset">
                                        Forget Password?
                                    </Link>
                                </p>
                            </div>

            </form>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <AdminOTPVerification
        show={showOtp}
        onClose={() => setShowOtp(false)}
        email={email}
        setIsLoggedIn={setIsLoggedIn}
        setUserRole={setUserRole}
      />
    </>
  );
}

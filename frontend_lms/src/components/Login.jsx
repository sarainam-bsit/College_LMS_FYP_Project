import React from 'react'
import { Link } from 'react-router-dom';
import Home from './Home';

const Login = () => {
    return (
        <>
            <style>{`
                .background-wrapper {
                    position: relative;
                    height: 100vh;
                    overflow: hidden;
                }

                .background-wrapper > * {
                    pointer-events: none;
                }

                .login-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.59);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    pointer-events: all; 
                }

                .login-card {
                    backdrop-filter: blur(15px);
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 20px;
                    padding: 30px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                    width: 90%;
                    max-width: 400px;
                    color: #fff;
                }

                .login-card h2 {
                    color: #fff;
                    text-align: center;
                    margin-bottom: 20px;
                    background: rgba(0,0,0,0.5);
                    padding: 10px;
                    border-radius: 12px;
                }

                .login-card input {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                }
                .login-card select {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                }
                .login-card select option {
                    background-color: #2c2c2c;
                    color: #f5f5f5;            
                }

                .login-card input::placeholder {
                    color: #ddd;
                }

                .login-card .btn {
                    width: 50%;
                    margin-top: 15px;
                    margin-left: 25%;
                    background: #d2691e;
                    border: none;
                }

                .login-card .btn:hover {
                    background: #8b4513;
                }

                label {
                    font-weight: bold;
                    color: #f5f5f5;
                }
                .login-card input:focus,
                .login-card select:focus {
                    background: rgba(255, 255, 255, 0.3);
                    border: 1px solid #ff9800;
                    box-shadow: 0 0 8px #ff9800;
                    color: white;
                }
            `}</style>

            <div className="background-wrapper">
                <Home />
                <div className="login-overlay">
                    <div className="login-card">
                        <form>
                            <h2>Login</h2>
                            <div className="mt-3">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="College Email" required />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" required />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="autoSizingSelect">Role</label>
                                <select className="form-select" id="autoSizingSelect" required>
                                    <option value="1">Student</option>
                                    <option value="2">Teacher</option>
                                </select>
                            </div>
                            <div className="mt-3">
                                <p> <Link className='text-decoration-none text-warning' to="/reset"> Forget Password? </Link> </p>
                            </div>
                            <button type="submit" className="btn btn-warning">Submit</button>
                            <div className="d-flex mt-3 justify-content-center align-items-center gap-2">
                                <p className="mb-0">If you have no Account?</p>
                                <p className="mb-0"><Link to="/registration" className="text-warning">Register</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;

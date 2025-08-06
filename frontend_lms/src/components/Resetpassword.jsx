import React from 'react'

const Resetpassword = () => {
    return (
        <>
            <style>{`
            .form{
            box-shadow: 2px 6px 100px #ffffff;
            }
        `}</style>

            <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-dark">

                <div className="card bg-light w-100 mx-3" style={{ maxWidth: '400px' }}>
                    <div className="card-body">
                        <form className='form'>
                            <div className="text-center mt-2">
                                <h3 className="bg-dark text-white py-2 px-3 mx-auto rounded shadow" style={{ maxWidth: '300px' }}>Reset Password</h3>
                            </div>

                            <div className="mt-2">
                                <label htmlFor="exampleInputPassword1" className="form-label">Old Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" required />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" required />
                            </div>


                            <button type="submit" className="btn btn-primary mt-3">Reset</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Resetpassword
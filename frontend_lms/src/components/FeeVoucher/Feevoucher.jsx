import React from 'react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';

const Feevoucher = () => {
  return (
    <>
    <Navbar />
            <div className="container p-1" style={{ marginTop: "80px", minHeight: "90vh" }}>
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6">
                        <h2 className="heading text-center mt-4 bg-dark text-white py-1 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Fee Voucher</h2>
                    </div>
                </div>
                <div className="table-responsive">
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Sr#</th>
                            <th scope="col">Challan #</th>
                            <th scope="col">Challan Type</th>
                            <th scope="col">Ammount to Pay</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Fine Amount</th>
                            <th scope="col">Fine Date</th>
                            <th scope="col">Amount Paid</th>
                            <th scope="col">Payment Date</th>
                            <th scope="col">Bank Branch</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                             <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <Link to="/challanform"className='text-danger'><td ><i className="fa-solid fa-file-invoice fs-4 p-2"></i></td></Link>
                            
                        </tr>
                    </tbody>
                </table>
                </div>
                
               
            </div>
            </>
  )
}

export default Feevoucher
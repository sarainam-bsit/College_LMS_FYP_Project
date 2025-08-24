import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const API_URL = "http://localhost:8000/fee/fee-voucher/";

function Feevoucher() {
  const [vouchers, setVouchers] = useState([]);
  // const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    // LocalStorage se studentId lena
    const storedId = localStorage.getItem("studentId");
    if (storedId) {
      // setStudentId(storedId);
      fetchVouchers(storedId);
    } else {
      alert("Student ID not found. Please login first.");
    }
  }, []);

  const fetchVouchers = async (id) => {
    try {
      const res = await axios.get(API_URL, {
        params: { student_id: id },
      });
      setVouchers(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching vouchers");
    }
  };

  return (
    <div className="container-fluid" style={{marginTop:'5%'}}>
      <h1 className="mb-4 fw-bold text-center">My Fee Vouchers</h1>

      <div className="card">
        <div className="card-header fw-bold text-center">All My Fee Vouchers</div>
        <div className="card-body">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Student Name</th>
                <th>Department</th>
                <th>Category</th>
                <th>Challan No</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Fine Date</th>
                <th>Amount Date</th>
                <th>Fine Amount</th>
                <th>Branch Name</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Challan Form</th>

              </tr>
            </thead>
            <tbody>
              {vouchers.length > 0 ? (
                vouchers.map((v) => (
                  <tr key={v.id}>
                    <td>{v.Student_Name}</td>
                    <td>{v.Department}</td>
                    <td>{v.Category}</td>
                    <td>{v.Challan_no}</td>
                    <td>{v.Challan_Type}</td>
                    <td>{v.Amount_to_Pay}</td>
                    <td>{v.Fine_Date || "-"}</td>
                    <td>{v.Amount_Date || "-"}</td>
                    <td>{v.Fine_Amount || "-"}</td>
                    <td>{v.Bank_Branch || "-"}</td>
                    <td>{v.Amount_Paid || "-"}</td>
                    <td
                      className={
                        v.Status === "Paid"
                          ? "text-success fw-bold"
                          : "text-danger fw-bold"
                      }
                    >
                      {v.Status}
                    </td>
                    <td className="text-center">
  <Link
    to={`/challan-form/${v.id}`} // navigate inside the app
    title="View Challan Form"
  >
    <button className="btn btn-primary btn-sm">
      View Challan
    </button>
  </Link>
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No vouchers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Feevoucher;

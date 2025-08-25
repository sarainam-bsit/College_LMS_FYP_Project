import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const API_URL = "http://localhost:8000/fee/fee-voucher/";
const STUDENT_API = "http://localhost:8000/Account/students/";
const DEPT_API = "http://localhost:8000/dept/dept_api/";
const CATEGORY_API = "http://localhost:8000/dept/course-categories/";

export default function AdminFeeVoucherPage() {
  const [vouchers, setVouchers] = useState([]);
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    departmentId: "",
    categoryId: "",
    challanType: "Admission-Processing",
    amount: "",
    fineDate: "",
    fineAmount: "",
    bankBranch: "",
  });

  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [amountPaid, setAmountPaid] = useState("");

  useEffect(() => {
    fetchVouchers();
    fetchStudents();
    fetchDepartments();
    fetchCategories();
  }, []);

  const fetchVouchers = async () => {
    const res = await axios.get(API_URL);
    setVouchers(res.data);
  };

  const fetchStudents = async () => {
    const res = await axios.get(STUDENT_API);
    setStudents(res.data);
  };

  const fetchDepartments = async () => {
    const res = await axios.get(DEPT_API);
    setDepartments(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(CATEGORY_API);
    setCategories(res.data);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- Single Voucher ---
  const generateSingle = async () => {
    if (!formData.studentId || !formData.amount) {
      return alert("Please select a student and enter the amount.");
    }
    try {
      await axios.post(`${API_URL}generate_single/`, {
        student_id: formData.studentId,
        challan_type: formData.challanType,
        amount: formData.amount,
        fine_date: formData.fineDate,
        fine_amount: formData.fineAmount,
        bank_branch: formData.bankBranch,
      });
      alert("Voucher generated successfully!");
      fetchVouchers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error generating voucher");
    }
  };

  // --- Bulk Voucher ---
  const generateBulk = async () => {
    if (!formData.departmentId || !formData.categoryId || !formData.amount) {
      return alert("Please select department, category, and enter amount.");
    }
    try {
      const res = await axios.post(`${API_URL}generate_bulk/`, {
        department_id: formData.departmentId,
        category_id: formData.categoryId,
        challan_type: formData.challanType,
        amount: formData.amount,
        fine_date: formData.fineDate,
        fine_amount: formData.fineAmount,
        bank_branch: formData.bankBranch,
      });
      alert(res.data.message || "Bulk vouchers generated successfully!");
      fetchVouchers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error generating bulk vouchers");
    }
  };

  // --- Supply Voucher ---
  const generateSupply = async () => {
    if (!formData.departmentId || !formData.categoryId || !formData.amount) {
      return alert("Please select department, category, and enter amount.");
    }
    try {
      const res = await axios.post(`${API_URL}generate_supply/`, {
        department_id: formData.departmentId,
        category_id: formData.categoryId,
        amount: formData.amount,
        fine_date: formData.fineDate,
        fine_amount: formData.fineAmount,
        bank_branch: formData.bankBranch,
      });
      alert(res.data.message || "Supply vouchers generated successfully!");
      fetchVouchers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error generating supply vouchers");
    }
  };

  // --- Modal & Payment ---
  const openModal = (voucher) => {
    setSelectedVoucher({
      ...voucher,
      Amount_Date: voucher.Amount_Date || new Date().toISOString().split("T")[0],
    });
    setAmountPaid("");
    const modal = new window.bootstrap.Modal(
      document.getElementById("markPaidModal")
    );
    modal.show();
  };

  const confirmMarkPaid = async () => {
    if (!amountPaid) return alert("Enter amount paid!");
    try {
      await axios.post(`${API_URL}${selectedVoucher.id}/mark_paid/`, {
        amount_paid: amountPaid,
        paid_date: selectedVoucher.Amount_Date,
      });
      alert("Voucher marked as paid!");
      fetchVouchers();

      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("markPaidModal")
      );
      modal.hide();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error marking voucher as paid");
    }
  };

  const deleteVoucher = async (voucherId) => {
    if (!window.confirm("Are you sure you want to delete this voucher?")) return;

    try {
      await axios.delete(`${API_URL}${voucherId}/`);
      alert("Voucher deleted successfully!");
      fetchVouchers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error deleting voucher");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 fw-bold">🎟️ Fee Voucher Management</h1>

      {/* Single Student Voucher */}
      <div className="card mb-4">
        <div className="card-header fw-bold">
          Generate Voucher for Single Student
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <select
                name="studentId"
                className="form-select"
                value={formData.studentId}
                onChange={handleChange}
              >
                <option value="">-- Select Student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.Student_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <input
                name="amount"
                type="number"
                placeholder="Amount"
                className="form-control"
                onChange={handleChange}
                value={formData.amount}
              />
            </div>
            <div className="col-md-6">
              <select
                name="challanType"
                className="form-select"
                onChange={handleChange}
                value={formData.challanType}
              >
                <option>Admission-Processing</option>
                <option>Admission-fee</option>
                <option>Intermediate</option>
                <option>Semester-wise</option>
                <option>Library-fee</option>
                <option>Hostel-fee</option>
                <option>Supply-fee</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                name="fineDate"
                type="date"
                className="form-control"
                onChange={handleChange}
                value={formData.fineDate}
              />
            </div>
            <div className="col-md-6">
              <input
                name="fineAmount"
                type="number"
                placeholder="Fine Amount"
                className="form-control"
                onChange={handleChange}
                value={formData.fineAmount}
              />
            </div>
            <div className="col-md-6">
              <input
                name="bankBranch"
                type="text"
                placeholder="Bank Branch"
                className="form-control"
                onChange={handleChange}
                value={formData.bankBranch}
              />
            </div>
          </div>
          <button onClick={generateSingle} className="btn btn-primary mt-3">
            Generate
          </button>
        </div>
      </div>

      {/* Bulk Voucher */}
      <div className="card mb-4">
        <div className="card-header fw-bold">
          Generate Vouchers for Department + Category
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <select
                name="departmentId"
                className="form-select"
                onChange={handleChange}
                value={formData.departmentId}
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.Department_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <select
                name="categoryId"
                className="form-select"
                onChange={handleChange}
                value={formData.categoryId}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.Related_Department_Name} - {c.Category_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <select
                name="challanType"
                className="form-select"
                onChange={handleChange}
                value={formData.challanType}
              >
                <option>Admission-Processing</option>
                <option>Admission-fee</option>
                <option>Intermediate</option>
                <option>Semester-wise</option>
                <option>Library-fee</option>
                <option>Hostel-fee</option>
                <option>Supply-fee</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                name="fineDate"
                type="date"
                className="form-control"
                onChange={handleChange}
                value={formData.fineDate}
              />
            </div>
            <div className="col-md-6">
              <input
                name="amount"
                type="number"
                placeholder="Amount"
                className="form-control"
                onChange={handleChange}
                value={formData.amount}
              />
            </div>
            <div className="col-md-6">
              <input
                name="fineAmount"
                type="number"
                placeholder="Fine Amount"
                className="form-control"
                onChange={handleChange}
                value={formData.fineAmount}
              />
            </div>
            <div className="col-md-6">
              <input
                name="bankBranch"
                type="text"
                placeholder="Bank Branch"
                className="form-control"
                onChange={handleChange}
                value={formData.bankBranch}
              />
            </div>
          </div>
          <button onClick={generateBulk} className="btn btn-success mt-3">
            Generate Bulk
          </button>
        </div>
      </div>

      {/* Supply Voucher */}
      <div className="card mb-4">
        <div className="card-header fw-bold">
          Generate Supply Vouchers (Department + Category)
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <select
                name="departmentId"
                className="form-select"
                onChange={handleChange}
                value={formData.departmentId}
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.Department_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <select
                name="categoryId"
                className="form-select"
                onChange={handleChange}
                value={formData.categoryId}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.Related_Department_Name} - {c.Category_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <input
                name="amount"
                type="number"
                placeholder="Amount"
                className="form-control"
                onChange={handleChange}
                value={formData.amount}
              />
            </div>
            <div className="col-md-6">
              <input
                name="fineDate"
                type="date"
                className="form-control"
                onChange={handleChange}
                value={formData.fineDate}
              />
            </div>
            <div className="col-md-6">
              <input
                name="fineAmount"
                type="number"
                placeholder="Fine Amount"
                className="form-control"
                onChange={handleChange}
                value={formData.fineAmount}
              />
            </div>
            <div className="col-md-6">
              <input
                name="bankBranch"
                type="text"
                placeholder="Bank Branch"
                className="form-control"
                onChange={handleChange}
                value={formData.bankBranch}
              />
            </div>
          </div>
          <button onClick={generateSupply} className="btn btn-danger mt-3">
            Generate Supply Vouchers
          </button>
        </div>
      </div>


      
     {/* Voucher Table */}
      <div className="card">
        <div className="card-header fw-bold">All Fee Vouchers</div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Challan No</th>
                <th>Student</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Fine Date</th>
                <th>Amount Date</th>
                <th>Fine Amount</th>
                <th>Branch Name</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((v) => (
                <tr key={v.id}>
                  <td>{v.Challan_no}</td>
                  <td>{v.Student_Name}</td>
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
                  <td>
                    {v.Status === "Unpaid" && (
                      <button
                        onClick={() => openModal(v)}
                        className="btn btn-sm btn-warning me-1"
                      >
                        Mark Paid
                      </button>
                    )}
                    <button
                      onClick={() => deleteVoucher(v.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="markPaidModal"
        tabIndex="-1"
        aria-labelledby="markPaidModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="markPaidModalLabel">
                Mark Voucher Paid
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label className="form-label">Payment Amount</label>
              <input
                type="number"
                className="form-control mb-2"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                placeholder="Enter amount"
              />
              <label className="form-label">Payment Date</label>
              <input
                type="date"
                className="form-control"
                value={selectedVoucher?.Amount_Date || ""}
                onChange={(e) =>
                  setSelectedVoucher({
                    ...selectedVoucher,
                    Amount_Date: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={confirmMarkPaid}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

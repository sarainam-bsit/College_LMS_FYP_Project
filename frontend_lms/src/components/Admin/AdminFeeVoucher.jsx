import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
    try {
      const res = await axios.get(API_URL);
      setVouchers(res.data);
    } catch {
      toast.error("Failed to load vouchers.");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(STUDENT_API);
      setStudents(res.data);
    } catch {
      toast.error("Failed to load students.");
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(DEPT_API);
      setDepartments(res.data);
    } catch {
      toast.error("Failed to load departments.");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch {
      toast.error("Failed to load categories.");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- Single Voucher ---
  const generateSingle = async () => {
    if (!formData.studentId || !formData.amount) {
      return toast.warn("Please select a student and enter the amount.");
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
      toast.success("Voucher generated successfully!");
      fetchVouchers();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error generating voucher");
    }
  };

  // --- Bulk Voucher ---
  const generateBulk = async () => {
    if (!formData.departmentId || !formData.categoryId || !formData.amount) {
      return toast.warn("Please select department, category, and enter amount.");
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
      toast.success(res.data.message || "Bulk vouchers generated successfully!");
      fetchVouchers();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error generating bulk vouchers");
    }
  };

  

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
    if (!amountPaid) return toast.warn("Enter amount paid!");
    try {
      await axios.post(`${API_URL}${selectedVoucher.id}/mark_paid/`, {
        amount_paid: amountPaid,
        paid_date: selectedVoucher.Amount_Date,
      });
      toast.success("Voucher marked as paid!");
      fetchVouchers();

      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("markPaidModal")
      );
      modal.hide();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error marking voucher as paid");
    }
  };

  const deleteVoucher = async (voucherId) => {
    if (!window.confirm("Are you sure you want to delete this voucher?")) return;

    try {
      await axios.delete(`${API_URL}${voucherId}/`);
      toast.success("Voucher deleted successfully!");
      fetchVouchers();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error deleting voucher");
    }
  };

  const buttonStyle = (bg) => ({
    padding: "8px 16px",
    borderRadius: "5px",
    backgroundColor: bg,
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s",
  });

  return (
    <div
      
      style={{
        marginTop: "6%",
        backgroundColor: "#ebeaf2ff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2
        className="text-center mb-3"
        style={{ color: "rgba(44, 44, 122, 1)", fontWeight: "bold" }}
      >
        Fee Vouchers
      </h2>
      

   
      <div
        style={{
          marginBottom: "30px",
          backgroundColor: "#f5ecf4ff",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid white",
        }}
      >
        <h3 style={{
          marginBottom: "20px",
          color: "rgb(70, 4, 67)",
          fontWeight: "bold",
        }}> Single Student Voucher</h3>
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
        <button
          onClick={generateSingle}
          style={{ ...buttonStyle("rgb(70,4,67)"), marginTop: "15px" }}
        >
          Generate
        </button>
      </div>

      {/* Bulk Voucher */}
      <div
        style={{
          marginBottom: "30px",
          backgroundColor: "#f5ecf4ff",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid white",
        }}
      >
        <h3 style={{
          marginBottom: "20px",
          color: "rgb(70, 4, 67)",
          fontWeight: "bold",
        }}>  Department and Category Vouchers </h3>
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
                  {d.Department_Name}-({d.Discription})
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
                  ({c.Related_Department_Name}, {c.Related_Department_Discription}) - {c.Category_Name}
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
        <button
          onClick={generateBulk}
          style={{ ...buttonStyle("rgb(4,4,63)"), marginTop: "15px" }}
        >
          Generate Bulk
        </button>
      </div>

    
      <div
        style={{
          marginBottom: "30px",
          backgroundColor: "#f5ecf4ff",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid white",
        }}
      >
        <h5>All Fee Vouchers</h5>
        <table
          style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}
        >
          <thead>
            <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Challan No
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Student</th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Type</th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Amount</th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Fine Date
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Amount Date
              </th>
              <th style={{ padding: "10px", border: "1px solid white" , fontSize: '20px'}}>
                Fine Amount
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Branch Name
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Paid</th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Status</th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.length === 0 ? (
              <tr>
                <td colSpan={11} style={{ padding: "10px", border: "1px solid white" }}>
                  No vouchers found
                </td>
              </tr>
            ) : (
              vouchers.map((v) => (
                <tr key={v.id}>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Challan_no}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Student_Name}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Challan_Type}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Amount_to_Pay}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Fine_Date || "-"}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Amount_Date || "-"}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Fine_Amount || "-"}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Bank_Branch || "-"}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Amount_Paid || "-"}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid white",
                      fontWeight: "bold",
                      color: v.Status === "Paid" ? "green" : "red",
                    }}
                  >
                    {v.Status}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Status === "Unpaid" && (
                      <button
                        onClick={() => openModal(v)}
                        style={{ ...buttonStyle("orange"), marginRight: "5px" }}
                      >
                        Mark Paid
                      </button>
                    )}
                    <button
                      onClick={() => deleteVoucher(v.id)}
                      style={buttonStyle("red")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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

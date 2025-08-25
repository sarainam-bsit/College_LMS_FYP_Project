import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "../Navbar";
import Footer from "../Footer";

const API_BASE = "http://127.0.0.1:8000/fee/fee-voucher/";
const HOSTEL_FEE_API = "http://127.0.0.1:8000/fee/fee-voucher/generate_hostel_fee_yearly/";

export default function AdminHostelFeeVoucher() {
  const [formData, setFormData] = useState({
    amount: "",
    fine_date: "",
    fine_amount: "",
    bank_branch: "",
  });
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [amountPaid, setAmountPaid] = useState("");

  // Fetch all hostel vouchers
  const fetchVouchers = async () => {
    try {
      const res = await axios.get(API_BASE);
      const hostelVouchers = res.data.filter(v => v.Challan_Type === "Hostel-fee");
      setVouchers(hostelVouchers);
    } catch (err) {
      console.error("Error fetching vouchers", err);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate Hostel Fee Vouchers
  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(HOSTEL_FEE_API, formData);
      alert(res.data.message);
      fetchVouchers();
    } catch (err) {
      console.error(err);
      alert("Failed to generate vouchers");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Open Modal for Mark Paid
  const openModal = (voucher) => {
    setSelectedVoucher({
      ...voucher,
      Amount_Date: voucher.Amount_Date || new Date().toISOString().split("T")[0],
    });
    setAmountPaid("");
    const modal = new window.bootstrap.Modal(document.getElementById("markPaidModal"));
    modal.show();
  };

  // ✅ Confirm Mark Paid
  const confirmMarkPaid = async () => {
    if (!amountPaid) return alert("Enter amount paid!");

    try {
      await axios.post(`${API_BASE}${selectedVoucher.id}/mark_paid/`, {
        amount_paid: amountPaid,
        paid_date: selectedVoucher.Amount_Date,
      });
      alert("Voucher marked as paid!");
      fetchVouchers();

      const modal = window.bootstrap.Modal.getInstance(document.getElementById("markPaidModal"));
      modal.hide();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error marking paid");
    }
  };

  // Delete voucher
  const deleteVoucher = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_BASE}${id}/`);
      alert("Voucher deleted!");
      fetchVouchers();
    } catch (err) {
      console.error("Error deleting voucher", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{marginTop: '6%'}}>
        <h2 className="text-center">🏠 Hostel Fee Voucher Management</h2>

        {/* Form */}
        <form className="card p-3 shadow mt-4" onSubmit={handleGenerate}>
          <h5>Generate Yearly Hostel Fee Vouchers</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label>Amount</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label>Fine Date</label>
              <input
                type="date"
                className="form-control"
                name="fine_date"
                value={formData.fine_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <label>Fine Amount</label>
              <input
                type="number"
                className="form-control"
                name="fine_amount"
                value={formData.fine_amount}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label>Bank Branch</label>
              <input
                type="text"
                className="form-control"
                name="bank_branch"
                value={formData.bank_branch}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-1 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </form>

        {/* Table */}
        <div className="card mt-5 shadow">
          <div className="card-header fw-bold">Hostel Fee Vouchers</div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Challan Type</th>
                  <th>Challan No</th>
                  <th>Amount</th>
                  <th>Fine Date</th>
                  <th>Amount Date</th>
                  <th>Fine Amount</th>
                  <th>Bank Branch</th>
                  <th>Paid</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((v) => (
                  <tr key={v.id}>
                    <td>{v.Challan_Type}</td>
                    <td>{v.Challan_no}</td>
                    <td>{v.Amount_to_Pay}</td>
                    <td>{v.Fine_Date || "-"}</td>
                    <td>{v.Amount_Date || "-"}</td>
                    <td>{v.Fine_Amount || "-"}</td>
                    <td>{v.Bank_Branch || "-"}</td>
                    <td>{v.Amount_Paid || "-"}</td>
                    <td className={v.Status === "Paid" ? "text-success fw-bold" : "text-danger fw-bold"}>
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
      </div>

      {/* Modal */}
      <div className="modal fade" id="markPaidModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Mark Voucher Paid</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <label className="form-label">Payment Amount</label>
              <input
                type="number"
                className="form-control mb-2"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
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
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-success" onClick={confirmMarkPaid}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

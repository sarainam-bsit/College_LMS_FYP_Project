import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const API_BASE = "http://127.0.0.1:8000/fee/fee-voucher/";
const HOSTEL_FEE_API = `${API_BASE}generate_hostel_fee_yearly/`;

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

  const fetchVouchers = async () => {
    try {
      const res = await axios.get(API_BASE);
      setVouchers(res.data.filter((v) => v.Challan_Type === "Hostel-fee"));
    } catch {
      toast.error("Failed to fetch vouchers");
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(HOSTEL_FEE_API, formData);
      toast.success(res.data.message || "Hostel vouchers generated!");
      fetchVouchers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to generate vouchers");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (voucher) => {
    setSelectedVoucher({
      ...voucher,
      Amount_Date: voucher.Amount_Date || new Date().toISOString().split("T")[0],
    });
    setAmountPaid("");
    new window.bootstrap.Modal(
      document.getElementById("markPaidModal")
    ).show();
  };

  const confirmMarkPaid = async () => {
    if (!amountPaid) return toast.warn("Enter amount paid!");

    try {
      await axios.post(`${API_BASE}${selectedVoucher.id}/mark_paid/`, {
        amount_paid: amountPaid,
        paid_date: selectedVoucher.Amount_Date,
      });
      toast.success("Voucher marked as paid!");
      fetchVouchers();

      window.bootstrap.Modal.getInstance(
        document.getElementById("markPaidModal")
      ).hide();
    } catch (err) {
      toast.error(err.response?.data?.error || "Error marking voucher paid");
    }
  };

  const deleteVoucher = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_BASE}${id}/`);
      toast.success("Voucher deleted!");
      fetchVouchers();
    } catch {
      toast.error("Error deleting voucher");
    }
  };

  const buttonStyle = (bg) => ({
    padding: "6px 12px",
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
      className="container"
      style={{
        marginTop: "6%",
        backgroundColor: "#ebeaf2ff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2
        className="text-center"
        style={{ color: "rgba(44, 44, 122, 1)", fontWeight: "bold" }}
      >
        🏠 Hostel Fee Voucher Management
      </h2>

      {/* Form */}
      <form
        className="shadow mt-4"
        onSubmit={handleGenerate}
        style={{
          backgroundColor: "#f5ecf4ff",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid white",
        }}
      >
        <h5 style={{ color: "rgba(44, 44, 122, 1)" }}>
          Generate Yearly Hostel Fee Vouchers
        </h5>
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
            <button
              type="submit"
              style={buttonStyle("rgb(70,4,67)")}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </form>

      {/* Table */}
      <div
        className="mt-5 shadow"
        style={{
          backgroundColor: "#f5ecf4ff",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid white",
        }}
      >
        <h5 style={{ color: "rgba(44, 44, 122, 1)" }}>Hostel Fee Vouchers</h5>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid white" }}>
                Challan No
              </th>
              <th style={{ padding: "10px", border: "1px solid white" }}>
                Amount
              </th>
              <th style={{ padding: "10px", border: "1px solid white" }}>
                Fine Date
              </th>
              <th style={{ padding: "10px", border: "1px solid white" }}>
                Amount Date
              </th>
              <th style={{ padding: "10px", border: "1px solid white" }}>
                Fine Amount
              </th>
              <th style={{ padding: "10px", border: "1px solid white" }}>
                Bank Branch
              </th>
              <th style={{ padding: "10px", border: "1px solid white" }}>
                Paid
              </th>
              <th style={{ padding: "10px", border: "1px solid white" }}>
                Status
              </th>
              <th style={{ padding: "10px", border: "1px solid white" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {vouchers.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: "10px", border: "1px solid white" }}>
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
                      color: v.Status === "Paid" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {v.Status}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid white",
                      display: "flex",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    {v.Status === "Unpaid" && (
                      <button
                        onClick={() => openModal(v)}
                        style={buttonStyle("orange")}
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

      {/* Modal */}
      <div className="modal fade" id="markPaidModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}
            >
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
              <button
                style={buttonStyle("green")}
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

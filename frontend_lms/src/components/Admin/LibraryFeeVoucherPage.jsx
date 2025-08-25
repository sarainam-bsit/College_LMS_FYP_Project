import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const API_URL = "http://localhost:8000/fee/fee-voucher/";
const LIBRARY_API = "http://localhost:8000/library/libraryform/";

export default function LibraryFeeVoucherPage() {
  const [vouchers, setVouchers] = useState([]);
  const [libraryApplications, setLibraryApplications] = useState([]);
  const [libraryForm, setLibraryForm] = useState({
    selectedIds: [],
    amount: "",
    fineDate: "",
    fineAmount: "",
    bankBranch: "",
  });

  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [amountPaid, setAmountPaid] = useState("");

  useEffect(() => {
    fetchVouchers();
    fetchLibraryApplications();
  }, []);

  // Fetch vouchers but only Library fee
  const fetchVouchers = async () => {
    try {
      const res = await axios.get(API_URL);
      const filtered = res.data.filter(v => v.Challan_Type === "Library-fee");
      setVouchers(filtered);
    } catch (err) {
      console.error("Error fetching vouchers:", err);
    }
  };

  // Fetch approved applications
  const fetchLibraryApplications = async () => {
    try {
      const res = await axios.get(LIBRARY_API);
      setLibraryApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  // Generate Library Fee
  const handleGenerateLibraryFee = async () => {
    if (libraryForm.selectedIds.length === 0 || !libraryForm.amount) {
      return alert("Select at least one application and enter amount.");
    }

    try {
      const res = await axios.post(`${API_URL}generate_library_fee/`, {
        application_ids: libraryForm.selectedIds,
        amount: libraryForm.amount,
        fine_date: libraryForm.fineDate,
        fine_amount: libraryForm.fineAmount,
        bank_branch: libraryForm.bankBranch,
      });

      const generatedIds = (res.data.generated_ids || []).map(id => parseInt(id));
      setLibraryApplications(prev =>
        prev.filter(app => !generatedIds.includes(app.id))
      );

      setLibraryForm({
        selectedIds: [],
        amount: "",
        fineDate: "",
        fineAmount: "",
        bankBranch: "",
      });

      alert(res.data.message || "Library vouchers generated!");
      fetchVouchers();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.error || "Error generating library fee");
    }
  };

  // Mark Paid
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
      alert(error.response?.data?.error || "Error marking paid");
    }
  };

  // Delete
  const deleteVoucher = async (voucherId) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_URL}${voucherId}/`);
      alert("Voucher deleted!");
      fetchVouchers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error deleting voucher");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">📚 Library Fee Voucher Management</h2>

      {/* Library Generate */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Generate Library Fee Voucher</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <select
                multiple
                value={libraryForm.selectedIds}
                onChange={(e) => {
                  const options = e.target.options;
                  const selected = [];
                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) selected.push(parseInt(options[i].value));
                  }
                  setLibraryForm({ ...libraryForm, selectedIds: selected });
                }}
                className="form-select"
              >
                {libraryApplications
                  .filter(app => app.status === "Approved" && !app.fee_generated_status)
                  .map(app => (
                    <option key={app.id} value={app.id}>
                      {app.email} - {app.status}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-6">
              <input
                type="number"
                placeholder="Fee Amount"
                className="form-control"
                value={libraryForm.amount}
                onChange={(e) =>
                  setLibraryForm({ ...libraryForm, amount: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                value={libraryForm.fineDate}
                onChange={(e) =>
                  setLibraryForm({ ...libraryForm, fineDate: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <input
                type="number"
                placeholder="Fine Amount"
                className="form-control"
                value={libraryForm.fineAmount}
                onChange={(e) =>
                  setLibraryForm({ ...libraryForm, fineAmount: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                placeholder="Bank Branch"
                className="form-control"
                value={libraryForm.bankBranch}
                onChange={(e) =>
                  setLibraryForm({ ...libraryForm, bankBranch: e.target.value })
                }
              />
            </div>
          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={handleGenerateLibraryFee}
          >
            Generate Library Fee
          </button>
        </div>
      </div>

      {/* Voucher Table */}
      <div className="card">
        <div className="card-header fw-bold">Library Fee Vouchers</div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Challan No</th>
                <th>Challan Type</th>
                <th>Student</th>
                <th>Amount</th>
                <th>Fine Date</th>
                <th>Amount Date</th>
                <th>Fine Amount</th>
                <th>Branch</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((v) => (
                <tr key={v.id}>
                  <td>{v.Challan_no}</td>
                  <td>{v.Challan_Type}</td>
                  <td>{v.Student_Name}</td>
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
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
      const filtered = res.data.filter((v) => v.Challan_Type === "Library-fee");
      setVouchers(filtered);
    } catch {
      toast.error("Error fetching vouchers");
    }
  };

  // Fetch approved applications
  const fetchLibraryApplications = async () => {
    try {
      const res = await axios.get(LIBRARY_API);
      setLibraryApplications(res.data);
    } catch {
      toast.error("Error fetching applications");
    }
  };

  // Generate Library Fee
  const handleGenerateLibraryFee = async () => {
    if (libraryForm.selectedIds.length === 0 || !libraryForm.amount) {
      return toast.warn("Select at least one application and enter amount.");
    }

    try {
      const res = await axios.post(`${API_URL}generate_library_fee/`, {
        application_ids: libraryForm.selectedIds,
        amount: libraryForm.amount,
        fine_date: libraryForm.fineDate,
        fine_amount: libraryForm.fineAmount,
        bank_branch: libraryForm.bankBranch,
      });

      const generatedIds = (res.data.generated_ids || []).map((id) =>
        parseInt(id)
      );
      setLibraryApplications((prev) =>
        prev.filter((app) => !generatedIds.includes(app.id))
      );

      setLibraryForm({
        selectedIds: [],
        amount: "",
        fineDate: "",
        fineAmount: "",
        bankBranch: "",
      });

      toast.success(res.data.message || "Library vouchers generated!");
      fetchVouchers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Error generating library fee");
    }
  };

  // Mark Paid
  const openModal = (voucher) => {
    setSelectedVoucher({
      ...voucher,
      Amount_Date:
        voucher.Amount_Date || new Date().toISOString().split("T")[0],
    });
    setAmountPaid("");
    new window.bootstrap.Modal(
      document.getElementById("markPaidModal")
    ).show();
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

      window.bootstrap.Modal.getInstance(
        document.getElementById("markPaidModal")
      ).hide();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error marking paid");
    }
  };

  // Delete
  const deleteVoucher = async (voucherId) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_URL}${voucherId}/`);
      toast.success("Voucher deleted!");
      fetchVouchers();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error deleting voucher");
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
        Library Fee Vouchers
      </h2>

      {/* Library Generate */}
      <div
        className="shadow mt-4"
        style={{
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
        }}>
           Library Fee Voucher
        </h3>
        <div className="row g-3">
          <div className="col-md-6">
            <select
              multiple
              value={libraryForm.selectedIds}
              onChange={(e) => {
                const options = e.target.options;
                const selected = [];
                for (let i = 0; i < options.length; i++) {
                  if (options[i].selected)
                    selected.push(parseInt(options[i].value));
                }
                setLibraryForm({ ...libraryForm, selectedIds: selected });
              }}
              className="form-select"
            >
              {libraryApplications
                .filter(
                  (app) => app.status === "Approved" && !app.fee_generated_status
                )
                .map((app) => (
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
          onClick={handleGenerateLibraryFee}
          style={{ ...buttonStyle("rgb(70,4,67)"), marginTop: "15px" }}
        >
          Generate Library Fee
        </button>
      </div>
      <div
        className="mt-5 shadow"
        style={{
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
        }}>Library Fee Vouchers</h3>
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
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Challan No
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Challan Type
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Student
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Amount
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Fine Date
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Amount Date
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Fine Amount
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Branch
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Paid
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Status
              </th>
              <th style={{ padding: "10px", border: "1px solid white", fontSize: '20px' }}>
                Action
              </th>
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
                    {v.Challan_Type}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid white" }}>
                    {v.Student_Name}
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

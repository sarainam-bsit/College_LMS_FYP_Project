import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Challanform = () => {
    const [voucher, setVoucher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();  

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/fee/fee-voucher/${id}/`);
                setVoucher(response.data);
            } catch (err) {
                console.error("Error fetching voucher:", err);
                setError("Fee voucher not found.");
                toast.error("Fee voucher not found.");
            } finally {
                setLoading(false);
            }
        };
        fetchVoucher();
    }, [id]);

    const downloadPDF = () => {
        const input = document.getElementById("challanForm");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Challan_${voucher.Challan_no}.pdf`);
        });
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
    if (!voucher) return <div className="text-center mt-5">No voucher data available.</div>;

    return (
        <div className="container p-2" style={{ marginTop: '4%', backgroundColor: "#ebeaf2ff", minHeight: "100vh" }}>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

            <div className="text-center my-3">
                <button 
                    className="btn"
                    onClick={downloadPDF}
                    style={{
                        backgroundColor: "rgb(70, 4, 67)",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        transition: "transform 0.2s"
                    }}
                    onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                    Download Challan
                </button>
            </div>

            <div id="challanForm">
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6">
                        <h2 
                            className="text-center py-2 px-3 mx-auto rounded shadow-lg"
                            style={{
                                maxWidth: '400px',
                                backgroundColor: "rgb(70, 4, 67)",
                                color: "white",
                                fontWeight: "700"
                            }}
                        >
                            Challan Form
                        </h2>
                    </div>
                </div>

                <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                    <div className="card mt-0" style={{ width: "100%", maxWidth: "90%", backgroundColor: "#f5ecf4ff", borderRadius: "15px" }}>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item bg-light d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img src="/logo-removebg-preview (1).png" alt="logo" style={{ height: "40px", marginRight: "10px" }} />
                                        <span className="fw-bold fs-5">College LMS</span>
                                    </div>
                                    <div className="text-end">
                                        <span className="me-2" style={{ color: "rgb(4,4,63)" }}>{voucher.Department}</span>
                                        <span className="me-2" style={{ color: "rgb(4,4,63)" }}>{voucher.Category}</span>
                                        <span style={{ fontWeight: "bold" }}>Challan/PV No: {voucher.Challan_no}</span>
                                    </div>
                                </li>

                                <li className="list-group-item bg-light">
                                    <strong>Institute:</strong> SKP-GDC (Govt Postgraduate College Civil Line, Sheikhupura)
                                </li>
                                <li className="list-group-item bg-light">
                                    <strong>Candidate:</strong> {voucher.Student_Name}
                                </li>
                                <li className="list-group-item bg-light">
                                    <strong>ES ID:</strong> {voucher.Student_Name}- ({voucher.Student_Reg_No})
                                </li>

                                <li className="list-group-item bg-light">
                                    <strong>Challan Type:</strong> {voucher.Challan_Type} <br />
                                    Amount to Pay: RS. {voucher.Amount_to_Pay} <br />
                                    Fine Amount: RS. {voucher.Fine_Amount} <br />
                                    Status: <span style={{ color: voucher.Status === "Paid" ? "green" : "red", fontWeight: "bold" }}>{voucher.Status}</span>
                                </li>

                                <li className="list-group-item bg-light d-flex flex-wrap justify-content-between">
                                    <div><strong>Bank Branch:</strong> {voucher.Bank_Branch}</div>
                                    <div><strong>Payment Date:</strong> {voucher.Fine_Date}</div>
                                </li>

                                <li className="list-group-item bg-light">
                                    <ul>
                                        <li>Note your subjects carefully, corrections are allowed (if any) till {voucher.Fine_Date}</li>
                                    </ul>
                                </li>

                                <li className="list-group-item bg-light">
                                    <ul>
                                        <li>Fee can be deposited at any branch of UBL (MCA) A/C No. 225592551 OR HBL [CMD] A/C No. 427900084303</li>
                                        <li>For online payment: HBL/Konnect APP; Select Education then University of the Punjab External challan No. 9012986 OR From other mobile/internet banking applications Select 1BILL and enter 1BILL invoice No. 10162050149012986</li>
                                        <li className='text-center fw-bold mt-2'>Any fee directly transferred to account through ATM or any banking application is not verifiable.</li>
                                    </ul>
                                </li>

                                <li className="list-group-item bg-light d-flex justify-content-between">
                                    <span>Officer: ____________ </span>
                                    <span>Cashier: ____________ </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Challanform;

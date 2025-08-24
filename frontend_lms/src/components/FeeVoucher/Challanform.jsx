import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
        <div className="container p-1" style={{marginTop: '4%'}}>
            
            <div className="text-center my-3">
                <button className="btn btn-primary" onClick={downloadPDF}>Download Challan</button>
            </div>

            <div id="challanForm">
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6">
                        <h2 className="heading text-center mt-4 bg-dark text-white py-1 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Challan Form</h2>
                    </div>
                </div>

                <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
                    <div className="card mt-0" style={{ width: "100%", maxWidth: "90%" }}>
                        <div className="card-body bg-secondary">
                            <ul className="list-group">
                                <li className="list-group-item bg-light">
                                    <div className='d-flex flex-column flex-md-row align-items-center justify-content-between'>
                                        <div className="d-flex align-items-center mb-2 mb-md-0">
                                            <img src="/logo-removebg-preview (1).png" className="img-fluid me-2" alt="logo" style={{ height: "40px", width: "auto" }} />
                                            <span className="fs-5 fw-bold">College LMS</span>
                                        </div>
                                        <div className="d-flex flex-column flex-sm-row text-center text-sm-start">
                                            <span className="me-sm-3">{voucher.Department}</span>
                                            <span className="me-sm-3">{voucher.Category}</span>
                                            <span>Challan/PV No: {voucher.Challan_no}</span>
                                        </div>
                                    </div>
                                </li>

                                <li className="list-group-item bg-light">
                                    <div className="row">
                                        <div className="col-4 col-md-2 mb-1 fw-bold">Institute:</div>
                                        <div className="col-8 col-md-10">SKP-GDC (Govt Postgraduate College Civil Line, Sheikhupura)</div>
                                    </div>
                                </li>

                                <li className="list-group-item bg-light">
                                    <div className="row">
                                        <div className="col-4 col-md-2 mb-1 fw-bold">Candidate:</div>
                                        <div className="col-8 col-md-10">{voucher.Student_Name}</div>
                                    </div>
                                </li>

                                <li className="list-group-item bg-light">
                                    <div className="row">
                                        <div className="col-4 col-md-2 mb-1 fw-bold">ES ID:</div>
                                        <div className="col-8 col-md-10">{voucher.Student_Name}- ({voucher.Student_Reg_No})</div>
                                    </div>
                                </li>

                                <li className="list-group-item bg-light">
                                    <strong>Challan Type:</strong> {voucher.Challan_Type}
                                    <div className="mt-1">Amount to Pay: RS. {voucher.Amount_to_Pay}</div>
                                    <div className="mt-1">Fine Amount: RS. {voucher.Fine_Amount}</div>
                                    <div className="mt-1">Status: {voucher.Status}</div>
                                </li>

                                <li className="list-group-item bg-light">
                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-2">
                                            <span className="fw-bold">Bank Branch:</span> {voucher.Bank_Branch}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <span className="fw-bold">Payment Date:</span> {voucher.Fine_Date}
                                        </div>
                                    </div>
                                </li>

                                <li className="list-group-item text-break bg-light">
                                    <ul className='list-unstyled'>
                                        <li>Note your subjects carefully, corrections are allowed (if any) till {voucher.Fine_Date}</li>
                                        
                                    </ul>
                                </li>

                                <li className="list-group-item bg-light">
                                    <ul>
                                        <li>Fee can be deposited at any branch of UBL (MCA) A/C No. 225592551 OR HBL [CMD] A/C No. 427900084303</li>
                                        <li>For online payment: HBL/Konnect APP; Select Education then University of the Punjab External challan No. 9012986 OR From other mobile/internet banking applications Select 1BILL and enter 1BILL invoice No. 10162050149012986</li>
                                        <li className='list-unstyled text-center fw-bold mt-2'><b>Any fee directly transferred to account through ATM or any banking application is not verifiable.</b></li>
                                    </ul>
                                </li>

                                <li className="list-group-item bg-light">
                                    <div className="d-flex flex-column flex-md-row justify-content-between">
                                        <span>Officer: ____________ </span>
                                        <span>Cashier: ____________ </span>
                                    </div>
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

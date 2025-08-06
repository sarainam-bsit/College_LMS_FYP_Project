import React from 'react'

const Challanform = () => {
  return (
    <div className="container p-1">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6">
          <h2 className="heading text-center mt-4 bg-dark text-white py-1 px-3 mx-auto rounded shadow-lg" style={{ maxWidth: '400px' }}>Challan Form</h2>
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-center align-items-center " style={{ minHeight: "85vh" }}>
        <div className="card mt-0 " style={{ width: "100%", maxWidth: "90%" }}>
          <div className="card-body bg-secondary " >
            <ul class="list-group ">
              <li className="list-group-item bg-light ">
                <div className='d-flex flex-column flex-md-row align-items-center justify-content-between'>
                  <div className="d-flex align-items-center mb-2 mb-md-0">
                    <img src="/logo-removebg-preview (1).png" className="image-fluid me-2" alt="logo" style={{ height: "40px", width: "auto" }} />
                    <span className=" fs-5 fw-bold">College LMS</span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row text-center text-sm-start">
                    <span className=" me-sm-3">BS Information Technology</span>
                    <span className=" me-sm-3">Semester 7</span>
                    <span >Challan/PV No: 098765432</span>
                  </div>
                </div>
              </li>
              <li className="list-group-item bg-light">
                <div className="row">
                  <div className="col-4 col-md-2 mb-1 fw-bold">Institute:</div>
                  <div className="col-8 col-md-10">
                    SKP-GDC (Govt Postgraduate College Civil Line, Sheikhupura)
                  </div>
                </div>
              </li>
              <li className="list-group-item bg-light">
                <div className="row">
                  <div className="col-4 col-md-2 mb-1 fw-bold">Candidate:</div>
                  <div className="col-8 col-md-10">
                    Sara Inam D/O Muhammad Inam [2021-KS-148]
                  </div>
                </div>
              </li>
              <li className="list-group-item bg-light">
                <div className="row">
                  <div className="col-4 col-md-2 mb-1 fw-bold">ES ID:</div>
                  <div className="col-8 col-md-10">2022187 (PU Roll # 68426)</div>
                </div>
              </li>
              <li className="list-group-item bg-light">

                <strong>Subject Enrollment </strong>
                <div className="mt-1">From 03/04/2025 to 07/04/2025</div>
                <div className="mt-1">Subjects: CC-234, CC-345, DI-467, EI-345, DI-678</div>

              </li>
              <li className="list-group-item bg-light">
                <div className="row">
                  <div className="col-12 col-md-6 mb-2">
                    <span className="fw-bold">Single Fee till 07/05/2025:</span>{" "}
                    RS. 14,520
                  </div>
                  <div className="col-12 col-md-6">
                    <span className="fw-bold">Fee Amount:</span> RS. 14,520
                  </div>
                </div>
              </li>
              <li className="list-group-item text-break bg-light">
                <ul className='list-unstyled'>
                  <li>Note your subjects carefully, corrections are allowed (if any) till 03/05/2025</li>
                  <li>Amount in Words (Rs.): Fourteen Thousand, Five Hundred and Twenty Only</li>
                </ul></li>

              <li className="list-group-item bg-light">
                <ul>
                  <li>Fee can be deposited at any branch of UBL (MCA) A/C No. 225592551 OR HBL [CMD] A/C No. 427900084303</li>
                  <li>For online payment: HBL/Konnect APP; Select Education then University of the Punjab External challan No. 9012986 OR From other mobile/internet banking applications Select 1BIll and enter 1BILL invoice No. 10162050149012986</li>
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
  )
}

export default Challanform
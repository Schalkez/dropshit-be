import React from 'react'

const Wallet = () => {
  return (
    <div className="aiz-user-panel">
    <div className="aiz-titlebar mt-2 mb-4">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="h3">Ví của tôi</h1>
        </div>
      </div>
    </div>
    <div className="row gutters-10">
      <div className="col-md-4 mx-auto mb-3">
        <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
          <span className="size-30px rounded-circle mx-auto bg-soft-primary d-flex align-items-center justify-content-center mt-3">
            <i className="fas f a-dollar-sign la-2x text-white" />
          </span>
          <div className="px-3 pt-3 pb-3">
            <div className="h4 fw-700 text-center">$0.00</div>
            <div className="opacity-50 text-center">Số dư ví</div>
          </div>
        </div>
      </div>
    
    </div>
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0 h6">Lịch sử nạp tiền</h5>
      </div>
      <div className="card-body">
        <table
          className="table aiz-table mb-0 footable footable-1 breakpoint breakpoint-lg"
          style={{}}
        >
          <thead>
            <tr className="footable-header">
              <th style={{ display: "table-cell" }}>#</th>
              <th data-breakpoints="lg" style={{ display: "none" }}>
                Ngày
              </th>
              <th style={{ display: "table-cell" }}>Số tiền</th>
              <th data-breakpoints="lg" style={{ display: "none" }}>
                Phương thức thanh toán
              </th>
              <th className="text-right" style={{ display: "table-cell" }}>
                Chấp thuận
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td colSpan={3}>Không kết quả</td>
            </tr>
          </tbody>
        </table>
        <div className="aiz-pagination"></div>
      </div>
    </div>
  </div>
  
  )
}

export default Wallet
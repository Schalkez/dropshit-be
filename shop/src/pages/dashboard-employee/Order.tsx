import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await requestService.get("/profile/getOrderByEmployee");
      if (res && res.data) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="px-15px px-lg-25px">
      <div className="card">
        <form id="sort_orders" action="" method="GET">
          <div className="card-header row gutters-5">
            <div className="col text-center text-md-left">
              <h5 className="mb-md-0 h6">Đơn hàng</h5>
            </div>
          </div>
        </form>
        <div className="card-body p-3" style={{ overflow: "auto" }}>
          <table
            className="table aiz-table mb-0 footable footable-1 breakpoint breakpoint-md"
            style={{}}
          >
            <thead>
              <tr className="footable-header">
                <th style={{ display: "table-cell" }}>Mã đặt hàng:</th>

                <th data-breakpoints="lg" style={{ display: "table-cell" }}>
                  khách hàng
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Số tiền
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Profit
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Pick Up Status
                </th>
                <th data-breakpoints="lg" style={{ display: "table-cell" }}>
                  Tình trạng giao hàng
                </th>
                <th style={{ display: "table-cell" }}>Tình trạng thanh toán</th>
                <th
                  className="text-right footable-last-visible"
                  style={{ display: "table-cell" }}
                >
                  Tùy chọn
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item: any) => (
                <tr>
                  <td style={{ display: "table-cell" }}>
                    <a href="#20240325-15453856">{item?._id}</a>
                  </td>

                  <td style={{ display: "table-cell" }}>
                    {item?.customer?.name}
                  </td>
                  <td style={{ display: "table-cell" }}>
                    ${(+item?.tongtien)?.toLocaleString()}
                  </td>
                  <td style={{ display: "table-cell" }}>
                    ${(+item?.profit)?.toLocaleString()}
                  </td>
                  <td style={{ display: "table-cell" }}></td>
                  <td style={{ display: "table-cell" }}>{item?.status}</td>
                  <td style={{ display: "table-cell" }}>
                    {!item?.isPayment ? (
                      <span className="badge badge-inline badge-danger">
                        Chưa thanh toán
                      </span>
                    ) : (
                      <span className="badge badge-inline badge-success">
                        Đã thanh toán
                      </span>
                    )}
                  </td>
                  <td
                    className="text-right footable-last-visible"
                    style={{ display: "table-cell" }}
                  >
                    <Link
                      to={'/dashboard-employee/order-detail'}
                      state={item}
                      className="btn btn-soft-info btn-icon btn-circle btn-sm"
                      title="Chi tiết đơn hàng"
                    >
                      <i className="fas fa-eye text-primary" />
                    </Link>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="aiz-pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default Order;

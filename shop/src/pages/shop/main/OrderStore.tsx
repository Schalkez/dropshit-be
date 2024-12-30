import { Spin } from "antd";
import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderStore = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await requestService.get("/profile/getOrderByStore");
      if (res && res.data) {
        setOrders(res.data.data?.orders);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getTotal = () => {
    let total = 0,
      profit = 0;
    if (!orders?.length)
      return {
        total,
        profit,
      };
    orders.map((order: any) => {
      total += order?.tongtien || 0;
      profit += order?.profit || 0;
    });
    return {
      total,
      profit
    }
  };
  return (
    <div className="px-15px px-lg-25px">
      <Spin fullscreen spinning={loading} />
      <div className="row gutters-10 justify-content-center">
        <div className="col-md-4 mx-auto mb-3">
          <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
            <span className="size-30px rounded-circle mx-auto bg-soft-primary d-flex align-items-center justify-content-center mt-3">
              <i className="fas fa-upload la-2x" style={{ color: "#fff" }} />
            </span>
            <div className="px-3 pt-3 pb-3">
              <div className="h4 fw-700 text-center">{orders?.length}</div>
              <div className="opacity-50 text-center">Tổng số đơn đặt hàng</div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mx-auto mb-3">
          <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
            <span className="size-30px rounded-circle mx-auto bg-soft-primary d-flex align-items-center justify-content-center mt-3">
              <i className="fas fa-upload la-2x" style={{ color: "#fff" }} />
            </span>
            <div className="px-3 pt-3 pb-3">
              <div className="h4 fw-700 text-center">${getTotal().total}</div>
              <div className="opacity-50 text-center">Tổng doanh thu</div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mx-auto mb-3">
          <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
            <span className="size-30px rounded-circle mx-auto bg-soft-primary d-flex align-items-center justify-content-center mt-3">
              <i className="fas fa-upload la-2x" style={{ color: "#fff" }} />
            </span>
            <div className="px-3 pt-3 pb-3">
              <div className="h4 fw-700 text-center">${getTotal().profit}</div>
              <div className="opacity-50 text-center">Tổng lợi nhuận</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body p-3" style={{ overflow: "auto" }}>
          <table
            className="table aiz-table mb-0 footable footable-1 breakpoint-xl"
            style={{}}
          >
            <thead>
              <tr className="footable-header">
                <th style={{ display: "table-cell" }}>Mã đặt hàng:</th>

                <th data-breakpoints="lg" style={{ display: "table-cell" }}>
                  khách hàng
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Giá kho
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Số tiền
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Profit
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Ngày đặt
                </th>
                <th data-breakpoints="md" style={{ display: "table-cell" }}>
                  Pick Up Status
                </th>
                <th data-breakpoints="lg" style={{ display: "table-cell" }}>
                  Tình trạng giao hàng
                </th>
                <th style={{ display: "table-cell" }}>Tình trạng thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item: any) => (
                <tr>
                  <td style={{ display: "table-cell" }}>
                    <a href="#20240326-13220219">{item?._id}</a>
                  </td>

                  <td style={{ display: "table-cell" }}>
                    {item?.customer?.name}
                  </td>
                  <td style={{ display: "table-cell" }}>
                    ${(+item?.tongtien - item?.profit)?.toLocaleString()}
                  </td>
                  <td style={{ display: "table-cell" }}>
                    ${(+item?.tongtien)?.toLocaleString()}
                  </td>
                  <td style={{ display: "table-cell" }}>
                    ${(+item?.profit)?.toLocaleString()}
                  </td>
                  <td style={{ display: "table-cell" }}>{new Date(item?.createdAt)?.toLocaleString()}</td>
                  <td style={{ display: "table-cell" }}>{item?.status}</td>

                  <td style={{ display: "table-cell" }}>
                    {item?.isPayment ? (
                      <span className="badge badge-inline badge-success">
                        Đã thanh toán
                      </span>
                    ) : (
                      <span className="badge badge-inline badge-danger">
                        Chưa thanh toán
                      </span>
                    )}
                  </td>
                  <td
                    className="text-right footable-last-visible"
                    style={{ display: "table-cell" }}
                  >
                    <Link
                      to="/dashboard-seller/order-detail"
                      className="btn btn-soft-info btn-icon btn-circle btn-sm"
                      title="Chi tiết đơn hàng"
                      state={item}
                    >
                      <i className="fas fa-eye" />
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

export default OrderStore;

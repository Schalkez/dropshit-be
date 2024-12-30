import { Select, Spin, message } from "antd";
import { Option } from "antd/es/mentions";
import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OrderDetailStore = () => {
  const location = useLocation();
  const [order, setOrder] = useState<any>(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChangeStatus = async (val: string) => {
    updateOrder(val, null);
  };

  const handleChangeIsPayment = async (val: string) => {
    updateOrder(null, val);
  };

  useEffect(() => {
    setOrder(location?.state);
  }, [location?.state]);

  const resolvePayment = async () => {
    setLoading(true);
    try {
      const res = await requestService.post("/profile/resolvePaymentOrder", {
        data: {
          id: order?._id,
        },
      });
      if (res && res.data) {
        message.success("Đã thanh toán đơn hàng cho kho");
        setOrder({ ...order, isPayMentStore: true })
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
    setLoading(false);
  };
  const updateOrder = async (status: any, isPayment: any) => {
    setLoading(true);
    try {
      const res = await requestService.post("/profile/updateOrder", {
        data: {
          orderId: order?._id,
          isPayment,
          status,
        },
      });
      if (res && res.data) {
        message.success("Update Thành Công");
        navigate("/dashboard-employee/orders");
      }
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra vui lòng thử lại sau");
    }
    setLoading(false);
  };

  return (
    <div className="px-15px px-lg-25px">
      <Spin spinning={loading} fullscreen />
      <div className="card">
        <div className="card-header">
          <h1 className="h2 fs-16 mb-0">Chi tiết đơn hàng</h1>
        </div>
        <div className="card-body">
          <div className="row gutters-2">
            <div className="col text-md-left text-center"></div>
            <div className="col-md-2 d-flex flex-nowrap justify-content-end align-items-end ml-auto">
              {order?.isPayMentStore ? (
                <button
                  id="payment_for_storehouse"
                  type="button"
                  disabled
                  className="btn btn-success"
                >
                  Thanh toán cho kho
                </button>
              ) : (
                <button
                  id="payment_for_storehouse"
                  type="button"
                  className="btn btn-primary"
                  onClick={resolvePayment}
                >
                  Thanh toán cho kho
                </button>
              )}
            </div>
            <div className="col-md-3 ml-auto">
              <label htmlFor="update_payment_status">
                Tình trạng thanh toán
              </label>
              <input
                type="text"
                className="form-control"
                disabled
                defaultValue={
                  order?.isPayment ? "Đã thanh toán" : "Chưa thanh tóa"
                }
              />
            </div>
            <div className="col-md-3 ml-auto">
              <label htmlFor="update_delivery_status">
                Tình trạng giao hàng
              </label>
              <Select
                defaultValue={order?.status}
                placeholder="Tình trạng giao hàng"
                onChange={handleChangeStatus}
                disabled
              >
                <Option value="PENDING">Đang chờ xử lý</Option>
                <Option value="CONFIRM">Đã xác nhận</Option>
                <Option value="PICKED_UP">Picked Up</Option>
                <Option value="ON_THE_WAY">On The Way</Option>
                <Option value="DELIVERED">Đã giao hàng</Option>
              </Select>
            </div>
          </div>
          <div className="row gutters-5 mt-2">
            <div className="col-md-4 ml-auto">
              <table
                className="table-bordered aiz-table invoice-summary table footable footable-1 breakpoint-md"
                style={{}}
              >
                <tbody>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      Tên： &nbsp;&nbsp;&nbsp; {order?.customer?.name}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-bold footable-first-visible footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      E-mail： &nbsp;&nbsp;&nbsp;
                      <span className="addrshow" style={{ display: "none" }}>
                        {order?.customer?.email}
                      </span>
                      <span className="addrhide">fzb*****************</span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      Điện thoại： &nbsp;&nbsp;&nbsp;
                      <span className="addrshow" style={{ display: "none" }}>
                        +7165984200478
                      </span>
                      <span className="addrhide">+71*********** </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      Địa chỉ giao hàng： &nbsp;&nbsp;&nbsp;
                      <span className="addrshow" style={{ display: "none" }}>
                        7635 Blanda Estate Suite 622 East Alanismouth, MI
                        24033-2751
                      </span>
                      <span className="addrhide">************ </span>
                    </td>
                  </tr>

                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      Mã bưu điện： &nbsp;&nbsp;&nbsp;22029
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      Quốc gia： &nbsp;&nbsp;&nbsp;United States
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-4 ml-auto">
              <table
                className="table-bordered aiz-table invoice-summary table footable footable-2 breakpoint-md"
                style={{}}
              >
                <tbody>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      Đặt hàng #
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      {order?._id}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      Tình trạng đặt hàng
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      <span className="badge badge-inline badge-info">
                        {order?.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      Ngày đặt hàng
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      {new Date(order?.createdAt)?.toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      Tổng cộng
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      ${(+order?.tongtien)?.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      Phương thức thanh toán
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      thanh toán khi giao hàng
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      Thông tin bổ sung
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    />
                  </tr>
                  <tr>
                    <td
                      className="text-main text-bold footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      Thời gian còn lại
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      <span id="showtime" />
                      <span id="mydate" style={{ display: "none" }} />
                      <span id="mycreated" style={{ display: "none" }}>
                        2024-03-26 13:22:11
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-4 ml-auto">
              <table
                className="table-bordered aiz-table invoice-summary table footable footable-3 breakpoint-md"
                style={{}}
              >
                <tbody>
                  <tr>
                    <td
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      <strong className="text-muted">Giá kho :</strong>
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      ${(+order?.tongtien - order?.profit)?.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      <strong className="text-muted">Profit :</strong>
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      ${(+order?.profit)?.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      <strong className="text-muted">Tổng phụ :</strong>
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      ${(+order?.gia_kho + order?.profit)?.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      <strong className="text-muted">Thuế :</strong>
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      $0.00
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      <strong className="text-muted">Đang chuyển hàng :</strong>
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      $0.00
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      <strong className="text-muted">Phiếu mua hàng :</strong>
                    </td>
                    <td
                      className="footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      $0.00
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      <strong className="text-muted">TOÀN BỘ :</strong>
                    </td>
                    <td
                      className="text-muted h5 footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      ${(+order?.gia_kho + order?.profit)?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="no-print text-right">
                <a href="#" type="button" className="btn btn-icon btn-light">
                  <i className="fas fa-print" />
                </a>
              </div>
            </div>
          </div>
          <hr className="new-section-sm bord-no" />
          <div className="row">
            <div className="col-lg-12 table-responsive">
              <table
                className="table-bordered aiz-table invoice-summary table footable footable-4 breakpoint breakpoint-md"
                style={{}}
              >
                <thead>
                  <tr className="bg-trans-dark footable-header">
                    <th
                      data-breakpoints="lg"
                      className="min-col"
                      style={{ display: "none" }}
                    >
                      #
                    </th>
                    <th
                      className="footable-first-visible"
                      style={{ display: "table-cell" }}
                    >
                      tấm hình
                    </th>
                    <th
                      className="text-uppercase footable-last-visible"
                      style={{ display: "table-cell" }}
                    >
                      Sự miêu tả
                    </th>
                    <th
                      data-breakpoints="lg"
                      className="text-uppercase"
                      style={{ display: "none" }}
                    >
                      Loại giao hàng
                    </th>
                    <th
                      data-breakpoints="lg"
                      className="min-col text-uppercase text-center"
                      style={{ display: "none" }}
                    >
                      QTY
                    </th>
                    <th
                      data-breakpoints="lg"
                      className="min-col text-uppercase text-center"
                      style={{ display: "none" }}
                    >
                      Giá bán
                    </th>
                    <th
                      data-breakpoints="lg"
                      className="min-col text-uppercase text-right"
                      style={{ display: "none" }}
                    >
                      TOÀN BỘ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!!order?.product &&
                    order?.product?.map((item: any) => (
                      <tr key={item?._id}>
                        <td style={{ display: "table-cell" }}>1</td>
                        <td
                          className="footable-first-visible"
                          style={{ display: "table-cell" }}
                        >
                          <Link to={"/detail/" + item?._id} target="_blank">
                            <img height={50} src={item?.product?.images[0]} />
                          </Link>
                        </td>
                        <td
                          className="footable-last-visible"
                          style={{ display: "table-cell" }}
                        >
                          <strong>
                            <a
                              href="#/product/nft-hand-book-if-the-answer-is-yes-then-keep-reading-because-this-is-the-perfect-book-for-you-tOUCk"
                              target="_blank"
                              className="text-muted"
                            >
                              {item?.product?.name}
                            </a>
                          </strong>
                          <small />
                        </td>
                        <td style={{ display: "none" }}></td>
                        <td
                          className="text-center"
                          style={{ display: "table-cell" }}
                        >
                          {item?.quantity}
                        </td>
                        <td
                          className="text-center"
                          style={{ display: "table-cell" }}
                        >
                          ${item?.product?.price}
                        </td>
                        <td
                          className="text-center"
                          style={{ display: "table-cell" }}
                        >
                          ${item?.quantity * item?.product?.price}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailStore;

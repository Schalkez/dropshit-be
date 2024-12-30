import { Modal, Spin, message } from "antd";
import requestService from "api/request";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "store";

const Deposit = () => {
  const [isO, setIsO] = useState(false);
  const [loading, setLoading] = useState(false);
  const [banks, setbanks] = useState([]);
  const [selectB, setSelectB] = useState(null);
  const [form, setForm] = useState(null);
  const [history, setHistory] = useState([]);
  const { user } = useAppSelector((state) => state?.app);
  const getHis = async () => {
    setLoading(true);
    try {
      const res = await requestService.get("/profile/history-payments");
      if (res && res.data) {
        setHistory(res?.data?.data?.payment);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await requestService.post("/profile/payment", {
        data: {
          bank: selectB?._id,
          ...form,
        },
      });
      if (res && res?.data) {
        message.success("Đã nạp tiền thành công. Vui lòng chờ");
        setIsO(false);
        await getHis();
      }
    } catch (error) {
      console.log(error);
      message.error(error?.response?.data?.message);
    }
    setLoading(false);
  };

  const getBanks = async () => {
    setLoading(true);
    try {
      const res = await requestService.get("/profile/getBankMethod");
      if (res && res.data) {
        setbanks(res?.data?.data);
        setSelectB(res?.data?.data?.[0]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getMoneyPending = () => {
    let total = 0;
    if (!!history?.length) {
      history.map((i) => {
        if (i?.isResolve === "PENDING") {
          total += i?.moneyPayment;
        }
      });
    }
    return total;
  };
  useEffect(() => {
    getBanks();
    getHis();
  }, []);
  return (
    <div className="aiz-main-content">
      <Spin spinning={loading} fullscreen />
      <Modal
        open={isO}
        centered
        width={600}
        footer={null}
        onCancel={() => setIsO(false)}
      >
        <div id="offline_seller_package_purchase_modal_body">
          <div className="modal-body gry-bg px-3 pt-3 mx-auto">
            <div className="align-items-center gutters-5 row">
              {!!banks?.length &&
                banks?.map((item) => (
                  <div
                    className="col-6 col-md-4"
                    key={item?._id}
                    onClick={() => setSelectB(item)}
                  >
                    <label
                      className="aiz-megabox d-block mb-3"
                      style={{
                        border: selectB?._id === item?._id && "1px solid #ccc",
                      }}
                    >
                      <input
                        defaultValue="VIB"
                        id="payment_option"
                        type="radio"
                        name="payment_option"
                        onchange="toggleManualPaymentData(7)"
                        defaultChecked=""
                      />
                      <span className="d-block p-3 aiz-megabox-elem">
                        <img src={item?.img} className="img-fluid mb-2" />
                        <span className="d-block text-center">
                          <span className="d-block fw-600 fs-15">
                            {item?.name}
                          </span>
                        </span>
                      </span>
                    </label>
                  </div>
                ))}
            </div>
            <div id="manual_payment_data">
              <div className="card mb-3 p-3">
                <div id="manual_payment_description">
                  <div />
                  <ul>
                    <li>
                      Tên ngân hàng - {selectB?.name}, Account Name -{" "}
                      {selectB?.author}, Account Number - {selectB?.number}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body gry-bg px-3 pt-0">
            <div className="row">
              <div className="col-md-3">
                <label>
                  Số tiền <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-9">
                <input
                  type="number"
                  lang="en"
                  className="form-control mb-3"
                  step="0.01"
                  name="amount"
                  value={form?.moneyPayment}
                  onChange={(e) =>
                    setForm({ ...form, moneyPayment: e?.target?.value })
                  }
                  min=""
                  placeholder="Số tiền"
                  required=""
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <label>ID giao dịch</label>
              </div>
              <div className="col-md-9">
                <input
                  name="message"
                  rows={8}
                  className="form-control mb-3"
                  value={form?.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e?.target?.value })
                  }
                />
              </div>
            </div>
            <div className="form-group text-right">
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                onClick={onSubmit}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="px-15px px-lg-25px">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    #manual_payment_data + .form-group{display:none}\n    #manual_payment_data > div:nth-child(2){display:none}\n",
          }}
        />
        <div className="aiz-titlebar mt-2 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="h3">Nạp Tiền</h1>
            </div>
          </div>
        </div>
        <div className="row gutters-10">
          <div className="col-md-3 mb-4 mx-auto">
            <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
              <span className="size-30px rounded-circle mx-auto bg-soft-primary d-flex align-items-center justify-content-center mt-3">
                <i className="fas fa-dollar-sign la-2x text-white" />
              </span>
              <div className="px-3 pt-3 pb-3">
                <div className="h4 fw-700 text-center">${(getMoneyPending())?.toLocaleString()}</div>
                <div className="opacity-50 text-center">
                  Số dư đang chờ xử lý
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4 mx-auto">
            <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
              <span className="size-30px rounded-circle mx-auto bg-soft-primary d-flex align-items-center justify-content-center mt-3">
                <i className="fas fa-dollar-sign la-2x text-white" />
              </span>
              <div className="px-3 pt-3 pb-3">
                <div className="h4 fw-700 text-center">
                  ${(user?.money || 0)?.toLocaleString()}
                </div>
                <div className="opacity-50 text-center">Số dư ví</div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4 mx-auto">
            <div
              className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition"
              onClick={() => setIsO(true)}
            >
              <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                <i className="fas fa-plus la-3x text-white" />
              </span>
              <div className="fs-18 text-primary">Gửi yêu cầu nạp tiền</div>
            </div>
          </div>
          {/*<div class="col-md-3 mb-4 mr-auto" >
      <div class="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition" onclick="show_request_zhuan()">
          <span class="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
              <i class="fas fa-plus la-3x text-white"></i>
          </span>
          <div class="fs-18 text-primary">Gửi yêu cầu nạp tiền</div>
      </div>
    </div>*/}
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 h6">Recharge Request history</h5>
          </div>
          <div className="card-body">
            <table
              className="table aiz-table mb-0 footable footable-1 breakpoint breakpoint-sm"
              style={{}}
            >
              <thead>
                <tr className="footable-header">
                  <th style={{ display: "table-cell" }}>Ngày</th>
                  <th
                    className="footable-last-visible"
                    style={{ display: "table-cell" }}
                  >
                    Số tiền
                  </th>
                  <th data-breakpoints="lg" style={{ display: "table-cell" }}>
                    Trạng thái
                  </th>
                  <th
                    data-breakpoints="lg"
                    width="60%"
                    style={{ display: "table-cell" }}
                  >
                    Thông điệp
                  </th>
                </tr>
              </thead>
              <tbody>
                {!!history?.length &&
                  history?.map((i) => (
                    <tr>
                      <td style={{ display: "table-cell" }}>22-04-2024</td>
                      <td
                        className="footable-last-visible"
                        style={{ display: "table-cell" }}
                      >
                        ${i?.moneyPayment?.toLocaleString()}
                      </td>
                      <td style={{ display: "table-cell" }}>
                        <span
                          className={clsx(" badge badge-inline ", {
                            "badge-info": i?.isResolve === "PENDING",
                            "badge-danger": i?.isResolve === "REJECT",
                            "badge-success": i?.isResolve === "RESOLVE",
                          })}
                        >
                          {i?.isResolve}
                        </span>
                      </td>
                      <td style={{ display: "table-cell" }}>{i?.content}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="aiz-pagination"></div>
          </div>
        </div>
      </div>
      <div className="bg-white text-center py-3 px-15px px-lg-25px mt-auto border-sm-top">
        <p className="mb-0">© EBAY việt nam v7.4.0</p>
      </div>
    </div>
  );
};

export default Deposit;

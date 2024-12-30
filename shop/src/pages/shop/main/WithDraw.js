import { Button, Modal, Spin, message } from "antd";
import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store";

const WithDraw = () => {
  const { user } = useAppSelector((state) => state.app);
  const [moneyWithDraw, setMonetWithDraw] = useState(0);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchDataH = async () => {
    try {
      const res = await requestService.get("/profile/history-withdraws");
      if (res && res?.data) {
        setHistory(res?.data?.data?.withdraws);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataH();
  }, []);

  const getTotal = () => {
    let total = 0;
    if (!history?.length) return total;
    history.map((i) => {
      if (i?.isResolve === "PENDING") total += i?.moneyWithDraw;
    });
    return total;
  };
  const onSub = async () => {
    setLoading(true);
    try {
      const res = await requestService.post("/profile/withdraw", {
        data: {
          moneyWithDraw,
        },
      });
      if (res && res.data) {
        message.success("Bạn đã rút tiền thành công");
        setMonetWithDraw(0);
        setIsOpen(false);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
    setLoading(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="aiz-main-content">
      <Spin spinning={loading} fullscreen />
      <Modal
        centered
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
      >
        {user?.bankInfo ? (
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Gửi yêu cầu rút tiền
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="px-3 py-3">
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <td>Tên ngân hàng</td>
                    <td>{user?.bankInfo?.nameBank}</td>
                  </tr>
                  <tr>
                    <td>Tên tài khoản ngân hàng</td>
                    <td>{user?.bankInfo?.authorName}</td>
                  </tr>
                  <tr>
                    <td>Số tài khoản ngân hàng</td>
                    <td>{user?.bankInfo?.numberBank}</td>
                  </tr>
                  <tr>
                    <td>Chi nhánh</td>
                    <td>{user?.bankInfo?.branchBank}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="modal-body gry-bg px-3 pt-1">
              <div className="row">
                <div className="col-md-3">
                  <label>
                    Số tiền <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    type="number"
                    value={moneyWithDraw}
                    onChange={(e) => setMonetWithDraw(e?.target?.value)}
                    lang="en"
                    className="form-control mb-3"
                    name="amount"
                    min={3}
                    max={0}
                    placeholder="Số tiền"
                    required=""
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group text-left">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary"
                  onClick={onSub}
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12">
            <h1 className="h3">Bạn chưa liên kết ngân hàng</h1>
            <Link to={"/dashboard-seller/setting-store"}>
              <Button className="btn btn-dark ">Thêm</Button>
            </Link>
          </div>
        )}
      </Modal>
      <div className="px-15px px-lg-25px">
        <div className="aiz-titlebar mt-2 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="h3">Rút tiền</h1>
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
                <div className="h4 fw-700 text-center">
                  ${getTotal()?.toLocaleString()}
                </div>
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
                  ${user?.money?.toLocaleString()}
                </div>
                <div className="opacity-50 text-center">Số dư ví</div>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4 mx-auto">
            <div
              className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition"
              onClick={() => setIsOpen(true)}
            >
              <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                <i className="fas fa-plus la-3x text-white" />
              </span>
              <div className="fs-18 text-primary">Gửi yêu cầu rút tiền</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 h6">Lịch sử yêu cầu rút tiền</h5>
          </div>
          <div className="card-body">
            <table
              className="table aiz-table mb-0 footable footable-1 breakpoint breakpoint-sm"
              style={{}}
            >
              <thead>
                <tr className="footable-header">
                  <th style={{ display: "table-cell" }}>#</th>
                  <th style={{ display: "table-cell" }}>Ngày</th>
                  <th style={{ display: "table-cell" }}>Số tiền</th>
                  <th data-breakpoints="lg">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {history?.map((i, idnex) => (
                  <tr>
                    <td style={{ display: "table-cell" }}>{idnex}</td>
                    <td style={{ display: "table-cell" }}>{new Date(i?.createdAt)?.toLocaleDateString()}</td>
                    <td style={{ display: "table-cell" }}>{i?.moneyWithDraw}</td>
                    <td style={{ display: "table-cell" }}>{i?.isResolve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithDraw;

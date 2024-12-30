import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store, { useAppSelector } from "store";

const MainDashBoard = () => {
  const { user } = useAppSelector((state) => state.app) as any;

  const [result, setResult] = useState<any>(null);
  const getData = async () => {
    try {
      const res = await requestService.get("/profile/getDataShop");
      if (res && res.data) {
        setResult(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="aiz-main-content">
      <div className="px-15px px-lg-25px">
        <div className="aiz-titlebar mt-2 mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="h3 text-primary text-left text-dark">
                Bảng điều khiển
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {user?.store?.isVerify === "PENDING" ? (
                  <button className="btn btn-warning">Đang chờ xác nhận</button>
                ) : user?.store?.isVerify === "SUCCESS" ? (
                  <button className="btn btn-success">Đã xác nhận</button>
                ) : (
                  <Link
                    to="/dashboard-seller/apply_for_verification"
                    className="btn btn-sm btn-primary"
                  >
                    Verify Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-xxl-3">
            <div className="card shadow-none mb-2 bg-primary py-2">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-16 text-white text-white">
                        Các sản phẩm
                      </span>
                    </p>
                    <h3 className="mb-0 text-white fs-30">0</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xxl-3">
            <div className="card shadow-none mb-2 bg-primary py-2">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-16 text-white">Tổng lợi nhuận</span>
                    </p>
                    <h3 className="mb-0 text-white fs-30">
                      ${result?.totalProfit?.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xxl-3">
            <div className="card shadow-none mb-2 bg-primary py-2">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-16 text-white">Tổng số đơn hàng</span>
                    </p>
                    <h3 className="mb-0 text-white fs-30">
                      {result?.countOrder}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xxl-3">
            <div className="card shadow-none mb-2 bg-primary py-2">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-16 text-white">Tổng doanh thu</span>
                    </p>
                    <h3 className="mb-0 text-white fs-30">
                      ${result?.totalRevenue?.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-xxl-3">
            <div className="card shadow-none mb-2 bg-primary py-2">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-16 text-white">đơn hàng mới</span>
                    </p>
                    <h3 className="mb-0 text-white fs-30">
                      {result?.countOrderNEW}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xxl-3">
            <div className="card shadow-none mb-2 bg-primary py-2">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-16 text-white">Total Views</span>
                    </p>
                    <h3 className="mb-0 text-white fs-30">
                      {user?.store?.views}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xxl-3">
            <div className="card shadow-none mb-2 bg-primary py-2">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-16 text-white">Trên đường</span>
                    </p>
                    <h3 className="mb-0 text-white fs-30">
                      {result?.countOrderOnTheWay}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-xxl-3">
            <div className="card shadow-none mb-2 bg-primary py-2">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-16 text-white">Đã giao hàng</span>
                    </p>
                    <h3 className="mb-0 text-white fs-30">
                      {result?.countOrderDelivered}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3 mb-4">
            {/* <div className="card shadow-none bg-soft-primary">
              <div className="card-body">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div className="" />
                  </div>
                  <div className="chartjs-size-monitor-shrink">
                    <div className="" />
                  </div>
                </div>
                <div className="card-title text-primary fs-16 fw-600">
                  Chỉ số bán hàng
                </div>
                <canvas
                  id="graph-1"
                  className="w-100 chartjs-render-monitor"
                  height={150}
                  style={{ display: "block", width: 194, height: 150 }}
                  width={194}
                />
              </div>
            </div> */}
            <div className="card shadow-none bg-soft-primary mb-0">
              <div className="card-body">
                <div className="card-title text-primary fs-16 fw-600">
                  Số lượng đã bán
                </div>
                <p>Số tiền đã bán của bạn (tháng hiện tại)</p>
                <h3 className="text-primary fw-600 fs-30">
                  ${result?.totalRevenueCurrentMonth?.toLocaleString()}
                </h3>
                <p className="mt-4">
                  Last Month: ${result?.totalRevenueLastMonth?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-sm-6 col-md-6 col-lg-3 mb-4"
            style={{ display: "flex", flexDirection: "column" }}
          > 
            {/* <div className="card shadow-none bg-soft-primary">
              <div className="card-body">
                <div className="card-title text-primary fs-16 fw-600">
                  Category wise product count
                </div>
                <hr />
                <ul className="list-group"></ul>
              </div>
            </div> */}
            <div className="card shadow-none bg-soft-primary mb-0">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-16 text-white">Total Views</span>
                    </p>
                    <h3 className="mb-0 text-primary fs-30 mt-1">{user?.store?.views || 0}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 mb-4">
            <div className="card h-450px mb-0 h-100">
              <div className="card-body">
                <div className="card-title text-primary fs-16 fw-600">
                  Đơn hàng
                  <p className="small text-muted mb-0">
                    <span className="fs-12 fw-600">This Month</span>
                  </p>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-auto text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                    >
                      <g
                        id="Group_23742"
                        data-name="Group 23742"
                        transform="translate(2044 3467)"
                      >
                        <rect
                          id="Rectangle_17194"
                          data-name="Rectangle 17194"
                          width={30}
                          height={30}
                          transform="translate(-2044 -3467)"
                          fill="none"
                        />
                        <g
                          id="Group_23741"
                          data-name="Group 23741"
                          transform="translate(310 759)"
                        >
                          <path
                            id="Path_26908"
                            data-name="Path 26908"
                            d="M4.355,30a12.083,12.083,0,0,1-1.6-.517A4.905,4.905,0,0,1,.029,24.5c.146-1.377.228-2.761.339-4.142Q.532,18.313.7,16.271c.106-1.332.206-2.665.316-4,.129-1.555.227-3.114.413-4.662a2,2,0,0,1,2-1.687c.782-.012,1.565,0,2.348,0h.336A5.77,5.77,0,0,1,8.275,1.3,5.615,5.615,0,0,1,12.367.018a5.841,5.841,0,0,1,5.38,5.9h.278c.753,0,1.507,0,2.26,0A2.116,2.116,0,0,1,22.5,7.986c.165,2.091.343,4.181.509,6.272s.322,4.183.488,6.273c.107,1.352.222,2.7.335,4.054a4.9,4.9,0,0,1-4.195,5.362A.61.61,0,0,0,19.5,30ZM6.118,7.678c-.893,0-1.743-.005-2.593,0-.282,0-.383.141-.407.463q-.151,1.97-.307,3.939Q2.559,15.2,2.3,18.325c-.156,1.935-.319,3.869-.455,5.806a6.248,6.248,0,0,0,.028,1.685,3.078,3.078,0,0,0,3.166,2.427q6.882,0,13.764,0c.088,0,.176,0,.264-.006a3.145,3.145,0,0,0,2.986-3.544c-.117-1.076-.177-2.158-.262-3.238-.105-1.342-.208-2.684-.315-4.026-.128-1.6-.261-3.209-.389-4.813q-.181-2.275-.357-4.551a.36.36,0,0,0-.365-.381c-.868-.009-1.735,0-2.63,0,0,.123,0,.218,0,.313,0,.615.006,1.23,0,1.845a.878.878,0,1,1-1.755-.006c-.006-.71,0-1.419,0-2.134h-8.1c0,.693,0,1.365,0,2.038a1.312,1.312,0,0,1-.034.347A.877.877,0,0,1,6.12,9.847c-.008-.711,0-1.422,0-2.168M7.894,5.9h8.069a4.036,4.036,0,1,0-8.069,0"
                            transform="translate(-2351 -4226)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_26909"
                            data-name="Path 26909"
                            d="M156.63,290.4H153.2v-3.431a.872.872,0,1,0-1.744,0V290.4h-3.431a.872.872,0,1,0,0,1.744h3.431v3.431a.872.872,0,0,0,1.744,0v-3.431h3.431a.872.872,0,0,0,0-1.744"
                            transform="translate(-2491.298 -4498.774)"
                            fill="#0277bd"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-13 text-primary fw-600">
                        đơn hàng mới
                      </span>
                    </p>
                    <h3 className="mb-0 text-white">{result?.countOrderNEW}</h3>
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-auto text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                    >
                      <defs>
                        <clipPath id="clip-path">
                          <rect
                            id="Rectangle_17198"
                            data-name="Rectangle 17198"
                            width={30}
                            height={30}
                            transform="translate(0 0)"
                            fill="none"
                          />
                        </clipPath>
                      </defs>
                      <g
                        id="Group_23751"
                        data-name="Group 23751"
                        transform="translate(0 0.001)"
                      >
                        <g
                          id="Group_23750"
                          data-name="Group 23750"
                          transform="translate(0 -0.001)"
                          clipPath="url(#clip-path)"
                        >
                          <path
                            id="Path_27505"
                            data-name="Path 27505"
                            d="M13.122,30H7.03A7.041,7.041,0,0,1,0,22.959V7.03A7.041,7.041,0,0,1,7.03,0H22.959A7.041,7.041,0,0,1,30,7.03v5.857a1.172,1.172,0,1,1-2.343,0V7.03a4.691,4.691,0,0,0-4.7-4.687H7.03A4.691,4.691,0,0,0,2.343,7.03V22.959A4.691,4.691,0,0,0,7.03,27.646h6.092a1.177,1.177,0,0,1,0,2.354"
                            transform="translate(0 0)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_27506"
                            data-name="Path 27506"
                            d="M193.376,91.163a1.171,1.171,0,0,0-1.171-1.171h-5.969a1.172,1.172,0,1,0,0,2.343h5.969a1.171,1.171,0,0,0,1.171-1.171v0"
                            transform="translate(-174.22 -84.719)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_27507"
                            data-name="Path 27507"
                            d="M249.953,242.05a7.909,7.909,0,1,0,7.916,7.9,7.909,7.909,0,0,0-7.916-7.9m.008,13.467a5.563,5.563,0,1,1,5.558-5.566h.008a5.566,5.566,0,0,1-5.566,5.566"
                            transform="translate(-227.869 -227.867)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_27508"
                            data-name="Path 27508"
                            d="M331.615,329.84l.929-.929a1.172,1.172,0,0,0-1.658-1.656l-.929.929-.929-.929a1.172,1.172,0,0,0-1.658,1.656l.929.929-.929.929a1.172,1.172,0,1,0,1.658,1.656l.929-.929.929.929a1.172,1.172,0,1,0,1.658-1.656Z"
                            transform="translate(-307.867 -307.756)"
                            fill="#0277bd"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-13 text-primary fw-600">
                        Cancelled
                      </span>
                    </p>
                    <h3 className="mb-0 text-white">0</h3>
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-auto text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                    >
                      <g
                        id="Group_23745"
                        data-name="Group 23745"
                        transform="translate(1901 3455)"
                      >
                        <rect
                          id="Rectangle_17195"
                          data-name="Rectangle 17195"
                          width={30}
                          height={30}
                          transform="translate(-1901 -3455)"
                          fill="none"
                        />
                        <g
                          id="Group_23744"
                          data-name="Group 23744"
                          transform="translate(-867.487 654.098)"
                        >
                          <path
                            id="Path_26911"
                            data-name="Path 26911"
                            d="M1352.884,172.262h-4.464a.88.88,0,1,0,0,1.761h4.464a.88.88,0,1,0,0-1.761"
                            transform="translate(-2379.291 -4277.175)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_26912"
                            data-name="Path 26912"
                            d="M1352.884,292.455h-4.464a.88.88,0,1,0,0,1.761h4.464a.88.88,0,1,0,0-1.761"
                            transform="translate(-2379.291 -4390.326)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_26913"
                            data-name="Path 26913"
                            d="M1322.832,232.366h-4.464a.88.88,0,1,0,0,1.761h4.464a.88.88,0,0,0,0-1.761"
                            transform="translate(-2351 -4333.757)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_26914"
                            data-name="Path 26914"
                            d="M1531.056,222.736h-5.341v-3.52a1.763,1.763,0,0,0-3-1.244l-7.04,7.04a1.76,1.76,0,0,0,0,2.489h0l4.035,4.035-4.918,4.918a1.761,1.761,0,0,0,2.49,2.49l6.162-6.163a1.76,1.76,0,0,0,0-2.489h0l-4.035-4.035,2.792-2.792v1.03a1.761,1.761,0,0,0,1.761,1.761h7.1a1.761,1.761,0,0,0,0-3.52Z"
                            transform="translate(-2536.278 -4319.726)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_26915"
                            data-name="Path 26915"
                            d="M1475.968,150.029a1.761,1.761,0,0,0-2.222.22l-4.842,4.842a1.761,1.761,0,0,0,2.441,2.538l.049-.049,3.821-3.821,1.288.927,1.717-1.717a3.5,3.5,0,0,1,1-.687Z"
                            transform="translate(-2493.036 -4255.966)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_26916"
                            data-name="Path 26916"
                            d="M1344.676,384.535a3.489,3.489,0,0,1-.9-1.589l-9.3,9.3a1.761,1.761,0,0,0,2.49,2.49l8.955-8.954Z"
                            transform="translate(-2366.531 -4475.515)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_26917"
                            data-name="Path 26917"
                            d="M1690.437,117.9a2.5,2.5,0,1,1-2.5,2.5,2.5,2.5,0,0,1,2.5-2.5"
                            transform="translate(-2699.74 -4226)"
                            fill="#0277bd"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-13 text-primary fw-600">
                        Trên đường
                      </span>
                    </p>
                    <h3 className="mb-0 text-white">
                      {result?.countOrderOnTheWay}
                    </h3>
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-auto text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                    >
                      <g
                        id="Group_23747"
                        data-name="Group 23747"
                        transform="translate(1894 3457)"
                      >
                        <rect
                          id="Rectangle_17196"
                          data-name="Rectangle 17196"
                          width={30}
                          height={30}
                          transform="translate(-1894 -3457)"
                          fill="none"
                        />
                        <g
                          id="Group_23746"
                          data-name="Group 23746"
                          transform="translate(-1599.983 686.845)"
                        >
                          <path
                            id="Path_26918"
                            data-name="Path 26918"
                            d="M2077.33,84.3v.4q0,3.482,0,6.963a1.069,1.069,0,0,1-.7,1.137,1.082,1.082,0,0,1-1.236-.336c-.411-.424-.836-.834-1.273-1.268-.4.4-.806.792-1.206,1.191a1.126,1.126,0,0,1-1.887-.009c-.392-.393-.791-.78-1.208-1.192-.46.464-.9.934-1.371,1.375a1.071,1.071,0,0,1-1.789-.482,1.63,1.63,0,0,1-.036-.43q0-3.465,0-6.93V84.3h-.363q-2.409,0-4.819,0a2.166,2.166,0,0,0-2.317,2.325q0,10.529,0,21.058a2.17,2.17,0,0,0,2.343,2.333q4.183,0,8.366,0a1.07,1.07,0,0,1,.3,2.1,1.345,1.345,0,0,1-.363.038c-2.867,0-5.734.008-8.6,0a4.261,4.261,0,0,1-4.181-4.194q-.008-10.8,0-21.593a4.254,4.254,0,0,1,4.2-4.2q10.792-.007,21.584,0a4.259,4.259,0,0,1,4.192,4.182c.008,2.868,0,5.736,0,8.6a1.071,1.071,0,1,1-2.138,0q0-4.134,0-8.269a2.177,2.177,0,0,0-2.365-2.378h-5.133m-2.163,4.811V84.324h-6.387v4.842c.063-.051.1-.074.125-.1.709-.676,1.2-.671,1.884.017.392.392.789.78,1.194,1.179.459-.458.909-.9,1.357-1.353a.991.991,0,0,1,1.1-.271,3.98,3.98,0,0,1,.726.472"
                            transform="translate(-2351 -4226)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_26919"
                            data-name="Path 26919"
                            d="M2276.429,310.26a8.566,8.566,0,1,1,8.554,8.574,8.552,8.552,0,0,1-8.554-8.574m14.992,0a6.426,6.426,0,1,0-6.388,6.431,6.451,6.451,0,0,0,6.388-6.431"
                            transform="translate(-2557.593 -4432.681)"
                            fill="#0277bd"
                          />
                          <path
                            id="Path_26920"
                            data-name="Path 26920"
                            d="M2352.663,396.855c.43-.437.848-.866,1.271-1.292q1.072-1.08,2.148-2.155a1.083,1.083,0,1,1,1.531,1.519q-2.064,2.073-4.137,4.139a1.071,1.071,0,0,1-1.672,0q-1-.99-1.986-1.986a1.085,1.085,0,1,1,1.538-1.513l1.305,1.29"
                            transform="translate(-2626.31 -4518.65)"
                            fill="#0277bd"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="col">
                    <p className="small text-muted mb-0">
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-13 text-primary fw-600">
                        Đã giao hàng
                      </span>
                    </p>
                    <h3 className="mb-0 text-white">
                      {result?.countOrderDelivered}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h6 className="mb-0">Gói đã mua</h6>
                </div>
                <div className="d-flex">
                  <div>
                    <img
                      src={user?.package?.img}
                      className="img-fluid mb-4 w-64px"
                    />
                  </div>
                  <div className="ml-3">
                    <a className="fw-600 mb-3 text-primary">Gói hiện tại:</a>
                    <h6 className="text-primary">
                      {user?.package?.name}
                    </h6>
                    <p className="mb-1 text-muted">
                      Product Upload Limit: {user?.package?.limit} lần
                    </p>
                    <p className="text-muted mb-4">
                      Gói hết hạn lúc:{" "}
                      {new Date(new Date(user?.package?.createdAt).getTime() +
                        1000 * 60 * 60 * 24 * 30 * 12).toLocaleString()}
                    </p>
                    <div className="">
                      <Link
                     to={'/dashboard-seller/seller-packages'}
                        className="btn btn-soft-primary"
                      >
                        Gói nâng cấp
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
       
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3">
            <Link
              to="/dashboard-seller/withdraw"
              className="card mb-4 p-4 text-center bg-soft-primary h-180px"
            >
              <div className="fs-16 fw-600 text-primary">Rút tiền</div>
              <div className="m-3">
                <svg
                  id="Group_22725"
                  data-name="Group 22725"
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 48 48"
                >
                  <path
                    id="Path_108"
                    d="M24,28.5A1.538,1.538,0,0,1,25.5,30v6a1.5,1.5,0,0,1-3,0V30A1.538,1.538,0,0,1,24,28.5"
                    fill="#0277bd"
                  />
                  <path
                    id="Path_109"
                    d="M36,21H33V43.5A1.538,1.538,0,0,1,31.5,45h-15A1.538,1.538,0,0,1,15,43.5V21H12V43.5A4.481,4.481,0,0,0,16.5,48h15A4.481,4.481,0,0,0,36,43.5Z"
                    fill="#0277bd"
                  />
                  <path
                    id="Path_110"
                    d="M43.5,0H4.5A4.481,4.481,0,0,0,0,4.5v9A4.481,4.481,0,0,0,4.5,18h39A4.481,4.481,0,0,0,48,13.5v-9A4.481,4.481,0,0,0,43.5,0M45,13.5A1.538,1.538,0,0,1,43.5,15H4.5A1.538,1.538,0,0,1,3,13.5v-9A1.538,1.538,0,0,1,4.5,3h39A1.538,1.538,0,0,1,45,4.5Z"
                    fill="#0277bd"
                  />
                  <path
                    id="Path_111"
                    d="M28.5,21h-9a4.5,4.5,0,0,0,9,0"
                    fill="#0277bd"
                  />
                </svg>
              </div>
            </Link>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <Link
              to="/dashboard-seller/store-house"
              className="card mb-4 p-4 text-center h-180px"
            >
              <div className="fs-16 fw-600 text-primary">Thêm sản phẩm mới</div>
              <div className="m-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  viewBox="0 0 48 48"
                >
                  <g
                    id="Group_22724"
                    data-name="Group 22724"
                    transform="translate(-1284 -875)"
                  >
                    <rect
                      id="Rectangle_17080"
                      data-name="Rectangle 17080"
                      width={2}
                      height={48}
                      rx={1}
                      transform="translate(1307 875)"
                      fill="#0277bd"
                    />
                    <rect
                      id="Rectangle_17081"
                      data-name="Rectangle 17081"
                      width={2}
                      height={48}
                      rx={1}
                      transform="translate(1332 898) rotate(90)"
                      fill="#0277bd"
                    />
                  </g>
                </svg>
              </div>
            </Link>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <div className="card mb-4 p-4 text-center bg-soft-primary">
              <div className="fs-16 fw-600 text-primary">Cài đặt cửa hàng</div>
              <div className=" m-3">
                <svg
                  id="Group_31"
                  data-name="Group 31"
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 32 32"
                >
                  <path
                    id="Path_78"
                    data-name="Path 78"
                    d="M2,25.723a1,1,0,0,0,.629.928L16,32l3.361-1.344a.5.5,0,0,0-.186-.965.491.491,0,0,0-.185.036L16,30.923l-13-5.2v-11.6a4.428,4.428,0,0,1-1-.2Z"
                    fill="#0277bd"
                  />
                  <path
                    id="Path_79"
                    data-name="Path 79"
                    d="M19.681,24.189a.5.5,0,0,0-.5-.5.493.493,0,0,0-.186.036l-3,1.2L7.432,21.5a.5.5,0,0,0-.65.278.512.512,0,0,0-.035.186.5.5,0,0,0,.314.464L16,26l3.367-1.347a.5.5,0,0,0,.314-.464"
                    fill="#0277bd"
                  />
                  <path
                    id="Path_80"
                    data-name="Path 80"
                    d="M31.5,25.126h-.087a1.368,1.368,0,0,1-.967-2.336l.061-.061a.5.5,0,0,0,0-.707l-.265-.265-.264-.264a.5.5,0,0,0-.707,0l-.061.06a1.368,1.368,0,0,1-2.336-.967V20.5a.5.5,0,0,0-.5-.5h-.748a.5.5,0,0,0-.5.5v.086a1.368,1.368,0,0,1-2.336.967l-.061-.06a.5.5,0,0,0-.707,0l-.265.264-.265.265a.5.5,0,0,0,0,.707l.061.061a1.368,1.368,0,0,1-.967,2.336H20.5a.5.5,0,0,0-.5.5v.748a.5.5,0,0,0,.5.5h.086a1.368,1.368,0,0,1,.967,2.336l-.061.061a.5.5,0,0,0,0,.707l.265.264.265.265a.5.5,0,0,0,.707,0l.061-.061a1.368,1.368,0,0,1,2.336.968V31.5a.5.5,0,0,0,.5.5h.748a.5.5,0,0,0,.5-.5v-.086a1.368,1.368,0,0,1,2.336-.968l.061.061a.5.5,0,0,0,.707,0l.264-.265.265-.264a.5.5,0,0,0,0-.707l-.061-.061a1.368,1.368,0,0,1,.967-2.336H31.5a.5.5,0,0,0,.5-.5v-.748a.5.5,0,0,0-.5-.5M29.171,29a2.373,2.373,0,0,0,.118.285,2.368,2.368,0,0,0-3.171,1.078,2.22,2.22,0,0,0-.118.285,2.369,2.369,0,0,0-3-1.481,2.516,2.516,0,0,0-.285.118A2.367,2.367,0,0,0,21.348,26a2.369,2.369,0,0,0,1.48-3,2.344,2.344,0,0,0-.118-.285,2.37,2.37,0,0,0,3.172-1.077A2.516,2.516,0,0,0,26,21.348a2.367,2.367,0,0,0,3,1.48,2.28,2.28,0,0,0,.285-.118,2.37,2.37,0,0,0,1.077,3.172,2.457,2.457,0,0,0,.286.118,2.367,2.367,0,0,0-1.481,3"
                    fill="#0277bd"
                  />
                  <path
                    id="Path_81"
                    data-name="Path 81"
                    d="M27.5,26A1.5,1.5,0,1,0,26,27.5,1.5,1.5,0,0,0,27.5,26"
                    fill="#0277bd"
                  />
                  <path
                    id="Path_82"
                    data-name="Path 82"
                    d="M16,0A46.43,46.43,0,0,1,0,8.4v2a3.451,3.451,0,0,0,5.333,2.133,3.452,3.452,0,0,0,5.333,2.134A3.453,3.453,0,0,0,16,16.8a3.451,3.451,0,0,0,5.333-2.133,3.451,3.451,0,0,0,5.333-2.134A3.454,3.454,0,0,0,32,10.4v-2A46.421,46.421,0,0,1,16,0M31.021,10.194a2.452,2.452,0,0,1-3.788,1.515,1,1,0,0,0-1.545.618A2.453,2.453,0,0,1,21.9,13.843a1,1,0,0,0-1.545.618A2.451,2.451,0,0,1,16,15.434a2.452,2.452,0,0,1-4.355-.973,1,1,0,0,0-1.545-.618,2.454,2.454,0,0,1-3.789-1.516,1,1,0,0,0-1.184-.772,1.015,1.015,0,0,0-.361.154A2.451,2.451,0,0,1,.978,10.194V9.148A47.458,47.458,0,0,0,16,1.277,47.442,47.442,0,0,0,31.021,9.148Z"
                    fill="#0277bd"
                  />
                </svg>
              </div>
              <Link
                to={
                  user?.store?.isVerify === "NO_KYC"
                    ? "/dashboard-seller/apply_for_verification"
                    : "/dashboard-seller/setting-store"
                }
                className="btn btn-primary"
              >
                Đi tới cài đặt
              </Link>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
            <div className="card mb-4 p-4 text-center bg-soft-primary">
              <div className="fs-16 fw-600 text-primary">
                Cài đặt thanh toán
              </div>
              <div className=" m-3">
                <svg
                  id="Group_30"
                  data-name="Group 30"
                  xmlns="http://www.w3.org/2000/svg"
                  width="31.999"
                  height={32}
                  viewBox="0 0 31.999 32"
                >
                  <path
                    id="Path_83"
                    data-name="Path 83"
                    d="M96.2,30.593a.5.5,0,0,1,.314-.464L103.6,27.3a.484.484,0,0,1,.185-.036.5.5,0,0,1,.185.965l-7.087,2.831a.5.5,0,0,1-.686-.464"
                    transform="translate(-92.946 -10)"
                    fill="#0277bd"
                  />
                  <path
                    id="Path_84"
                    data-name="Path 84"
                    d="M96.2,33.537a.5.5,0,0,1,.314-.464l4.615-1.844a.493.493,0,0,1,.186-.036.5.5,0,0,1,.186.964L96.887,34a.5.5,0,0,1-.686-.464"
                    transform="translate(-92.946 -10)"
                    fill="#0277bd"
                  />
                  <path
                    id="Path_85"
                    data-name="Path 85"
                    d="M117.171,10a2.017,2.017,0,0,0-.744.143L94.205,19.021a2,2,0,0,0-1.259,1.857V40a2,2,0,0,0,2.746,1.857l15.795-6.31a.5.5,0,1,0-.372-.929L95.32,40.928a.985.985,0,0,1-.372.072,1,1,0,0,1-1-1V28.7l24.225-9.679v8.306a.5.5,0,0,0,1,0V12a2,2,0,0,0-2-2m1,5.82L93.947,25.5v-4.62a1,1,0,0,1,.63-.928L116.8,11.071a1,1,0,0,1,1.373.929Z"
                    transform="translate(-92.946 -10)"
                    fill="#0277bd"
                  />
                  <path
                    id="Path_86"
                    data-name="Path 86"
                    d="M123.686,32.181,115.1,28.752a4.007,4.007,0,0,0-7.193-1.8l2.671,1.067a1,1,0,1,1-.744,1.857l-2.671-1.067a4.005,4.005,0,0,0,6.449,3.654L122.2,35.9a2,2,0,1,0,1.487-3.714m.186,2.228a1,1,0,0,1-1.3.557L113.4,31.3a3.006,3.006,0,0,1-5.08-.952l1.149.459a2,2,0,1,0,1.488-3.714l-1.149-.459a3,3,0,0,1,4.336,2.809l9.173,3.665a1,1,0,0,1,.558,1.3"
                    transform="translate(-92.946 -10)"
                    fill="#0277bd"
                  />
                </svg>
              </div>
              <Link
                to={
                  user?.store?.isVerify === "NO_KYC"
                    ? "/dashboard-seller/apply_for_verification"
                    : "/dashboard-seller/setting-store"
                }
                className="btn btn-primary"
              >
                Định cấu hình ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashBoard;

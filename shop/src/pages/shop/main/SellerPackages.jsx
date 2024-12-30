/* eslint-disable jsx-a11y/alt-text */
import { Spin, message } from "antd";
import requestService from "api/request";
import React, { useEffect, useState } from "react";

const SellerPackages = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const buyPak = async (packageID) => {
    setLoading(true);
    try {
      const res = await requestService.post("/profile/buyPack", {
        data: {
          packageID,
        },
      });
      if (res && res?.data) {
        message.success("Đã mua gói thành công");
        setTimeout(() => {
          window.location.reload();
        }, [1000]);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
    setLoading(false);
  };
  const getData = async () => {
    try {
      const res = await requestService.get("/profile/packages");
      if (res && res.data) {
        setdata(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="px-15px px-lg-25px">
      <Spin fullscreen spinning={loading} />
      <section className="py-8 bg-soft-primary">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 mx-auto text-center">
              <h1 className="mb-0 fw-700">Gói cao cấp dành cho người bán</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="py-4 py-lg-5">
        <div className="container">
          <div className="row row-cols-xxl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 gutters-10 justify-content-center">
            {data?.map((item) => (
              <div className="col">
                <div className="card overflow-hidden">
                  <div className="card-body">
                    <div className="text-center mb-4 mt-3">
                      <img
                        className="mw-100 mx-auto mb-4"
                        src={item?.img}
                        height={78}
                      />
                      <h5 className="mb-3 h5 fw-600">{item?.name}</h5>
                    </div>
                    <ul className="list-group list-group-raw fs-15 mb-5">
                      <li className="list-group-item py-2">
                        <i className="fa-solid fa-check mr-2 text-success"></i>
                        {item?.limit} Product Upload Limit
                      </li>
                      {/* <li className="list-group-item py-2">
                        <i className="fa-solid fa-check mr-2 text-success"></i>
                        Max profit {item?.profit}%
                      </li> */}
                    </ul>
                    <div className="mb-5 d-flex align-items-center justify-content-center">
                      <span className="display-4 fw-600 lh-1 mb-0">
                        {item?.price === 0
                          ? "Free"
                          : item?.price?.toLocaleString() + "$"}
                      </span>
                      <span className="text-secondary border-left ml-2 pl-2">
                        {item?.time}
                        <br />
                        tháng
                      </span>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-primary fw-600"
                        onClick={() => {
                          if (item?.price === 0)
                            return message.warning(
                              "Gói miễn phí đã được sử dụng"
                            );
                          buyPak(item?._id);
                        }}
                      >
                        {item?.price === 0 ? "Gói miễn phí" : "Mua gói"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="col">
              <div className="card overflow-hidden">
                <div className="card-body">
                  <div className="text-center mb-4 mt-3">
                    <img
                      className="mw-100 mx-auto mb-4"
                      src="https://amazon-selling.vip/public/uploads/all/Mpla0SMHQpBhf16s2HroAK3QMzAHI38vUUoUNR7B.jpg"
                      height={78}
                    />
                    <h5 className="mb-3 h5 fw-600">Silver Shop</h5>
                  </div>
                  <ul className="list-group list-group-raw fs-15 mb-5">
                    <li className="list-group-item py-2">
                      <i className="fas fa-check text-success mr-2" />
                      200 Product Upload Limit
                    </li>
                    <li className="list-group-item py-2">
                      <i className="fas fa-check text-success mr-2" />
                      Max profit 20%
                    </li>
                  </ul>
                  <div className="mb-5 d-flex align-items-center justify-content-center">
                    <span className="display-4 fw-600 lh-1 mb-0">Free</span>
                    <span className="text-secondary border-left ml-2 pl-2">
                      360
                      <br />
                      ngày
                    </span>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary fw-600">
                      Gói miễn phí
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card overflow-hidden">
                <div className="card-body">
                  <div className="text-center mb-4 mt-3">
                    <img
                      className="mw-100 mx-auto mb-4"
                      src="https://amazon-selling.vip/public/uploads/all/CzinjT52ApXYUYOo4ItfrmprRQEBYOUbce7fPgPn.jpg"
                      height={78}
                    />
                    <h5 className="mb-3 h5 fw-600">Golden Shop</h5>
                  </div>
                  <ul className="list-group list-group-raw fs-15 mb-5">
                    <li className="list-group-item py-2">
                      <i className="fas fa-check text-success mr-2" />
                      500 Product Upload Limit
                    </li>
                    <li className="list-group-item py-2">
                      <i className="fas fa-check text-success mr-2" />
                      Max profit 30%
                    </li>
                  </ul>
                  <div className="mb-5 d-flex align-items-center justify-content-center">
                    <span className="display-4 fw-600 lh-1 mb-0">$599.00</span>
                    <span className="text-secondary border-left ml-2 pl-2">
                      360
                      <br />
                      ngày
                    </span>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary fw-600">Mua gói</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card overflow-hidden">
                <div className="card-body">
                  <div className="text-center mb-4 mt-3">
                    <img
                      className="mw-100 mx-auto mb-4"
                      src="https://amazon-selling.vip/public/uploads/all/FHeuXPXl5qTIAhPLzhcN6c357WFOSyD2CRjhuuRq.png"
                      height={78}
                    />
                    <h5 className="mb-3 h5 fw-600">Platinum Shop</h5>
                  </div>
                  <ul className="list-group list-group-raw fs-15 mb-5">
                    <li className="list-group-item py-2">
                      <i className="fas fa-check text-success mr-2" />
                      1000 Product Upload Limit
                    </li>
                    <li className="list-group-item py-2">
                      <i className="fas fa-check text-success mr-2" />
                      Max profit 40%
                    </li>
                  </ul>
                  <div className="mb-5 d-flex align-items-center justify-content-center">
                    <span className="display-4 fw-600 lh-1 mb-0">
                      $1,999.00
                    </span>
                    <span className="text-secondary border-left ml-2 pl-2">
                      360
                      <br />
                      ngày
                    </span>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary fw-600">Mua gói</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card overflow-hidden">
                <div className="card-body">
                  <div className="text-center mb-4 mt-3">
                    <img
                      className="mw-100 mx-auto mb-4"
                      src="https://amazon-selling.vip/public/uploads/all/pVWEhgAAaULD5fZpdtYKlB3A0JgGkfAZTEw9MOAh.png"
                      height={78}
                    />
                    <h5 className="mb-3 h5 fw-600">Diamond Shop</h5>
                  </div>
                  <ul className="list-group list-group-raw fs-15 mb-5">
                    <li className="list-group-item py-2">
                      <i className="fas fa-check text-success mr-2" />
                      1500 Product Upload Limit
                    </li>
                    <li className="list-group-item py-2">
                      <i className="fas fa-check text-success mr-2" />
                      Max profit 50%
                    </li>
                  </ul>
                  <div className="mb-5 d-flex align-items-center justify-content-center">
                    <span className="display-4 fw-600 lh-1 mb-0">
                      $3,999.00
                    </span>
                    <span className="text-secondary border-left ml-2 pl-2">
                      360
                      <br />
                      ngày
                    </span>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary fw-600">Mua gói</button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerPackages;

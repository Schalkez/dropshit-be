import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-white py-3 footer-widget">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-4">
            <div className="text-md-left mt-4">
              <h4 className="text-center fs-13 text-uppercase fw-600 border-bottom border-gray-900 pb-2 mb-4">
                Quick Links
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    className="opacity-50 hov-opacity-100 text-reset"
                    href="#terms"
                  >
                    Điều Khoản Và Điều Kiện
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="opacity-50 hov-opacity-100 text-reset"
                    href="#return-policy"
                  >
                    Chính sách hoàn trả
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="opacity-50 hov-opacity-100 text-reset"
                    href="#support-policy"
                  >
                    Chính sách hỗ trợ
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="opacity-50 hov-opacity-100 text-reset"
                    href="#privacy-policy"
                  >
                    Chính sách bảo mật
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 ml-xl-auto col-md-4 mr-0">
            <div className="text-md-left mt-4">
              <h4 className="text-center fs-13 text-uppercase fw-600 border-bottom border-gray-900 pb-2 mb-4">
                Tài Khoản Của Tôi
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    className="opacity-50 hov-opacity-100 text-reset"
                    href="#users/login"
                  >
                    Đăng Nhập
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="opacity-50 hov-opacity-100 text-reset"
                    href="#purchase_history"
                  >
                    Lịch Sử Đơn Hàng
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="opacity-50 hov-opacity-100 text-reset"
                    href="#wishlists"
                  >
                    Sản Phẩm Yêu Thích
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="opacity-50 hov-opacity-100 text-reset"
                    href="#track-your-order"
                  >
                    Theo Dõi Đơn Hàng
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="opacity-50 hov-opacity-100 text-reset"
                    href="#affiliate"
                  >
                    Là một đối tác liên kết
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center text-md-left mt-4">
              <h4 className="fs-13 opacity-50 hov-opacity-100 text-reset fw-600 pb-2 mb-1">
                Là Người Bán
              </h4>
              <Link
                to="/shop/create"
                className="btn btn-primary btn-sm shadow-md"
              >
                Đăng Ký Mở Cửa Hàng
              </Link>
            </div>
          </div>
          <div className="col-lg-2 ml-xl-auto col-md-4 mr-0">
            <div className="text-md-left mt-4">
              <h4 className="text-center fs-13 text-uppercase fw-600 border-bottom border-gray-900 pb-2 mb-4">
                Thông Tin Liên Lạc
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="d-block opacity-30">Địa Chỉ:</span>
                  <span className="d-block opacity-70">
                    150 BEACH ROAD#18-01THE GATEWAY WEST
                  </span>
                </li>
                <li className="mb-2">
                  <span className="d-block opacity-30">Điện Thoại:</span>
                  <span className="d-block opacity-70">+6584176486</span>
                </li>
                <li className="mb-2">
                  <span className="d-block opacity-30">E-mail:</span>
                  <span className="d-block opacity-70">
                    <a
                      href="mailto:JD.GL0BAL@hotmail.com"
                      className="text-reset"
                    >
                      JD.GL0BAL@hotmail.com
                    </a>
                  </span>
                </li>
              </ul>
              <div className="row mb-4 d-none">
                <div className="col-8">
                  <form
                    className="form-inline"
                    method="POST"
                    action="https://wishshop-vn.com/subscribers"
                  >
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="eFwDCnxR91BuKLGsVOFMH4y0RXKojt6hhGCZXo8W"
                    />{" "}
                    <div className="form-group mb-2">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Địa chỉ Emai"
                        name="email"
                        required=""
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Theo Dõi
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-xl-4 text-center d-none text-md-left">
            <div className="mt-4">
              <a href="https://wishshop-vn.com" className="d-block">
                <img
                  className="lazyload"
                  src="https://wishshop-vn.com/assets/img/placeholder-rect.jpg"
                  data-src="/images/logo.png"
                  alt="Amazon Global"
                  height={44}
                />
              </a>
              <div className="my-3"></div>
              <div className="d-inline-block d-md-block mb-4">
                <form
                  className="form-inline"
                  method="POST"
                  action="https://wishshop-vn.com/subscribers"
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="eFwDCnxR91BuKLGsVOFMH4y0RXKojt6hhGCZXo8W"
                  />{" "}
                  <div className="form-group mb-0">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Địa chỉ Emai"
                      name="email"
                      required=""
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Theo Dõi
                  </button>
                </form>
              </div>
              <div className="w-300px mw-100 mx-auto mx-md-0">
                <a
                  href="#apps"
                  target="_blank"
                  className="d-inline-block mr-3 ml-0"
                >
                  <img
                    src="https://wishshop-vn.com/assets/img/play.png"
                    className="mx-100 h-40px"
                  />
                </a>
                <a
                  href="#apps"
                  target="_blank"
                  className="d-inline-block"
                >
                  <img
                    src="https://wishshop-vn.com/assets/img/app.png"
                    className="mx-100 h-40px"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 ml-xl-auto col-md-4 mr-0 d-none d-md-block">
            <div className="text-md-left mt-4">
              <h4 className="text-center fs-13 text-uppercase fw-600 border-bottom border-gray-900 pb-2 mb-4">
                Thanh Toán
              </h4>
              <div className="row">
                <div className="col-4 mb-2">
                  <div className="footer-pay">
                    <img
                      src="https://wishshop-vn.com/assets/img/index/pay1.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-4 mb-2">
                  <div className="footer-pay">
                    <img
                      src="https://wishshop-vn.com/assets/img/index/pay2.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-4 mb-2">
                  <div className="footer-pay">
                    <img
                      src="https://wishshop-vn.com/assets/img/index/pay3.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-4 mb-2">
                  <div className="footer-pay">
                    <img
                      src="https://wishshop-vn.com/assets/img/index/pay4.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-4 mb-2">
                  <div className="footer-pay">
                    <img
                      src="https://wishshop-vn.com/assets/img/index/pay5.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-4 mb-2">
                  <div className="footer-pay">
                    <img
                      src="https://wishshop-vn.com/assets/img/index/pay6.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-4 mb-2">
                  <div className="footer-pay">
                    <img
                      src="https://wishshop-vn.com/assets/img/index/pay7.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-4 mb-2">
                  <div className="footer-pay">
                    <img
                      src="https://wishshop-vn.com/assets/img/index/pay8.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-4 mb-2">
                  <div className="footer-pay">
                    <img
                      src="https://wishshop-vn.com/assets/img/index/pay9.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 ml-xl-auto col-md-4 mr-0" hidden="">
            <div className="text-left mt-4">
              <h4 className="fs-13 text-uppercase fw-600 border-bottom border-gray-900 pb-2 mb-4 text-center">
                FOLLOW US
              </h4>
              <ul className="list-unstyled social colored row">
                <li className="list-item mb-2 col-2 col-md-12">
                  <a href="#" target="_blank" className="facebook float-left">
                    <i className="fa fa-facebook" />
                  </a>{" "}
                  <span className="d-none d-md-block float-left mt-1 ml-1">
                    Facebook
                  </span>
                </li>
                <li className="list-item mb-2 col-2 col-md-12">
                  <a href="#" target="_blank" className="youtube float-left">
                    <i className="lab la-youtube" />{" "}
                  </a>{" "}
                  <span className="d-none d-md-block float-left mt-1 ml-1">
                    Youtube
                  </span>
                </li>
                <li className="list-item mb-2 col-2 col-md-12">
                  <a href="#" target="_blank" className="linkedin float-left">
                    <i className="lab la-weibo" />{" "}
                  </a>{" "}
                  <span className="d-none d-md-block float-left mt-1 ml-1">
                    Weibo
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 ml-xl-auto col-md-4 mr-0">
            <div className="text-center text-md-left mt-4">
              <h4 className="fs-13 text-uppercase fw-600 border-bottom border-gray-900 pb-2 mb-4">
                APP DOWNLOAD
              </h4>
              <ul className="list-unstyled row">
                <li className="mb-2 text-left col-6 col-md-12">
                  <a
                    href="#apps"
                    target="_blank"
                    className="d-inline-block mr-3 ml-0"
                  >
                    <img
                      src="https://wishshop-vn.com/assets/img/play.png"
                      className="mx-100 h-40px"
                    />
                  </a>
                </li>
                <li className="mb-2 text-left col-6 col-md-12">
                  <a
                    href="#apps"
                    target="_blank"
                    className="d-inline-block"
                  >
                    <img
                      src="https://wishshop-vn.com/assets/img/app.png"
                      className="mx-100 h-40px"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

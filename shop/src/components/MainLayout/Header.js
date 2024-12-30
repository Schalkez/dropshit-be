/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "store";

const Header = () => {
  const { cart } = useAppSelector((state) => state.app)
  const [key, setKey] = useState('')
  const [showS, setShowS] = useState(false)
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/search?key=` + key)
  }
  return (
    <header className=" sticky-top  z-1020 border-bottom bg-white shadow-sm">
      <div className="position-relative logo-bar-area z-1">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="col-xl-3 d-flex align-items-center col-auto pl-0 pr-3">
              <Link
                className="d-block py-20px ml-0 mr-3"
                to="/"
              >
                <img
                  src="/images/logo.png"
                  alt="AlibabaVn"
                  className="mw-100 h-30px h-md-40px"
                  height={40}
                />
              </Link>
            </div>
            {
              showS &&

              <div className="flex-grow-1 front-header-search d-flex align-items-center bg-white active">
                <div className="position-relative flex-grow-1">
                  <div
                    className="stop-propagation"
                  >
                    <div className="d-flex position-relative align-items-center">
                      <div
                        className="d-lg-none"
                        data-toggle="class-toggle"
                        data-target=".front-header-search"
                      >
                        <button className="btn px-2" type="button"
                          onClick={() => setShowS(false)}
                        >
                          <i className="fa fa-2x fa-long-arrow-left" />
                        </button>
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="border-lg form-control border-0"
                          id="search"
                          name="keyword"
                          placeholder="Tôi đang tìm mua..."
                          autoComplete="off"

                          value={key}
                          onChange={(e) => setKey(e.target.value)}
                        />
                        <div className="input-group-append ">
                          <button
                            onClick={handleSearch}
                            className="btn btn-primary" type="submit">
                            <i className="fa fa-search fa-flip-horizontal fs-18" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="typed-search-box stop-propagation document-click-d-none d-none position-absolute top-100 w-100 left-0 rounded bg-white shadow-lg"
                    style={{ minHeight: 200 }}
                  >
                    <div className="search-preloader absolute-top-center">
                      <div className="dot-loader">
                        <div />
                        <div />
                        <div />
                      </div>
                    </div>
                    <div className="search-nothing d-none fs-16 p-3 text-center" />
                    <div id="search-content" className="text-left" />
                  </div>
                </div>
              </div>
            }


            <div className="d-lg-none ml-auto mr-0"

            >
              <a
                className="d-block text-reset p-2"
                onClick={() => setShowS(true)}
                href="javascript:void(0);"
                data-toggle="class-toggle"
                data-target=".front-header-search"
              >
                <i className="fas fa-search la-flip-horizontal la-2x" />
              </a>
            </div>
            <div className="flex-grow-1 front-header-search d-flex align-items-center bg-white">
              <div className="position-relative flex-grow-1">
                <div

                  className="stop-propagation"
                >
                  <div className="d-flex position-relative align-items-center">
                    <div
                      className="d-lg-none"
                      data-toggle="class-toggle"
                      data-target=".front-header-search"
                    >
                      <button className="btn px-2" type="button">
                        <i className="fa fa-2x la-long-arrow-left" />
                      </button>
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        className="border-lg form-control border-0"
                        id="search"
                        name="keyword"
                        placeholder="Tôi đang tìm mua..."
                        autoComplete="off"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                      />
                      <div className="input-group-append d-none d-lg-block">
                        <button
                          onClick={handleSearch}
                          className="btn btn-primary" type="submit">
                          <i className="fa fa-search la-flip-horizontal fs-18" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="typed-search-box stop-propagation document-click-d-none d-none position-absolute top-100 w-100 left-0 rounded bg-white shadow-lg"
                  style={{ minHeight: 200 }}
                >
                  <div className="search-preloader absolute-top-center">
                    <div className="dot-loader">
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                  <div className="search-nothing d-none fs-16 p-3 text-center" />
                  <div id="search-content" className="text-left" />
                </div>
              </div>
            </div>
            <div className="d-none d-lg-none ml-3 mr-0">
              <div className="nav-search-box">
                <a href="#" className="nav-box-link">
                  <i className="fa fa-search la-flip-horizontal d-inline-block nav-box-icon" />
                </a>
              </div>
            </div>
            <div className="d-none d-lg-block ml-3 mr-0">
              <div id="compare">
                <a
                  href="#compare"
                  className="d-flex align-items-center text-reset"
                >
                  <i className="fa fa-refresh la-2x opacity-80" />
                  <span className="flex-grow-1 ml-1">
                    <span className="badge badge-primary badge-inline badge-pill">
                      0
                    </span>
                    <span className="nav-box-text d-none d-xl-block opacity-70">
                      Đối chiếu
                    </span>
                  </span>
                </a>{" "}
              </div>
            </div>
            <div className="d-none d-lg-block ml-3 mr-0">
              <div id="wishlist">
                <a
                  href="#wishlists"
                  className="d-flex align-items-center text-reset"
                >
                  <i className="fa fa-heart la-2x opacity-80" />
                  <span className="flex-grow-1 ml-1">
                    <span className="badge badge-primary badge-inline badge-pill">
                      0
                    </span>
                    <span className="nav-box-text d-none d-xl-block opacity-70">
                      Danh sách yêu thích
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <div
              className="d-none d-lg-block align-self-stretch ml-3 mr-0"
              data-hover="dropdown"
            >
              <div className="nav-cart-box dropdown h-100" id="cart_items">
                <a
                  href="javascript:void(0)"
                  className="d-flex align-items-center text-reset h-100"
                  data-toggle="dropdown"
                  data-display="static"
                  onClick={() => navigate('/cart')}
                >
                  <i className="fa fa-shopping-cart la-2x opacity-80" />
                  <span className="flex-grow-1 ml-1">
                    <span className="badge badge-primary badge-inline badge-pill cart-count">
                      0
                    </span>
                    <span className="nav-box-text d-none d-xl-block opacity-70">
                      Giỏ hàng
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg p-0 stop-propagation">
                  <div className="text-center p-3">
                    <i className="las la-frown la-3x opacity-60 mb-3" />
                    <h3 className="h6 fw-700">Giỏ của bạn trống trơn</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-around align-items-center align-items-stretch customer_fix ml-3">
              <div className="aiz-topbar-item">
                <div className="d-flex align-items-center">
                  <a
                    className="btn btn-icon btn-circle btn-light service-icon"
                    href="https://chat.ichatlink.net/widget/standalone.html?eid=9e2f5939a1f1e844be75686056222c03&agentid=5b359181454a5bf9b6d376806bf32fa2&language=vi"
                    target="_blank"
                    title="Customer Service"
                  >
                    <img
                      className="las la-bell fs-24"
                      width={40}
                      height={40}
                      src="https://img1.yeshen.cc/vn-alibaba/Q3/56/Q39Cishm1X63cTfB5x1AnG8JbkG0w6jsNymQwA56.png"
                      onerror="this.onerror=null;this.src='#public/assets/img/al-placeholder.jpg';"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-top border-gray-200 bg-white py-1">
        <div className="container">
          <ul className="list-inline mobile-hor-swipe mb-0 pl-0 text-center">
            <li className="list-inline-item mr-0">
              <Link
                to="/"
                className="fs-14 d-inline-block fw-600 hov-opacity-100 text-reset px-3 py-2 opacity-60"
              >
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  Trang{" "}
                </span>
                <span className="obf-iengVNbgetVN123">Taurean Windler</span>
                <span className="obf-iengVNbgetVN123">Prof. Celia Stokes</span>
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  Chủ
                </span>
              </Link>
            </li>
            <li className="list-inline-item mr-0">
              <Link
                to="/products-filter"
                className="fs-14 d-inline-block fw-600 hov-opacity-100 text-reset px-3 py-2 opacity-60"
              >
                <span className="obf-iengVNbgetVN123">Ms. Chelsea Lueilwitz</span>
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  Giảm gi
                </span>
                <span className="obf-iengVNbgetVN123">Jermain Kreiger</span>
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  á thần{" "}
                </span>
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  tốc
                </span>
                <span className="obf-iengVNbgetVN123">Prof. Alfred Grimes</span>
              </Link>
            </li>
            <li className="list-inline-item mr-0">
              <Link
                to="/products-filter"
                className="fs-14 d-inline-block fw-600 hov-opacity-100 text-reset px-3 py-2 opacity-60"
              >
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  Blog
                </span>
                <span className="obf-iengVNbgetVN123">Mr. Noah Dooley IV</span>
              </Link>
            </li>
            <li className="list-inline-item mr-0">
              <Link
                to="/products-filter"
                className="fs-14 d-inline-block fw-600 hov-opacity-100 text-reset px-3 py-2 opacity-60"
              >
                <span className="obf-iengVNbgetVN123">Miss Ethelyn Murphy</span>
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  Tất cả
                </span>
                <span className="obf-iengVNbgetVN123">Dora Lesch</span>
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  {" "}
                  các t
                </span>
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  hương hiệu
                </span>
                <span className="obf-iengVNbgetVN123">Juston Dickens</span>
                <span className="obf-iengVNbgetVN123">Florencio Labadie</span>
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy" />
              </Link>
            </li>
            <li className="list-inline-item mr-0">
              <Link
                to="/products-filter"
                className="fs-14 d-inline-block fw-600 hov-opacity-100 text-reset px-3 py-2 opacity-60"
              >
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  Tất cả da
                </span>
                <span className="obf-iengVNbgetVN123">Daniela Cronin PhD</span>
                <span className="obf-iengVNbgetVN123">Cleveland Wehner</span>
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  nh mục
                </span>
              </Link>
            </li>
            <li className="list-inline-item mr-0">
              <Link
                to="/products-filter"
                className="fs-14 d-inline-block fw-600 hov-opacity-100 text-reset px-3 py-2 opacity-60"
              >
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  Người b
                </span>
                <span className="obf-iengVNbgetVN123">Retha Howell</span>
                <span className="obf-iengVNbgetVN123">Selina Boehm</span>
                <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                  án
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>

  );
};

export default Header;

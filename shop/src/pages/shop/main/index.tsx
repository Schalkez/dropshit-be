/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { Dropdown, message } from "antd";
import requestService from "api/request";
import useOnClickOutside from "hooks/useClickOutside";
import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { setUser } from "store/app";

const DashBoardSeller = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [isOpenOrderNotPay, setIsOrderNotPay] = useState(true)
  const [orders, setOrders] = useState([])
  const { user } = useAppSelector((state) => state.app) as any;
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const ref = useRef<any>();

  useOnClickOutside(
    ref,
    () => window.innerWidth < 1200 && setIsOpenSidebar(false)
  );
  const handleLogout = async () => {
    try {
      const res = await requestService.delete("/profile/logout");
      localStorage.clear();
      dispatch(setUser(null as any))
      navigate('/')
    } catch (error: any) {
      message.error(error?.response?.data?.message);
      localStorage.clear();
      navigate('/')
    }
  };

  const getOrderNotPayment = async () => {
    try {
      const res = await requestService.get('/profile/getOrderNotPayment')
      if (res && res.data) {
        setOrders(res.data?.data)

      }
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsOpenSidebar(false);
      } else {
        setIsOpenSidebar(true);
      }
    };

    // Gọi handleResize khi cửa sổ được resize
    window.addEventListener("resize", handleResize);

    // Đảm bảo gỡ bỏ event listener khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getOrderNotPayment()
  }, [])
  return (
    <div className="aiz-main-wrapper">

      {/* modal order not payment */}
      {
        (isOpenOrderNotPay && !!orders?.length) &&
        <div
          className="modal fade show"
          id="modal-pending-orders"
          tabIndex={-1}
          role="dialog"
          style={{ zIndex: 1040, paddingRight: 15, display: "block", background: "rgba(0,0,0,.5)" }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Đặt hàng</h5>
                <div data-dismiss="modal" style={{
                  cursor: 'pointer'
                }} onClick={() => setIsOrderNotPay(false)}>
                  <i className="fa fa-2x fa-close" />
                </div>
              </div>
              <div className="modal-body d-flex flex-column" style={{ gap: 15 }}>
                {
                  orders?.map((i: any) => (
                    <div className="row">
                      <div className="col-12">{i?.createdAt?.toLocaleString()}</div>
                      <div className="col-12 fs-14 text-primary flex">
                        <span className="mr-1">Mã đặt hàng:</span>
                        <Link
                          to="/dashboard-seller/order-detail"
                          onClick={() => setIsOrderNotPay(false)}
                          state={i}
                          className="fw-600"
                          title="Chi tiết đơn hàng"
                        >
                          {i?._id}
                        </Link>
                      </div>
                    </div>
                  ))
                }



              </div>
            </div>
          </div>
        </div>
      }


      <div className="aiz-sidebar-wrap">
        <div
          ref={ref}
          className="aiz-sidebar left c-scrollbar"
          style={{
            left: isOpenSidebar ? "0" : "-100%",
          }}
        >
          <Link to={"/"} className="aiz-side-nav-logo-wrap">
            <div className="d-block text-center my-3">
              <img
                className="mw-100 mb-3"
                src="/images/logo.png"
                alt="amazon"
              />
              <h3 className="fs-16  m-0 text-primary">{user?.name}</h3>
              <p className="text-primary">{user?.phone}</p>
            </div>
          </Link>
          <div className="aiz-side-nav-wrap">
            <div className="px-20px mb-3">
              <input
                className="form-control bg-soft-secondary border-0 form-control-sm text-white"
                type="text"
                name=""
                placeholder="Tìm kiếm trong menu"
                id="menu-search"
              />
            </div>
            <ul className="aiz-side-nav-list" id="search-menu"></ul>
            <ul
              className="aiz-side-nav-list metismenu"
              id="main-menu"
              data-toggle="aiz-side-menu"
            >
              <li className="aiz-side-nav-item mm-active">
                <Link
                  to="/dashboard-seller"
                  className="aiz-side-nav-link active flex align-items-center"
                  aria-expanded="true"
                >
                  <i className="fas fa-chart-line mr-1"></i>
                  <span className="aiz-side-nav-text">bảng điều khiển</span>
                </Link>
              </li>
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-seller/products"
                  className="aiz-side-nav-link flex align-items-center"
                >
                  <i className="fas fa-shopping-cart mr-1"></i>
                  <span className="aiz-side-nav-text">Các sản phẩm</span>
                </Link>
              </li>
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-seller/store-house"
                  className="aiz-side-nav-link d-flex align-items-center"
                >
                  <i className="fa-solid fa-store mr-1"></i>
                  <span className="aiz-side-nav-text">Kho sản phẩm</span>
                </Link>
              </li>
              {/*订单*/}
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-seller/orders"
                  className="aiz-side-nav-link d-flex align-items-center"
                >
                  <i className="fa-solid fa-money-bill mr-1"></i>
                  <span className="aiz-side-nav-text">Đơn hàng</span>
                  {/* <span className="badge badge-info">0</span> */}
                </Link>
              </li>
              {/*店铺等级*/}
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-seller/seller-packages"
                  className="aiz-side-nav-link"
                >
                  <i className="fas fa-shopping-cart mr-1"></i>
                  <span className="aiz-side-nav-text">Gói nâng cấp</span>
                </Link>
              </li>
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-seller/message"
                  className="aiz-side-nav-link"
                >
                  <i className="fas fa-shopping-cart mr-1"></i>
                  <span className="aiz-side-nav-text">Tin nhắn</span>
                </Link>
              </li>
              {/*店铺直通车*/}

              {/*三级分销*/}

              {/*财务中心*/}
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-seller/deposit"
                  className="aiz-side-nav-link d-flex align-items-center"
                >
                  <i className="fa-solid fa-money-bill mr-1"></i>
                  <span className="aiz-side-nav-text">Nạp tiền</span>
                </Link>
              </li>
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-seller/withdraw"
                  className="aiz-side-nav-link d-flex align-items-center"
                >
                  <i className="fa-solid fa-money-bill mr-1"></i>
                  <span className="aiz-side-nav-text">Rút tiền</span>
                </Link>
              </li>
              {/*对话*/}

              {/*店铺设置*/}
              {user?.store?.isVerify === "SUCCESS" && (
                <li className="aiz-side-nav-item">
                  <Link
                    to="/dashboard-seller/setting-store"
                    className="aiz-side-nav-link  d-flex align-items-center"
                  >
                    <i className="fa-solid fa-gear mr-1"></i>
                    <span className="aiz-side-nav-text">Cài đặt cửa hàng</span>
                  </Link>
                </li>
              )}

              {/*优惠券*/}

              {/*退款*/}
              {/*上传的文件*/}
            </ul>
            {/* .aiz-side-nav */}
          </div>
          {/* .aiz-side-nav-wrap */}
        </div>
        {/* .aiz-sidebar */}
        <div className="aiz-sidebar-overlay" />
      </div>
      {/* .aiz-sidebar */}
      {/* conversations Modal */}
      <div id="conversations-modal" className="modal fade">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              />
            </div>
            <div className="modal-body text-center">
              <div
                className="px-3 c-scrollbar-light overflow-auto "
                style={{ maxHeight: 300 }}
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="py-4 text-center fs-16">
                      No notification found
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /.modal */}
      <div className="modal fade shop" id="payment_modalsss">
        <div className="modal-dialog">
          <div className="modal-content" id="payment-modal-content">
            <div className="modal-body gry-bg px-3 pt-3">
              <br /> <br />
              <div className="row">
                <div className="col">
                  <div className="alert alert-danger" role="alert">
                    <h6>Bạn nên trả tiền bảo lãnh</h6>
                  </div>
                  <div className="alert alert-danger" role="alert">
                    Tiền bảo lãnh：0.00
                  </div>
                </div>
              </div>
              <div className="form-group text-right">
                <button type="submit" className="btn btn-sm btn-primary">
                  Go To Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aiz-content-wrapper">
        <div className="aiz-topbar px-15px px-lg-25px d-flex align-items-stretch justify-content-between">
          <div className="d-flex w-full d-flex justify-content-center">
            <div
              className="aiz-topbar-nav-toggler d-flex align-items-center justify-content-start mr-2 mr-md-3 ml-0"
              data-toggle="aiz-mobile-nav"
              onClick={() => setIsOpenSidebar(true)}
            >
              <button className="aiz-mobile-toggler">
                <span />
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-stretch ">
            <div className="d-flex justify-content-around align-items-center align-items-stretch">
              <div className="aiz-topbar-item ml-2">
                <div className="align-items-stretch d-flex dropdown">
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-lg py-0">
                    <div className="p-3 bg-light border-bottom">
                      <h6 className="mb-0">Thông báo</h6>
                    </div>
                    <div
                      className="px-3 c-scrollbar-light overflow-auto "
                      style={{ maxHeight: 300 }}
                    >
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <div className="py-4 text-center fs-16">
                            No notification found
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center border-top">
                      <a
                        href="#/seller/all-notification"
                        className="text-reset d-block py-2"
                      >
                        View All Notifications
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                @media  screen and (max-width: 500px) {\n                    .aa {\n                        display: none;\n                    }\n                }\n            ",
                }}
              />
              {/*<div class="aiz-topbar-item ml-2 aa">*/}
              {/*     <a class="dropdown-toggle no-arrow" href="javascript:void(0);" >*/}
              {/*     Tiền bảo lãnh：$0.00</a>*/}
              {/* </div>*/}
              <div className="aiz-topbar-item ml-2">
                <div
                  className="align-items-stretch d-flex dropdown "
                  id="lang-change"
                >
                  <a
                    className="dropdown-toggle no-arrow"
                    data-toggle="dropdown"
                    href="javascript:void(0);"
                    role="button"
                    aria-haspopup="false"
                    aria-expanded="false"
                  >
                    <span className="btn btn-icon">
                      <img
                        src="/images/vn.png"
                        height={11}
                      />
                    </span>{" "}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-xs">
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="en"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/en.png"
                          className="mr-2"
                        />
                        <span className="language">English</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="bd"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/bd.png"
                          className="mr-2"
                        />
                        <span className="language">Bangla</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="sa"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/sa.png"
                          className="mr-2"
                        />
                        <span className="language">Arabic</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="cn"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/cn.png"
                          className="mr-2"
                        />
                        <span className="language">中文</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="hk"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/hk.png"
                          className="mr-2"
                        />
                        <span className="language">繁体中文</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="jp"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/jp.png"
                          className="mr-2"
                        />
                        <span className="language">にほんご</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="kr"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/kr.png"
                          className="mr-2"
                        />
                        <span className="language">한국어</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="in"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/in.png"
                          className="mr-2"
                        />
                        <span className="language">Indonesian</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="vn"
                        className="dropdown-item  active "
                      >
                        <img
                          src="/images/vn.png"
                          className="mr-2"
                        />
                        <span className="language">Vietnamese</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="ms"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/ms.png"
                          className="mr-2"
                        />
                        <span className="language">Malay</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="be"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/be.png"
                          className="mr-2"
                        />
                        <span className="language">Belarusian</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-flag="th"
                        className="dropdown-item "
                      >
                        <img
                          src="https://amazon-selling.vip/public/assets/img/flags/th.png"
                          className="mr-2"
                        />
                        <span className="language">Thai</span>{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="aiz-topbar-item ml-2">
                <div className="align-items-stretch d-flex dropdown">
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "2",
                          label: (
                            <div
                              className="dropdown-item"
                              onClick={() => navigate('/dashboard-seller/apply_for_verification')}
                            >
                              <i className="fas fa-user mr-2" />
                              <span>Hồ sơ</span>
                            </div>
                          ),
                        },
                        {
                          key: "1",
                          label: (
                            <div
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              <i className="fas fa-sign-out-alt mr-2" />
                              <span>Đăng xuất</span>
                            </div>
                          ),
                        },
                      ],
                    }}
                  >
                    <a
                      className="dropdown-toggle no-arrow text-dark"
                      data-toggle="dropdown"
                      href="javascript:void(0);"
                      role="button"
                      aria-haspopup="false"
                      aria-expanded="false"
                    >
                      <span className="d-flex align-items-center">
                        <span className="avatar avatar-sm mr-md-2">
                          <img src={!!user?.store?.logoStore ? user?.store?.logoStore : "/images/avatar-place.png"} />
                        </span>
                        <span className="d-none d-md-block">
                          <span className="d-block fw-500">{user?.name}</span>
                          <span className="d-block small opacity-60">
                            Seller
                          </span>
                        </span>
                      </span>
                    </a>
                  </Dropdown>
                  {/* <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated dropdown-menu-md">
                    <a
                         href="#/seller/profile"
                      className="dropdown-item"
                    >
                      <i className="fas fa-user-circle" /> <span>Hồ sơ</span>{" "}
                    </a>
                    <a
                         href="#/logout"
                      className="dropdown-item"
                    >
                      {" "}
                      <i className="fas fa-sign-out-alt" />
                      <span>Đăng xuất</span>{" "}
                    </a>
                  </div> */}
                </div>
              </div>
              {/* .aiz-topbar-item */}
            </div>
          </div>
        </div>
        {/* .aiz-topbar */}
        <Outlet />

        {/* .aiz-main-content */}
      </div>

      {/* .aiz-content-wrapper */}
    </div>
  );
};

export default DashBoardSeller;

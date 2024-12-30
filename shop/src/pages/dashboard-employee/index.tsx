/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */

import { Dropdown, message } from "antd";
import requestService from "api/request";
import useOnClickOutside from "hooks/useClickOutside";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "store";

const DashboardEmployee = () => {
  const { user } = useAppSelector((state) => state.app) as any;
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const ref = useRef<any>();
  const navigat = useNavigate();
  useOnClickOutside(
    ref,
    () => window.innerWidth < 1200 && setIsOpenSidebar(false)
  );
  useEffect(() => {
    if (!JSON.parse(window.localStorage.getItem("tokens") as any)?.accessToken)
      return navigat("/");
    if (user && user?.roles?.[0]?.code !== "EMPLOYEE") return navigat("/");
  }, [user]);

  const handleLogout = async () => {
    try {
      const res = await requestService.delete("/profile/logout");
      localStorage.clear()
      window.location.reload();
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
  };

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
  return (
    <div className="aiz-main-wrapper">
      <div className="aiz-sidebar-wrap">
        <div
          ref={ref}
          className="aiz-sidebar left c-scrollbar"
          style={{
            left: isOpenSidebar ? "0" : "-100%",
          }}
        >
          <div className="aiz-side-nav-avatar_original-wrap">
            <div className="d-block text-center my-3">
              <img
                className="mw-100 mb-3"
                src="/images/avatar-place.png"
              />
              <h3 className="fs-16  m-0 text-primary">{user?.name}</h3>
              <p className="text-primary">{user?.email}</p>
            </div>
          </div>

          <div className="aiz-side-nav-wrap">
            <ul
              className="aiz-side-nav-list metismenu"
              id="main-menu"
              data-toggle="aiz-side-menu"
            >
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-employee"
                  className="aiz-side-nav-link d-flex align-items-center"
                >
                  <i className="fa-regular fa-user mr-1"></i>
                  <span className="aiz-side-nav-text">Link Giới thiệu</span>
                </Link>
              </li>
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-employee/sales-main"
                  className="aiz-side-nav-link d-flex align-items-center"
                >
                  <i className="fa-regular fa-user mr-1"></i>
                  <span className="aiz-side-nav-text">Người bán</span>
                </Link>
              </li>
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-employee/orders"
                  className="aiz-side-nav-link d-flex align-items-center"
                >
                  <i className="fa-solid fa-shop mr-1"></i>
                  <span className="aiz-side-nav-text">Đơn hàng</span>{" "}
                </Link>
              </li>
              {/* POS Addon*/}
              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-employee/pos"
                  className="aiz-side-nav-link d-flex align-items-center"
                >
                  <i className="fa-solid fa-shop mr-1"></i>
                  <span className="aiz-side-nav-text">Hệ thống POS</span>
                </Link>
                <ul className="aiz-side-nav-list level-2 mm-collapse">
                  <li className="aiz-side-nav-item">
                    <a href="#/salesman/pos" className="aiz-side-nav-link ">
                      <span className="aiz-side-nav-text">Quản lý POS</span>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="aiz-side-nav-item">
                <Link
                  to="/dashboard-employee/customer"
                  className="aiz-side-nav-link d-flex align-items-center"
                >
                  <i className="fa-regular fa-user mr-1"></i>
                  <span className="aiz-side-nav-text">Khách hàng</span>
                </Link>
              </li>
              <li className="aiz-side-nav-item">
                <a
                  href="#/salesman/withdraw_requests_all"
                  className="aiz-side-nav-link d-flex align-items-center"
                >
                  <i className="fa-regular fa-user mr-1"></i>
                  <span className="aiz-side-nav-text">Yêu cầu thanh toán</span>
                </a>
              </li>
            </ul>
            {/* .aiz-side-nav */}
          </div>
          {/* .aiz-side-nav-wrap */}
        </div>
        {/* .aiz-sidebar */}
        <div className="aiz-sidebar-overlay" />
      </div>
      {/* .aiz-sidebar */}
      <div className="aiz-content-wrapper">
        <div className="aiz-topbar px-15px px-lg-25px d-flex align-items-stretch justify-content-between">
          <div className="d-flex justify-content-between">
            <div
              onClick={() => setIsOpenSidebar(true)}
              className="aiz-topbar-nav-toggler d-flex align-items-center justify-content-start mr-2 mr-md-3 ml-0"
              data-toggle="aiz-mobile-nav"
            >
              <button className="aiz-mobile-toggler">
                <span />
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-stretch ">
            {/* <div className="d-flex justify-content-around align-items-center align-items-stretch">
              <div className="d-flex justify-content-around align-items-center align-items-stretch">
                <div className="aiz-topbar-item">
                  <div className="d-flex align-items-center">
                    <a
                      className="btn btn-icon btn-circle btn-light"
                      href="/"
                      target="_blank"
                      title="Duyệt trang web"
                    >
                      <i className="fas fa-globe" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around align-items-center align-items-stretch ml-3">
                <div className="aiz-topbar-item">
                  <div className="d-flex align-items-center">
                    <a
                      className="btn btn-icon btn-circle btn-light"
                      href="/salesman/pos"
                      target="_blank"
                      title="POS"
                    >
                      <i className="fas fa-print" />
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
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
                    </span>
                  </a>
                </div>
              </div>
              <div className="aiz-topbar-item ml-2">
                <Dropdown

                  menu={{
                    items: [
                      {
                        key: "1",
                        label: (
                          <div className="dropdown-item" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt" />
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
                        <img src="/images/avatar-place.png" />
                      </span>
                      <span className="d-none d-md-block">
                        <span className="d-block fw-500">{user?.name}</span>
                        <span className="d-block small opacity-60">
                          salesman
                        </span>
                      </span>
                    </span>
                  </a>
                </Dropdown>

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

export default DashboardEmployee;

import { message } from "antd";
import requestService from "api/request";
import useBreakpoint from "hooks/useBreakpoint";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { setUser } from "store/app";

const DashboardClient = () => {
  const { user } = useAppSelector((state) => state.app);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const breakpoint = useBreakpoint()

  const handleLogout = async () => {
    try {
      const res = await requestService.delete("/profile/logout");
      localStorage.clear();
      dispatch(setUser(null))
      navigate('/')
    } catch (error) {
      message.error(error?.response?.data?.message);
      localStorage.clear();
      navigate('/')
    }
  };
  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex align-items-start flex-wrap">
          {
            breakpoint !== 'mobile' &&
            <div
              className="aiz-user-sidenav-wrap position-relative z-1 shadow-sm"
              style={{ display: "block", minHeight: "100px", height: "100%" }}
            >
              <div
                className="aiz-user-sidenav rounded overflow-auto c-scrollbar-light pb-5 pb-xl-0"
                style={{ position: "relative" }}
              >
                <div className="p-4 text-xl-center mb-4 border-bottom bg-primary text-white position-relative">
                  <span className="avatar avatar-md mb-3">
                    <img
                      src="/images/avatar-place.png"
                      className="image rounded-circle"
                      onerror="this.onerror=null;this.src='https://global-jd.com/assets/img/avatar-place.png';"
                    />
                  </span>
                  <h4 className="h5 fs-16 mb-1 fw-600">{user?.name}</h4>
                  <div className="text-truncate opacity-60">{user?.email}</div>
                </div>

                <div className="sidemnenu mb-3">
                  <ul
                    className="aiz-side-nav-list px-2 metismenu"
                    data-toggle="aiz-side-menu"
                  >
                    <li className="aiz-side-nav-item mm-active">
                      <Link
                        to="/dashboard-client"
                        className="aiz-side-nav-link "
                        aria-expanded="true"
                      >
                        <i className="fas fa-home aiz-side-nav-icon" />
                        <span className="aiz-side-nav-text">Bảng Điều Khiển</span>
                      </Link>
                    </li>
                    <li className="aiz-side-nav-item">
                      <Link
                        to="/dashboard-client/history"
                        className="aiz-side-nav-link "
                      >
                        <i className="fas fa-file-alt aiz-side-nav-icon" />
                        <span className="aiz-side-nav-text">
                          Lịch Sử Thanh Toán
                        </span>
                      </Link>
                    </li>

                    <li className="aiz-side-nav-item">
                      <Link
                        to="/dashboard-client/message"
                        className="aiz-side-nav-link "
                        style={{ alignItems: "center" }}
                      >
                        <i className="fas fa-comment aiz-side-nav-icon" />
                        <span className="aiz-side-nav-text">Cuộc Trò Chuyện</span>
                        <span
                          className="badge badge-danger badge-circle badge-sm badge-dot"
                          id="conversations"
                          style={{ display: "none" }}
                        >
                          {" "}
                        </span>
                      </Link>
                    </li>
                    <li className="aiz-side-nav-item">
                      <Link
                        to="/dashboard-client/wallet"
                        className="aiz-side-nav-link "
                      >
                        <i className="fas fa-dollar-sign aiz-side-nav-icon" />
                        <span className="aiz-side-nav-text">Ví Của Tôi</span>{" "}
                      </Link>
                    </li>
                    <li className="aiz-side-nav-item" onClick={handleLogout}>
                      <a href="#" className="aiz-side-nav-link d-flex align-items-center " >
                        <i className="fas fa-sign-out-alt mr-2" />
                        <span>Đăng xuất</span>
                      </a>
                    </li>
                  </ul>
                </div>


              </div>
            </div>
          }
          <div className="aiz-user-panel">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardClient;

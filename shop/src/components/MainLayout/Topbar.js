/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import { message } from "antd";
import requestService from "api/request";
import useBreakpoint from "hooks/useBreakpoint";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store";

const Topbar = () => {
  const { user } = useAppSelector((state) => state.app);
  const breakpoint = useBreakpoint()
  const handleLogout = async () => {
    try {
      const res = await requestService.delete("/profile/logout");
      localStorage.clear()
      window.location.href = '/'
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };

  const handleRedirect = (role) => {
    if (role === "EMPLOYEE") return "/dashboard-employee";
    if (role === "SELLER") return "/dashboard-seller";
    return "/dashboard-client";
  };
  return (
    <div className="top-navbar border-bottom border-soft-secondary bg-white" style={{
      zIndex: breakpoint === 'mobile' ? 9999 : 1,
      position: 'relative'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col">
            <ul className="list-inline d-flex justify-content-between justify-content-lg-start mb-0">

              {
                !user && breakpoint === 'mobile' &&

                <li className="list-inline-item">
                  <Link
                    to="/shop/create"
                    className="text-reset py-2 opacity-60 ml-3"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Open Shop
                  </Link>
                </li>
              }


            </ul>
          </div>

          <div className="col-5 d-none d-lg-block text-right">
            {user ? (
              <ul className="list-inline mb-0 h-100 d-flex justify-content-end align-items-center">
                <li className="list-inline-item mr-3 border-right border-left-0 pr-3 pl-0">
                  <Link
                    to={handleRedirect(user?.roles?.[0]?.code)}
                    className="text-reset d-inline-block opacity-60 py-2"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="list-inline-item">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                    className="text-reset d-inline-block opacity-60 py-2"
                  >
                    Logout
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="list-inline mb-0 h-100 d-flex justify-content-end align-items-center">
                <li className="list-inline-item mr-3 border-right border-left-0 pr-3 pl-0">
                  <Link
                    style={{ color: "#e62e04 !important" }}
                    to={"/shop/create"}
                    className="text-reset d-inline-block opacity-60 py-2"
                  >
                    Open Shop
                  </Link>
                </li>
                <li className=" list-inline-item mr-3 border-right border-left-0 pr-3 pl-0">
                  <Link
                    to="/login"
                    className="text-reset d-inline-block opacity-60 py-2"
                  >
                    Login
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    to="/register"
                    className="text-reset d-inline-block opacity-60 py-2"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

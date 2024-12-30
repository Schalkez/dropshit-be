import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "store";
import Sidebar from "./Sidebar";
import useBreakpoint from "hooks/useBreakpoint";

const MenuMobile = () => {
  const { cart, user } = useAppSelector((state) => state.app)
  const breakpoint = useBreakpoint()
  const navigate = useNavigate()
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const getnavigate = () => {
    if (!user) return navigate('/login')
    if (user?.roles[0]?.code === 'SELLER') return navigate('/dashboard-seller')
    if (user?.roles[0]?.code === "CUSTOMER") {
      if (breakpoint === 'mobile')
        return setIsOpenSidebar(true)
      return navigate('/dashboard-client')
    }
    return navigate('/dashboard-employee')
  }
  return (
    <>
      <div
        className="aiz-mobile-bottom-nav d-xl-none fixed-bottom bg-white shadow-lg border-top rounded-top"
        style={{ boxShadow: "0px -1px 10px rgb(0 0 0 / 15%)!important" }}
      >
        <div className="row align-items-center gutters-5">
          <div className="col">
            <Link
              to="/"
              className="text-reset d-block text-center pb-2 pt-3"
            >
              <i className="fas fa-home fs-20 opacity-60 " />
              <span className="d-block fs-10 fw-600 opacity-60 ">Trang Chủ</span>
            </Link>
          </div>
          <div className="col">
            <Link
              to="/products-filter"
              className="text-reset d-block text-center pb-2 pt-3"
            >
              <i className="fas fa-list-ul fs-20 opacity-60 " />
              <span className="d-block fs-10 fw-600 opacity-60 ">Thể Loại</span>
            </Link>
          </div>
          <div className="col-auto">
            <Link
              to="/cart"
              className="text-reset d-block text-center pb-2 pt-3"
            >
              <span
                className="align-items-center bg-primary border border-white border-width-4 d-flex justify-content-center position-relative rounded-circle size-50px"
                style={{
                  marginTop: "-33px",
                  boxShadow: "0px -5px 10px rgb(0 0 0 / 15%)",
                  borderColor: "#fff !important",
                }}
              >
                <i className="fas fa-shopping-bag la-2x text-white" />
              </span>
              <span className="d-block mt-1 fs-10 fw-600 opacity-60 ">
                Giỏ Hàng (<span className="cart-count">{cart?.length || 0}</span>)
              </span>
            </Link>
          </div>
          <div className="col">
            <Link
              to="#"
              className="text-reset d-block text-center pb-2 pt-3"
            >
              <span className="d-inline-block position-relative px-2">
                <i className="fas fa-bell fs-20 opacity-60 " />
              </span>
              <span className="d-block fs-10 fw-600 opacity-60 ">Thông Báo</span>
            </Link>
          </div>
          <div className="col">
            <a
              href="javascript:void(0)"
              onClick={() => {
                getnavigate()

              }}
              className="text-reset d-block text-center pb-2 pt-3"
            >
              <span className="d-block mx-auto">
                <img
                  src="/images/avatar-place.png"
                  className="rounded-circle size-20px"
                />
              </span>
              <span className="d-block fs-10 fw-600 opacity-60">Tài Khoản</span>
            </a>
          </div>
        </div>
      </div>
      {
        isOpenSidebar &&
        <Sidebar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
      }

    </>

  );
};

export default MenuMobile;

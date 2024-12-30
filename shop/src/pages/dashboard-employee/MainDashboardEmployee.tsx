import useOnClickOutside from "hooks/useClickOutside";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "store";

const MainDashboardEmployee = () => {
  const { user } = useAppSelector((state) => state.app) as any
  const location = useLocation()

  return (
    <div className="aiz-main-content">
      <div className="px-15px px-lg-25px">
        <div className="row">
          <div style={{ width: "100%" }}>
            <div
              className="card shadow-none mb-4 bg-white py-4"
              style={{ width: "100%" }}
            >
              <div className="card-body" style={{ width: "100%" }}>
                <div
                  className="row align-items-center"
                  style={{ width: "100%" }}
                >
                  <div className="col" style={{ width: "100%" }}>
                    <p
                      className="small text-muted mb-0"
                      style={{ width: "100%" }}
                    >
                      <span className="fe fe-arrow-down fe-12" />
                      <span className="fs-16 text-info">Invitation link</span>
                    </p>
                    <h3
                      className="mt-2 text-primary fs-30"
                      style={{ width: "100%" }}
                    >
                      {window.location.host}{`/shop/create?code=${user?.code}`}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default MainDashboardEmployee;

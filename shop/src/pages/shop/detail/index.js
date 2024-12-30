import { Spin } from "antd";
import requestService from "api/request";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "store";

const ShopDetail = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.app);
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await requestService.get(
        "/auth/getProductsByStore/" + detail?._id
      );
      if (res && res?.data) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const getShop = async () => {
    setLoading(true);
    try {
      const res = await requestService.get("/auth/shop-detail/" + id);
      if (res && res.data) {
        setDetail(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) getShop();
  }, [id]);

  useEffect(() => {
    if (detail) getProducts();
  }, [detail]);
  if (detail?.store?.isVerify === "SUCCESS")
    return (
      <div>
        <Spin fullscreen spinning={loading} />
        <section className="pt-5 mb-4 bg-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="d-flex justify-content-center">
                  <img
                    height={70}
                    className=" ls-is-cached lazyloaded"
                    src={!!detail?.store?.logoStore ? detail?.store?.logoStore : " https://ebays-vn.com/public/assets/img/placeholder.jpg "}
                    data-src=" https://ebays-vn.com/public/assets/img/placeholder.jpg "
                    alt="Phương thức"
                  />
                  <div className="pl-4 text-left">
                    <h1 className="fw-600 h4 mb-0">
                      {detail?.store?.nameStore}
                      <span className="ml-2">
                        <i
                          className="fa fa-check-circle"
                          style={{ color: "green" }}
                        />
                      </span>
                    </h1>
                    <div className="rating rating-sm mb-1">
                      <i
                        className={clsx("fas fa-star ", {
                          active: detail?.store?.stars > 0,
                        })}
                      />
                      <i
                        className={clsx("fas fa-star ", {
                          active: detail?.store?.stars > 1,
                        })}
                      />
                      <i
                        className={clsx("fas fa-star ", {
                          active: detail?.store?.stars > 2,
                        })}
                      />
                      <i
                        className={clsx("fas fa-star ", {
                          active: detail?.store?.stars > 3,
                        })}
                      />
                      <i
                        className={clsx("fas fa-star ", {
                          active: detail?.store?.stars > 4,
                        })}
                      />
                    </div>
                    <div className="location opacity-60">
                      {detail?.store?.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-bottom mt-5" />
          </div>
        </section>
        <section className="mb-4">
          <div className="container">
            <div className="text-center mb-4">
              <h3 className="h3 fw-600 border-bottom">
                <span className="border-bottom border-primary border-width-2 pb-3 d-inline-block">
                  Sản phẩm nổi bật
                </span>
              </h3>
            </div>
            <div className="row">
              <div className="col">
                <div
                  className="aiz-carousel gutters-10 slick-initialized slick-slider"
                  data-items="6"
                  data-xl-items="5"
                  data-lg-items="4"
                  data-md-items="3"
                  data-sm-items="2"
                  data-xs-items="2"
                  data-autoplay="true"
                  data-infinute="true"
                  data-dots="true"
                >
                  <div classname="slick-list draggable">
                    <div
                      classname="slick-track"
                      style={{
                        opacity: 1,
                        width: 0,
                        transform: "translate3d(0px, 0px, 0px)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-4">
          <div className="container">
            <div className="row gutters-5 row-cols-xxl-5 row-cols-lg-4 row-cols-md-3 row-cols-2">
              {!!products.length &&
                products?.map((i) => (
                  <div className="col mb-3" key={i?._id}>
                    <div className="aiz-card-box border border-light rounded hov-shadow-md mt-1 mb-2 has-transition bg-white">
                      <div className="position-relative">
                        <Link to={"/detail/" + i?._id} className="d-block">
                          <img
                            className="img-fit mx-auto h-140px h-md-210px ls-is-cached lazyloaded"
                            src={i?.images[0]}
                            data-src={i?.name}
                            alt={i?.name}
                          />
                        </Link>
                        <div className="absolute-top-right aiz-p-hov-icon">
                          <a
                            href="javascript:void(0)"
                            onclick="addToWishList(37971)"
                            data-toggle="tooltip"
                            data-title="Thêm vào danh sách yêu thích"
                            data-placement="left"
                          >
                            <i className="fa fa-heart" />
                          </a>
                          <a
                            href="javascript:void(0)"
                            data-toggle="tooltip"
                            data-title="Thêm vào để so sánh"
                            data-placement="left"
                          >
                            <i className="fas fa-sync" />
                          </a>
                          <a
                            href="javascript:void(0)"
                            onclick="showAddToCartModal(37971)"
                            data-toggle="tooltip"
                            data-title="Thêm vào giỏ hàng"
                            data-placement="left"
                          >
                            <i className="fas fa-shopping-cart" />
                          </a>
                        </div>
                      </div>
                      <div className="p-md-3 p-2 text-left">
                        <div className="fs-15">
                          <span className="fw-700 text-primary">
                            ${i?.price?.toLocaleString()}
                          </span>
                        </div>
                        <div className="rating rating-sm mt-1">
                          <i className="fas fa-star active" />
                          <i className="fas fa-star active" />
                          <i className="fas fa-star active" />
                          <i className="fas fa-star active" />
                          <i className="fas fa-star " />
                        </div>
                        <h3 className="fw-600 fs-13 text-truncate-2 lh-1-4 mb-0 h-35px">
                          <Link
                            to={"/detail/" + i?._id}
                            className="d-block text-reset"
                          >
                            {i?.name}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  return (
    <section className="mb-4">
      <div className="container">
        <div className="row">
          <div className="col-xxl-5 col-xl-6 col-md-8 mx-auto">
            <div className="bg-white rounded shadow-sm p-4 text-center">
              <h3 className="fw-600 h4">
                {detail?.name} has not been verified yet.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopDetail;

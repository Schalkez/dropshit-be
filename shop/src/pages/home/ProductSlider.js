/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
const ProductSlider = ({ category_id }) => {
  const [data, setData] = useState([]);
  const getProductByCategory = async (category_id) => {
    const res = await requestService.get(
      "/auth/getProductByCategory/" + category_id
    );
    if (res && res.data) {
      setData(res?.data?.data);
    }
  };

  useEffect(() => {
    getProductByCategory(category_id);
  }, [category_id]);
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay]}
      className="mySwiper"
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      {data?.map((item1, index) => (
        <SwiperSlide key={index}>
          <div
            className="carousel-box"
            style={{ width: "100%", display: "inline-block" }}
          >
            <div className="aiz-card-box border border-light rounded hov-shadow-md mt-1 mb-2 has-transition bg-white">
              <div className="position-relative">
                <Link
                  to={`/detail/${item1?._id}`}
                  className="d-block"
                  tabIndex={0}
                >
                  <img
                    className="img-fit mx-auto h-140px h-md-210px ls-is-cached lazyloaded"
                    src={
                      !item1?.images?.length ? item1?.images : item1?.images[0]
                    }
                    data-src={
                      !item1?.images?.length ? item1?.images : item1?.images[0]
                    }
                    alt={item1?.name}
                  />
                </Link>
                <div className="absolute-top-right aiz-p-hov-icon">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-title="Thêm vào danh sách yêu thích"
                    data-placement="left"
                    tabIndex={0}
                  >
                    <i className="fa-solid fa-heart"></i>
                  </a>
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-title="Thêm vào để so sánh"
                    data-placement="left"
                    tabIndex={0}
                  >
                    <i className="fas fa-sync" />
                  </a>
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-title="Thêm vào giỏ hàng"
                    data-placement="left"
                    tabIndex={0}
                  >
                    <i className="fas fa-shopping-cart" />
                  </a>
                </div>
              </div>
              <div className="p-md-3 p-2 text-left">
                <div className="fs-15">
                  <span className="fw-700 text-primary">${item1?.price}</span>
                </div>
                <div className="rating rating-sm mt-1">
                  <i className="fas fa-star active" />
                  <i className="fas fa-star active" />
                  <i className="fas fa-star active" />
                  <i className="fas fa-star active" />
                  <i className="fas fa-star active" />
                </div>

                <div className="rating rating-sm mt-1">
                  <i
                    className="More View "
                    style={{
                      color: "#ffa707",
                    }}
                  />
                  <i
                    className="More View"
                    style={{
                      color: "#ffa707",
                    }}
                  />
                  <i
                    className="More View"
                    style={{
                      color: "#ffa707",
                    }}
                  />
                  <i
                    className="More View"
                    style={{
                      color: "#ffa707",
                    }}
                  />
                  <i className="More View" />
                </div>
                <h3 className="fw-600 fs-13 text-truncate-2 lh-1-4 mb-0 h-35px">
                  <a href="/detail" className="d-block text-reset" tabIndex={0}>
                    {item1?.name}
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;

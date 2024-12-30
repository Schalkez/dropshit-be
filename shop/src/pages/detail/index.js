/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Spin, message } from "antd";
import Slider from "react-slick";
import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { setCart } from "store/app";
import { Swiper, SwiperSlide } from "swiper/react";

const Detail = () => {
  const [detail, setDetail] = useState(null);
  const { user } = useAppSelector((state) => state.app);
  const [productsNew, setProductsNew] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [productsBestSelling, setProductsBestSelling] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await requestService.get("/auth/getProductsBestSelling");
        if (res && res.data) {
          setProductsBestSelling(res.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await requestService.get("/auth/new");
        if (res && res.data) {
          setProductsNew(res.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const addCart = (item) => {
    if (!user) return navigate("/login");
    if (user?.roles[0]?.code !== "CUSTOMER")
      return message.error("Chỉ Khách hàng mới đc mua hàng");
    const carts = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (!carts?.length) {
      dispatch(setCart([{ quantity: 1, product: item }]));
      return localStorage.setItem(
        "cart",
        JSON.stringify([{ quantity: 1, product: item }])
      );
    }

    const foundIndex = carts.findIndex(
      (element) => element?.product?._id === item?._id
    );
    if (foundIndex !== -1) {
      carts[foundIndex].quantity++;
    } else {
      carts.push({ quantity: 1, product: item });
    }
    localStorage.setItem("cart", JSON.stringify(carts));
    dispatch(setCart(carts));
    message.success("Thêm vào giỏ hàng thành công");
  };
  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);
      try {
        const res = await requestService.get(`/auth/getProductDetail/${id}`);
        if (res && res.data) {
          setDetail(res?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    if (id) getDetail();
  }, [id]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    prevArrow: (
      <button
        type="button"
        className="slick-prev slick-arrow slick-disabled"
        aria-disabled="true"
        style={{}}
      >
        <i className="fas fa-angle-left" />
      </button>
    ),
    nextArrow: (
      <button
        type="button"
        className="slick-next slick-arrow"
        style={{}}
        aria-disabled="false"
      >
        <i className="fas fa-angle-right" />
      </button>
    ),
  };

  return (
    <>
      <section className="mb-4 pt-3">
        <Spin spinning={loading} fullscreen />
        <div className="container">
          <div className="bg-white shadow-sm rounded p-3">
            <div className="row">
              <div className="col-xl-5 col-lg-6 mb-4">
                <div className="sticky-top z-3 row gutters-10">
                  <div className="col-12 order-1 order-md-2">
                    <Swiper
                      spaceBetween={30}
                      slidesPerView={4}
                      centeredSlides={true}
                      loop={true}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={false}
                      className="mySwiper"
                    >
                      {!!detail?.images &&
                        detail?.images?.map((i, index) => (
                          <div
                            key={index}
                            className="carousel-box img-zoom rounded"
                            style={{
                              width: "100%",
                              display: "inline-block",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              className="img-fluid ls-is-cached lazyloaded"
                              src={i}
                              data-src={i}
                            />
                            <img
                              role="presentation"
                              alt=""
                              src={i}
                              className="zoomImg"
                              style={{
                                position: "absolute",
                                top: "-102.888px",
                                left: "-898.073px",
                                opacity: 0,
                                width: 1500,
                                height: 1500,
                                border: "none",
                                maxWidth: "none",
                                maxHeight: "none",
                              }}
                            />
                          </div>
                        ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-6">
                <div className="text-left">
                  <h1 className="mb-2 fs-20 fw-600">{detail?.name}</h1>
                  <div className="row align-items-center">
                    <div className="col-12">
                      <span className="rating">
                        <i className="More View" style={{ color: "#ffa707" }} />
                        <i className="More View" style={{ color: "#ffa707" }} />
                        <i className="More View" style={{ color: "#ffa707" }} />
                        <i className="More View" style={{ color: "#ffa707" }} />
                        <i className="More View" />
                      </span>
                      <span className="ml-1 opacity-50">(0 Nhận xét)</span>
                    </div>
                    <div className="col-auto ml">
                      <small className="mr-2 opacity-50">
                        Ước tính thời gian vận chuyển:
                      </small>
                      7 ngày
                    </div>
                    {/*-\u6b63\u7248\u0071\u0071\u0034\u0039\u0035\u0032\u0020\u0038\u0038\u0038\u0037-*/}
                  </div>
                  <hr />
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <small className="mr-2 opacity-50">Được bán bởi: </small>
                      <br />
                      <Link
                        to={
                          detail?.user?.store
                            ? "/shop/" + detail?.user?._id
                            : "#"
                        }
                        className="text-reset"
                      >
                        {detail?.user?.store?.nameStore
                          ? detail?.user?.store?.nameStore
                          : "Shop NYC"}
                      </Link>
                    </div>
                    <div className="col-auto">
                      {detail?.user?.store?.nameStore && (
                        <Link
                          to={
                            user ? "/dashboard-client/message-detail" : "/login"
                          }
                          state={detail}
                        >
                          <button className="btn btn-sm btn-soft-primary">
                            Người bán tin nhắn
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row no-gutters mt-3">
                    <div className="col-sm-2">
                      <div className="opacity-50 my-2">Giá bán:</div>
                    </div>
                    <div className="col-sm-10">
                      <div className="">
                        <strong className="h2 fw-600 text-primary">
                          ${detail?.price?.toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-soft-primary mr-2 add-to-cart fw-600"
                      onClick={() => addCart(detail)}
                    >
                      <i className="fas fa-shopping-bag mr-2" />
                      <span className="d-none d-md-inline-block">
                        {" "}
                        Thêm vào giỏ hàng
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary buy-now fw-600"
                      onClick={() => {
                        addCart(detail);
                        navigate("/cart");
                      }}
                    >
                      <i className="fa fa-shopping-cart" /> Mua ngay
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary out-of-stock fw-600 d-none"
                    >
                      <i className="fa fa-cart-arrow-down" /> Hết hàng
                    </button>
                  </div>
                  <div className="d-table width-100 mt-3">
                    <div className="d-table-cell">
                      {/* Add to wishlist button */}
                      <button
                        type="button"
                        className="btn pl-0 btn-link fw-600"
                      >
                        Thêm vào danh sách yêu thích
                      </button>
                      {/* Add to compare button */}
                      <button
                        type="button"
                        className="btn btn-link btn-icon-left fw-600"
                      >
                        Thêm vào để so sánh
                      </button>
                    </div>
                  </div>
                  <div className="row no-gutters mt-3">
                    <div className="col-2">
                      <div className="opacity-50 mt-2">Hoàn tiền:</div>
                    </div>
                    <div className="col-10">
                      <a href="#/return-policy" target="_blank">
                        <img
                          src="https://amazon-selling.vip/public/assets/img/refund-sticker.jpg"
                          height={36}
                        />
                      </a>
                      <a
                        href="#/return-policy"
                        className="ml-2"
                        target="_blank"
                      >
                        View Policy
                      </a>
                    </div>
                  </div>
                  <div className="row no-gutters mt-4">
                    <div className="col-sm-2">
                      <div className="opacity-50 my-2">Chia sẻ:</div>
                    </div>
                    <div className="col-sm-10">
                      <div className="aiz-share jssocials">
                        <div className="jssocials-shares">
                          <div className="jssocials-share jssocials-share-email">
                            <a
                              target="_self"
                              href="#"
                              className="jssocials-share-link"
                            >
                              <i className="fas fa-envelope jssocials-share-logo" />
                            </a>
                          </div>
                          <div className="jssocials-share jssocials-share-twitter">
                            <a
                              target="_blank"
                              href="#"
                              className="jssocials-share-link"
                            >
                              <i className="fab fa-twitter jssocials-share-logo" />
                            </a>
                          </div>
                          <div className="jssocials-share jssocials-share-facebook">
                            <a
                              target="_blank"
                              href="#"
                              className="jssocials-share-link"
                            >
                              <i className="fab fa-facebook-f jssocials-share-logo" />
                            </a>
                          </div>
                          <div className="jssocials-share jssocials-share-linkedin">
                            <a
                              target="_blank"
                              href="#"
                              className="jssocials-share-link"
                            >
                              <i className="fab fa-linkedin-in jssocials-share-logo" />
                            </a>
                          </div>
                          <div className="jssocials-share jssocials-share-whatsapp">
                            <a
                              target="_self"
                              href="#"
                              className="jssocials-share-link"
                            >
                              <i className="fab fa-whatsapp jssocials-share-logo" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4">
        <div className="container">
          <div className="row gutters-10">
            <div className="col-xl-3">
              <div className="bg-white rounded shadow-sm mb-3">
                <div className="p-3 border-bottom fs-16 fw-600">
                  Sản Phẩm Bán Chạy Nhất
                </div>
              </div>
              <div className="p-3">
                <ul className="list-group list-group-flush">
                  {productsBestSelling.map((i, index) => (
                    <li
                      onClick={() => navigate("/detail/" + i?._id)}
                      className="py-3 px-0 list-group-item border-light"
                    >
                      <div className="row gutters-10 align-items-center">
                        <div className="col-5">
                          <a href="#" className="d-block text-reset">
                            <img
                              className="img-fit h-xxl-300px h-xl-80px h-120px ls-is-cached lazyloaded"
                              src={i?.images[0]}
                              alt="Vegetable Chopper, sktome Veggie Chopper, Multifunctional 12 in 1 Food Chopper, Vegetable Slicer Dicer with 8 Blades, Onion Chopper Vegetable Cutter with Salad Garlic Carrot"
                              onerror="this.onerror=null;this.src='https://global-jd.com/assets/img/placeholder.jpg';"
                            />
                          </a>
                        </div>
                        <div className="col-7 text-left">
                          <h4 className="fs-13 text-truncate-2">
                            <a className="d-block text-reset">{i?.name}</a>
                          </h4>
                          <div className="rating rating-sm mt-1">
                            <i className="fas fa-star active" />
                            <i className="fas fa-star active" />
                            <i className="fas fa-star active" />
                            <i className="fas fa-star active" />
                            <i className="fas fa-star active" />
                          </div>
                          <div className="mt-2">
                            <span className="fs-17 fw-600 text-primary">
                              ${i?.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xl-9 order-0 order-xl-1">
              <div className="bg-white mb-3 shadow-sm rounded">
                <div className="nav border-bottom aiz-nav-tabs">
                  <a
                    href="#tab_default_1"
                    data-toggle="tab"
                    className="p-3 fs-16 fw-600 text-reset show active"
                  >
                    Mô Tả
                  </a>
                  <a
                    href="#tab_default_4"
                    data-toggle="tab"
                    className="p-3 fs-16 fw-600 text-reset"
                  >
                    Nhận Xét
                  </a>
                </div>
                <div className="tab-content pt-0">
                  <div className="tab-pane fade active show" id="tab_default_1">
                    <div className="p-4">
                      <div className="mw-100 overflow-hidden text-left aiz-editor-data">
                        <div
                          className="expand-collapse-header flex justify-between items-center w-100"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "1066.66px",
                            fontFamily:
                              'Bogle, "Helvetica Neue", Helvetica, Arial, sans-serif',
                            fontSize: "medium",
                          }}
                        >
                          <h3
                            aria-hidden="false"
                            className="w-100 ma0 pa3 f5 lh-copy normal"
                            style={{
                              lineHeight: "1.5",
                              width: "1026.66px",
                              padding: "1rem",
                              marginRight: 0,
                              marginBottom: 0,
                              marginLeft: 0,
                              fontSize: "1rem",
                            }}
                          >
                            Product details
                          </h3>
                          <div className="pr3" style={{ paddingRight: "1rem" }}>
                            <button
                              className="bg-transparent bn lh-solid pa0 sans-serif tc underline inline-button black pointer f6 bw0 bg-white pt3"
                              type="button"
                              aria-expanded="true"
                              aria-label="Product details"
                              style={{
                                boxSizing: "inherit",
                                fontFamily:
                                  'Bogle, "Helvetica Neue", Helvetica, Arial, sans-serif',
                                fontSize: "0.875rem",
                                lineHeight: 1,
                                borderStyle: "none",
                                borderWidth: 0,
                                color: "rgb(0, 0, 0)",
                                padding: "1rem 0px 0px",
                                textDecorationLine: "underline",
                              }}
                            >
                              <span
                                className="ld ld-ChevronUp pa0"
                                style={{
                                  boxSizing: "content-box",
                                  WebkitFontSmoothing: "antialiased",
                                  display: "inline-block",
                                  fontVariantNumeric: "normal",
                                  fontVariantEastAsian: "normal",
                                  fontVariantAlternates: "normal",
                                  fontKerning: "auto",
                                  fontOpticalSizing: "auto",
                                  fontFeatureSettings: "normal",
                                  fontVariationSettings: "normal",
                                  fontVariantPosition: "normal",
                                  fontStretch: "normal",
                                  fontSize: "1.5rem",
                                  lineHeight: 1,
                                  fontFamily: "ui-icons",
                                  padding: 0,
                                  verticalAlign: "-0.25em",
                                  width: "1.5rem",
                                  height: "1.5rem",
                                }}
                              />
                            </button>
                          </div>
                        </div>
                        <div
                          className="w_rNem expand-collapse-content"
                          data-testid="ui-collapse-panel"
                          style={{
                            overflowY: "hidden",
                            transition: "height 0.3s linear 0s",
                            width: "1066.66px",
                            fontFamily:
                              'Bogle, "Helvetica Neue", Helvetica, Arial, sans-serif',
                            fontSize: "medium",
                            height: "auto",
                          }}
                        >
                          <div
                            className="ph3 pb4 pt1"
                            style={{ padding: "0.25rem 1rem 1.5rem" }}
                          >
                            <div
                              className="nb3"
                              data-testid="product-description-content"
                              style={{ marginBottom: "-1rem" }}
                            >
                              <div
                                className="mb3"
                                style={{ marginBottom: "1rem" }}
                              >
                                <span
                                  className="b f6 mid-gray lh-copy lh-title overflow-visible db w_V_DM"
                                  style={{
                                    boxSizing: "inherit",
                                    WebkitBoxOrient: "vertical",
                                    display: "block",
                                    overflow: "visible",
                                    fontWeight: 700,
                                    lineHeight: "1.5",
                                    color: "rgb(70, 71, 74)",
                                    fontSize: "0.875rem",
                                    paddingBottom: "0em",
                                    marginBottom: "0em",
                                  }}
                                >
                                  <div
                                    className="dangerous-html mb3"
                                    style={{ marginBottom: "1rem" }}
                                  >
                                    <p>
                                      With this Disney Frozen II Plastic Toddler
                                      Bed by Delta Children little adventurers
                                      will (snow) drift off to sleep. Accented
                                      with colorful decals of Anna, Elsa,
                                      Kristoff, Sven and other Frozen-inspired
                                      graphics, this icy blue kids’ toddler bed
                                      brings a flurry of enchantment to any
                                      bedroom. The bed’s low height and attached
                                      guardrails make it a safe option for your
                                      child’s first big-kid bed. Get this
                                      toddler bed today and bring home the magic
                                      of Frozen II!
                                    </p>
                                    <p>
                                      About Frozen: This tale of sisterly love
                                      and adventure has warmed hearts all around
                                      the world, and now Frozen fans can join
                                      their favorite Arendelle friends to
                                      experience the magic over and over again
                                      with Frozen-inspired chairs, beds, toy
                                      storage and more from Delta Children.
                                    </p>
                                  </div>
                                </span>
                              </div>
                              <div
                                className="mb3"
                                style={{ marginBottom: "1rem" }}
                              >
                                <span
                                  className="f6 mid-gray lh-title overflow-visible db w_V_DM"
                                  style={{
                                    boxSizing: "inherit",
                                    WebkitBoxOrient: "vertical",
                                    display: "block",
                                    overflow: "visible",
                                    lineHeight: "1.25",
                                    color: "rgb(70, 71, 74)",
                                    fontSize: "0.875rem",
                                    paddingBottom: "0em",
                                    marginBottom: "0em",
                                  }}
                                >
                                  <div
                                    className="dangerous-html mb3"
                                    style={{ marginBottom: "1rem" }}
                                  >
                                    <ul
                                      style={{
                                        marginTop: "1rem",
                                        paddingLeft: "1.5rem",
                                      }}
                                    >
                                      <li>
                                        Recommended Use: Recommended for ages 15
                                        months+ | Holds up to 50 pounds
                                      </li>
                                      <li>
                                        Easy Transition from Crib to Big-Kid
                                        Bed: Features two attached guardrails
                                        with low to the ground design, at ideal
                                        kid-sized height | Enables safe and easy
                                        access in and out of bed&nbsp;
                                      </li>
                                      <li>
                                        For the Frozen II Fan: Accented with
                                        colorful decals of Anna, Elsa, Kristoff,
                                        Sven and other Frozen-inspired graphics,
                                        this icy blue kids’ toddler bed brings a
                                        flurry of enchantment to any bedroom
                                      </li>
                                      <li>
                                        Quality Construction: Sturdy steel frame
                                        and high-quality plastic construction
                                      </li>
                                      <li>
                                        Safest Option: JPMA certified to meet or
                                        exceed all safety standards set by the
                                        CPSC &amp; ASTM | Size: Assembled
                                        dimensions: 53.94" L x 29.13" W x 26.18"
                                        H | Easy assembly | Uses a standard crib
                                        mattress (sold separately)
                                      </li>
                                    </ul>
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tab_default_2">
                    <div className="p-4">
                      <div className="embed-responsive embed-responsive-16by9"></div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tab_default_3">
                    <div className="p-4 text-center ">
                      <a href="" className="btn btn-primary">
                        Tải Xuống
                      </a>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tab_default_4">
                    <div className="p-4">
                      <ul className="list-group list-group-flush"></ul>
                      <div className="text-center fs-18 opacity-70">
                        Chưa Có Nhận Xét Nào Cho Sản Phẩm Này
                      </div>
                      {/*\u76d7\u7248\u9632\u62a4\u0020\u0020\u0071\u0069\u0020\u0065\u0020\u0034\u0039\u0035\u0032\u0020\u0038\u0038\u0038\u0037*/}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded shadow-sm">
                <div className="border-bottom p-3">
                  <h3 className="fs-16 fw-600 mb-0">
                    <span className="mr-4">Những Sản Phẩm Tương Tự</span>
                  </h3>
                </div>
                <div className="p-3">
                  <div
                    className="aiz-carousel gutters-5 half-outside-arrow slick-initialized slick-slider"
                    data-items={5}
                    data-xl-items={3}
                    data-lg-items={4}
                    data-md-items={3}
                    data-sm-items={2}
                    data-xs-items={2}
                    data-arrows="true"
                    data-infinite="true"
                  >
                    <Slider {...settings}>
                      {productsNew.map((i) => (
                        <div
                          className="slick-slide slick-current slick-active"
                          data-slick-index={0}
                          aria-hidden="false"
                          style={{ width: 217 }}
                          onClick={() => {
                            navigate("/detail/" + i?._id);
                          }}
                        >
                          <div>
                            <div
                              className="carousel-box"
                              style={{ width: "100%", display: "inline-block" }}
                            >
                              <div className="aiz-card-box border-light hov-shadow-md has-transition mb-2 mt-1 rounded border bg-white">
                                <div className="position-relative">
                                  <a className="d-block" tabIndex={0}>
                                    <img
                                      className="img-fit h-140px h-md-210px mx-auto lazyloaded"
                                      src={i?.images[0]}
                                      alt="MENGNI High Quality Toilet Paper Holder no drill Waterproof Toilet Tissue Storage Box Wall Mount tissue box Bathroom Accessories Sets"
                                      onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                                    />
                                  </a>
                                  <div className="absolute-top-right aiz-p-hov-icon">
                                    <a
                                      href="javascript:void(0)"
                                      onclick="addToWishList(463016)"
                                      data-toggle="tooltip"
                                      data-title="Thêm vào danh sách yêu thích"
                                      data-placement="left"
                                      tabIndex={0}
                                    >
                                      <i className="fa fa-heart" />
                                    </a>
                                    <a
                                      href="javascript:void(0)"
                                      onclick="addToCompare(463016)"
                                      data-toggle="tooltip"
                                      data-title="Thêm vào để so sánh"
                                      data-placement="left"
                                      tabIndex={0}
                                    >
                                      <i className="fas fa-sync" />
                                    </a>
                                    <a
                                      href="javascript:void(0)"
                                      onclick="showAddToCartModal(463016)"
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
                                    <span className="fw-700 text-primary">
                                      ${i?.price}
                                    </span>
                                  </div>
                                  <div className="rating rating-sm mt-1">
                                    <i className="fas fa-star active" />
                                    <i className="fas fa-star active" />
                                    <i className="fas fa-star active" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                  </div>
                                  <h3 className="fw-600 fs-13 text-truncate-2 lh-1-4 h-35px mb-0">
                                    <a
                                      className="d-block text-reset"
                                      tabIndex={0}
                                    >
                                      <span
                                        style={{ display: "block" }}
                                        className="obf-iengVNbgetVN123"
                                      >
                                        {i?.name}
                                      </span>
                                    </a>
                                  </h3>
                                  <div className="bg-soft-primary border-soft-primary mt-2 rounded border px-2">
                                    Điểm câu lạc bộ:{" "}
                                    <span className="fw-700 float-right">
                                      0
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;

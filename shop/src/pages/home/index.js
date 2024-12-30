/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "react-slick";
import { Autoplay } from "swiper/modules";
import requestService from "api/request";
import { Link, useNavigate } from "react-router-dom";
import ProductSlider from "./ProductSlider";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [productsNew, setProductsNew] = useState([])
  const [productsFeature, setProductsFeature] = useState([])
  const [productsBestSelling, setProductsBestSelling] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await requestService.get('/auth/new')
        if (res && res.data) {
          setProductsNew(res.data?.data)
        }
      } catch (error) {
        console.log(error);

      }
    }
    getProducts()
  }, [])
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await requestService.get('/auth/new')
        if (res && res.data) {
          setProductsNew(res.data?.data)
        }
      } catch (error) {
        console.log(error);

      }
    }
    getProducts()
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await requestService.get('/auth/getProductsFeature')
        if (res && res.data) {
          setProductsFeature(res.data?.data)
        }
      } catch (error) {
        console.log(error);

      }
    }
    getProducts()
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await requestService.get('/auth/getProductsBestSelling')
        if (res && res.data) {
          setProductsBestSelling(res.data?.data)
        }
      } catch (error) {
        console.log(error);

      }
    }
    getProducts()
  }, [])

  const getCategories = async () => {
    try {
      const res = await requestService.get("/auth/category");
      if (res && res.data) {
        setCategories(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    prevArrow: <button
      type="button"
      className="slick-prev slick-arrow slick-disabled"
      aria-disabled="true"
      style={{}}
    >
      <i className="fas fa-angle-left" />
    </button>,
    nextArrow: <button
      type="button"
      className="slick-next slick-arrow"
      style={{}}
      aria-disabled="false"
    >
      <i className="fas fa-angle-right" />
    </button>
  };

  return (

    <>
      <div className="home-banner-area mb-4 pt-3">
        <div className="container">
          <div className="row gutters-10 position-relative">
            <div className="col-lg-3 position-static d-none d-lg-block">
              <div className="aiz-category-menu bg-white rounded  shadow-sm">
                <div className="p-3 bg-soft-primary d-none d-lg-block rounded-top all-category position-relative text-left">
                  <span className="fw-600 fs-16 mr-3">Thể loại</span>
                  <Link to="/products-filter" className="text-reset">
                    <span className="d-none d-lg-inline-block">
                      Nhìn thấy tất cả &gt;
                    </span>
                  </Link>
                </div>
                <ul className="list-unstyled categories no-scrollbar py-2 mb-0 text-left">
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/luxury-43d7m"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img.icons8.com/?size=100&id=mWcKBrC2R88K&format=png&color=000000"
                        data-src="https://img.icons8.com/?size=100&id=mWcKBrC2R88K&format=png&color=000000"
                        width={16}
                        alt="Đồ dùng cho thú cưng"
                        onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123">
                          Providenci Rippin Sr.
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Đồ dù
                        </span>
                        <span className="obf-iengVNbgetVN123">Camila Goyette MD</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          ng cho th
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          ú cưng
                        </span>
                        <span className="obf-iengVNbgetVN123">Lavern Rodriguez</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy" />
                        <span className="obf-iengVNbgetVN123">Abbigail Huels V</span>
                      </span>
                    </Link>
                  </li>
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/women-clothing-fashion"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img.icons8.com/?size=100&id=vOwa8zOArrVl&format=png&color=000000"
                        data-src="https://img.icons8.com/?size=100&id=vOwa8zOArrVl&format=png&color=000000"
                        width={16}
                        alt="Thời trang & Phụ kiện nữ"
                        onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123">Robyn Feest</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Thời tra
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          ng &amp; P
                        </span>
                        <span className="obf-iengVNbgetVN123">Brooke Johnston</span>
                        <span className="obf-iengVNbgetVN123">Laurine Greenholt</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          hụ kiện{" "}
                        </span>
                        <span className="obf-iengVNbgetVN123">Lucie Feil</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          nữ
                        </span>
                      </span>
                    </Link>
                    <div className="sub-cat-menu c-scrollbar-light rounded shadow-lg p-4">
                      <div className="card-columns">
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Women-Underwear-VV7W5"
                              >
                                Women Underwear
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Women-Sunglasses-qoNVN"
                              >
                                Kính mát nữ
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/women-shoes-rk61s"
                              >
                                Giày dép nữ
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/women-eye-glasses-tjpk4"
                              >
                                Kính mắt nữ
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Women-Clothing-O9nEj"
                              >
                                Quần áo nữ
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Women-Clothing-Lingerie-Sleep--Lounge-JXhOi"
                              >
                                Quần áo nữ nội y, ngủ &amp; thư giãn
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Women-Bags-cjsn5"
                              >
                                Túi xách nữ
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Women-Accessories-25Cim"
                              >
                                Phụ kiện nữ
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Swimwear-and-Beachwear-bu57h"
                              >
                                Đồ bơi và đồ dạo biển
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/men-clothing-men-shoes"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img7.yeshen.cc/vn-alibaba/YT/Zh/YTrXmHPHEBAeW73ffIhMuvOkpDsDbd1IbHVGDaZh.jpg"
                        data-src="https://img7.yeshen.cc/vn-alibaba/YT/Zh/YTrXmHPHEBAeW73ffIhMuvOkpDsDbd1IbHVGDaZh.jpg"
                        width={16}
                        alt="Thời trang Nam & Phụ kiện"
                        onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Thời tr
                        </span>
                        <span className="obf-iengVNbgetVN123">Jailyn Jerde</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          ang Nam
                        </span>
                        <span className="obf-iengVNbgetVN123">
                          Dr. Lindsey Kirlin I
                        </span>
                        <span className="obf-iengVNbgetVN123">
                          Ms. Shania Wilkinson DDS
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          {" "}
                          &amp; Phụ
                        </span>
                        <span className="obf-iengVNbgetVN123">
                          Romaine Stoltenberg
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          {" "}
                          kiện
                        </span>
                      </span>
                    </Link>
                    <div className="sub-cat-menu c-scrollbar-light rounded shadow-lg p-4">
                      <div className="card-columns">
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/underwear-usij6"
                              >
                                Đồ lót nam
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Topi-Pria-nNhrV"
                              >
                                Mũ nam
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Sandal-Pria-8qJTS"
                              >
                                Dép nam
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Men-Sunglasses-dtGSX"
                              >
                                Kính mát nam
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Men-Shoes-NGV6r"
                              >
                                Giày dép nam
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Men-Eyeglasses-IaCCW"
                              >
                                Kính mắt nam
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Men-Clothing-HjbPr"
                              >
                                Quần áo nam
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/men-bags-eisg"
                              >
                                Túi xách nam
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Men-Accessories-4MidG"
                              >
                                Phụ kiện nam
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Digital-Goods-JkSb2"
                              >
                                Quần nam
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/travel-1glsq"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img6.yeshen.cc/vn-alibaba/pP/bt/pP4mmJCfSiwdAbocDJBF9iXoRfU3X9Otfy7yPabt.png"
                        data-src="https://img6.yeshen.cc/vn-alibaba/pP/bt/pP4mmJCfSiwdAbocDJBF9iXoRfU3X9Otfy7yPabt.png"
                        width={16}
                        alt="Du lịch"
                        onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123">Leonor Bernhard</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Du lị
                        </span>
                        <span className="obf-iengVNbgetVN123">
                          Mrs. Mariela Koelpin
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          ch
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/souvenir-vc3xb"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img6.yeshen.cc/vn-alibaba/El/9r/ElcYocbS8eJUeajX1eXiokg5e1MXbeuwAMwkBd9r.png"
                        data-src="https://img6.yeshen.cc/vn-alibaba/El/9r/ElcYocbS8eJUeajX1eXiokg5e1MXbeuwAMwkBd9r.png"
                        width={16}
                        alt="Quà lưu niệm"
                        onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123">Margret Conn MD</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Quà l
                        </span>
                        <span className="obf-iengVNbgetVN123">
                          Prof. Kathleen Harvey
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          ưu niệ
                        </span>
                        <span className="obf-iengVNbgetVN123">Elyssa McGlynn</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          m
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/electronic-devices-p7hnl"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img9.yeshen.cc/vn-alibaba/4B/kv/4BzoIxGDLMgKrCyo1JT7zimJePhMtvtQHKAOeakv.jpg"
                        data-src="https://img9.yeshen.cc/vn-alibaba/4B/kv/4BzoIxGDLMgKrCyo1JT7zimJePhMtvtQHKAOeakv.jpg"
                        width={16}
                        alt="Thiết bị điện tử"
                        onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Thiết
                        </span>
                        <span className="obf-iengVNbgetVN123">Carmelo Harber</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          {" "}
                          bị điện t
                        </span>
                        <span className="obf-iengVNbgetVN123">Murphy Feest Sr.</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          ử
                        </span>
                        <span className="obf-iengVNbgetVN123">Dortha Carroll</span>
                      </span>
                    </Link>
                    <div className="sub-cat-menu c-scrollbar-light rounded shadow-lg p-4">
                      <div className="card-columns">
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Tablets-tokDj"
                              >
                                Máy tính bảng
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Security-Cameras--Systems-D1tAa"
                              >
                                Camera an ninh &amp; Hệ thống
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Mobiles-BXbT9"
                              >
                                Điện thoại di động
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/laptop-obxez"
                              >
                                Laptop
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Gadgets--Other-Cameras-p9X7l"
                              >
                                Gadget &amp; Các máy ảnh khác
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Digital-Cameras-45rMK"
                              >
                                Máy ảnh kỹ thuật số
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Desktops-Computers-CwFsi"
                              >
                                Máy tính để bàn
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Console-Gaming-Npeqo"
                              >
                                Trò chơi trên máy console
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Action--Video-Cameras-J4jUn"
                              >
                                Camera hành động / Video
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/toy-urk6l"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img0.yeshen.cc/vn-alibaba/gQ/8g/gQNQrRo45ZaRXHY3KBiTPIJ71XSj5fzQROzKRV8g.jpg"
                        data-src="https://img0.yeshen.cc/vn-alibaba/gQ/8g/gQNQrRo45ZaRXHY3KBiTPIJ71XSj5fzQROzKRV8g.jpg"
                        width={16}
                        alt="Trẻ em & Đồ chơi"
                        onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Trẻ em{" "}
                        </span>
                        <span className="obf-iengVNbgetVN123">Camryn Baumbach</span>
                        <span className="obf-iengVNbgetVN123">
                          Anabel Armstrong V
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          &amp; Đồ{" "}
                        </span>
                        <span className="obf-iengVNbgetVN123">Abraham Johns</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          chơi
                        </span>
                      </span>
                    </Link>
                    <div className="sub-cat-menu c-scrollbar-light rounded shadow-lg p-4">
                      <div className="card-columns">
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Toys--Games-WzVvD"
                              >
                                Đồ chơi &amp; Trò chơi
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Sports-Toys--Outdoor-Play-8O6Fb"
                              >
                                Đồ chơi thể thao &amp; Ngoài trời
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Nursing--Feeding-m0LJm"
                              >
                                Chăm sóc và cho con bú
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Mother--Baby-38mPK"
                              >
                                Mẹ &amp; Bé
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Milk-Formula--Baby-Food-0o93T"
                              >
                                Sữa công thức &amp; Thực phẩm cho bé
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Maternity-Care-EED21"
                              >
                                Chăm sóc thai kỳ
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Electronic--Remote-Control-Toys-efQmG"
                              >
                                Đồ chơi điều khiển từ xa &amp; Điện tử
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Diapers--Wipes-HHKcG"
                              >
                                Tã và Khăn ướt
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Bath--Baby-Care-i9bdP"
                              >
                                Tắm &amp; Chăm sóc cho bé
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Baby-Gear-2owNl"
                              >
                                Trang thiết bị cho bé
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/Baby-Fashion--Accessories-KCh3B"
                              >
                                Thời trang và phụ kiện cho bé
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/health--beauty-bgvzc"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img.icons8.com/?size=100&id=gINNTdIsWR8p&format=png&color=000000"
                        data-src="https://img.icons8.com/?size=100&id=gINNTdIsWR8p&format=png&color=000000"
                        width={16}
                        alt="Sức khỏe & Làm đẹp"
                        onerror="this.onerror=null;this.src='https://img.icons8.com/?size=100&id=gINNTdIsWR8p&format=png&color=000000';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123">Donato Murphy</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Sức k
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          hỏe &amp; Làm
                        </span>
                        <span className="obf-iengVNbgetVN123">Mervin Wolf</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          {" "}
                          đẹp
                        </span>
                        <span className="obf-iengVNbgetVN123">Dr. Houston Mann</span>
                      </span>
                    </Link>
                    <div className="sub-cat-menu c-scrollbar-light rounded shadow-lg p-4">
                      <div className="card-columns">
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/fragrances-g4enl"
                              >
                                Nước hoa
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/personal-care-appliances-q040y"
                              >
                                Thiết bị chăm sóc cá nhân
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/mens-care-adxsl"
                              >
                                Chăm sóc nam giới
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/makeup-3d03m"
                              >
                                Trang điểm
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/hair-care-ryqap"
                              >
                                Chăm sóc tóc
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/beauty-skin-care-jdxwu"
                              >
                                Chăm sóc da
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/beauty-personal-care-kbz86"
                              >
                                Chăm sóc cá nhân đẹp
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/bath--body-jp3gq"
                              >
                                Tắm &amp; Cơ thể
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/home-decoration--appliance-dwjez"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img.icons8.com/?size=100&id=66SNUJbuTQLc&format=png&color=000000"
                        data-src="https://img.icons8.com/?size=100&id=66SNUJbuTQLc&format=png&color=000000"
                        width={16}
                        alt="Trang trí nhà cửa & Thiết bị gia dụng"
                        onerror="this.onerror=null;this.src='https://img.icons8.com/?size=100&id=66SNUJbuTQLc&format=png&color=000000';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123">Ida Kuvalis</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Trang trí{" "}
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          nhà cửa
                        </span>
                        <span className="obf-iengVNbgetVN123">Everette Larkin</span>
                        <span className="obf-iengVNbgetVN123">Chesley Ferry</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          {" "}
                          &amp; Thiết b
                        </span>
                        <span className="obf-iengVNbgetVN123">
                          Prof. Alvina Bechtelar
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          ị gia dụn
                        </span>
                        <span className="obf-iengVNbgetVN123">
                          Dr. Walton Jakubowski
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          g
                        </span>
                      </span>
                    </Link>
                    <div className="sub-cat-menu c-scrollbar-light rounded shadow-lg p-4">
                      <div className="card-columns">
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/tv-accessories-o7qqx"
                              >
                                Phụ kiện TV
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/televisions--videos-devices-wk5ky"
                              >
                                Thiết bị video và Truyền hình
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/small-kitchen-appliances-ddp0y"
                              >
                                Thiết bị nhà bếp nhỏ
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/small-cooling--air-treatment-18fuw"
                              >
                                Thiết bị làm mát nhỏ &amp; Xử lý không khí
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/large-appliances-zsq7c"
                              >
                                Thiết bị điện gia dụng lớn
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/home-audio-ovkbl"
                              >
                                Âm thanh nhà
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/small-household-appliances-ynjfo"
                              >
                                Thiết bị gia dụng nhỏ
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/parfume-wrlzn"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img.icons8.com/?size=100&id=115305&format=png&color=000000"
                        data-src="https://img.icons8.com/?size=100&id=115305&format=png&color=000000"
                        width={16}
                        alt="Nước hoa"
                        onerror="this.onerror=null;this.src='https://img.icons8.com/?size=100&id=115305&format=png&color=000000';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Nước h
                        </span>
                        <span className="obf-iengVNbgetVN123">
                          Misael Kuhlman III
                        </span>
                        <span className="obf-iengVNbgetVN123">Hudson Mohr</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          oa
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li className="category-nav-element">
                    <Link
                      to="/products-filter#category/home-improvement--tools-kexy2"
                      className="text-truncate text-reset py-2 px-3 d-block"
                    >
                      <img
                        className="cat-image mr-2 opacity-60 lazyloaded"
                        src="https://img3.yeshen.cc/vn-alibaba/vO/aR/vO2YFEhkBflWj8pJYcQDF7ppZWjGW3NFy5B5YMaR.jpg"
                        data-src="https://img3.yeshen.cc/vn-alibaba/vO/aR/vO2YFEhkBflWj8pJYcQDF7ppZWjGW3NFy5B5YMaR.jpg"
                        width={16}
                        alt="Cải Thiện Nhà Cửa & Dụng Cụ"
                        onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                      />
                      <span className="cat-name">
                        <span className="obf-iengVNbgetVN123">Ozella Howell</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          Cải Thiện
                        </span>
                        <span className="obf-iengVNbgetVN123">Hardy Schulist</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          {" "}
                          Nhà Cửa
                        </span>
                        <span className="obf-iengVNbgetVN123">Elenor Halvorson</span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          {" "}
                          &amp; Dụ
                        </span>
                        <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                          ng Cụ
                        </span>
                        <span className="obf-iengVNbgetVN123">
                          Prof. Zackary Ferry
                        </span>
                      </span>
                    </Link>
                    <div className="sub-cat-menu c-scrollbar-light rounded shadow-lg p-4">
                      <div className="card-columns">
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/stationery--craft-tzffh"
                              >
                                Văn phòng phẩm &amp; Đồ thủ công
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/furniture-hawn0"
                              >
                                Nội thất
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/laundry--cleaning-equipment-sd3nz"
                              >
                                Thiết bị giặt là &amp; Vệ sinh
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/storage--organisation-btevb"
                              >
                                Lưu trữ &amp; Tổ chức
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/lighting-3itqn"
                              >
                                Đèn
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/bath-cdh8b"
                              >
                                Vật Dụng Tắm
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/kitchen--dining-ecvfi"
                              >
                                Bếp &amp; Phòng ăn
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/home-dcor-ql07j"
                              >
                                Trang trí nhà cửa
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="card shadow-none border-0">
                          <ul className="list-unstyled mb-3">
                            <li className="fw-600 border-bottom pb-2 mb-3">
                              <Link
                                className="text-reset"
                                to="/products-filter#category/bedding-8ohnk"
                              >
                                Chăn ga gối đệm
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" col-lg-7 ">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                style={{
                  height: '320px'
                }}
                navigation={false}
                modules={[Autoplay]}
                className="mySwiper-homebanner"
              >
                <SwiperSlide>
                  <img src="/images/zIDy46T9zmV6f45lvCjd4R1GRYQYoVGQ79U9uxqd.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/images/C7IcP21r18a4SPKz6FwCNmZ5Spkwu4KlKLOT32Vl.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/images/i8TkfC3nndfvqkGVKs00D0UMEKU7tsJxdICdkqMN.jpg" />
                </SwiperSlide>
              </Swiper>



              {/* <ul className="list-unstyled mb-0 row gutters-5">
                {!!categories?.length &&
                  categories?.map((item, index) => (
                    <li className="minw-0 col-4 col-md mt-3">
                      <Link
                        to=""
                        className="d-block rounded bg-white p-2 text-reset shadow-sm"
                      >
                        <img
                          src={item?.img}
                          data-src={item?.img}
                          alt={item?.name}
                          className="img-fit ls-is-cached lazyloaded"

                        />
                        <div className="text-truncate fs-12 fw-600 mt-2 opacity-70">
                          {item?.name}
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul> */}
              <ul className="list-unstyled mb-0 row gutters-5">
                <li className="minw-0 col-4 col-md mt-3">
                  <Link
                    to="/products-filter"
                    className="d-block rounded bg-white p-2 text-reset shadow-sm"
                  >
                    <img
                      src="https://img2.yeshen.cc/vn-alibaba/iH/Bo/iHOjnygPdOMIDICsimZMAMoE0b3NXYGInqETeSBo.png"
                      data-src="https://img2.yeshen.cc/vn-alibaba/iH/Bo/iHOjnygPdOMIDICsimZMAMoE0b3NXYGInqETeSBo.png"
                      alt="Thời trang & Phụ kiện nữ"
                      className="img-fit lazyloaded"
                      height={78}
                      onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder-rect.jpg';"
                    />
                    <div className="text-truncate fs-12 fw-600 mt-2 opacity-70">
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        Thời tr
                      </span>
                      <span className="obf-iengVNbgetVN123">Nayeli Ferry</span>
                      <span className="obf-iengVNbgetVN123">Mrs. Annette Keebler</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        ang &amp;{" "}
                      </span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        Phụ kiện{" "}
                      </span>
                      <span className="obf-iengVNbgetVN123">Coty Cassin</span>
                      <span className="obf-iengVNbgetVN123">Mrs. Mozelle Beatty III</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">nữ</span>
                    </div>
                  </Link>
                </li>
                <li className="minw-0 col-4 col-md mt-3">
                  <Link
                    to="/products-filter"
                    className="d-block rounded bg-white p-2 text-reset shadow-sm"
                  >
                    <img
                      src="https://img0.yeshen.cc/vn-alibaba/dK/L6/dKDjrCqQs5L8XembeZk3oENQe3sHOckPagdtzwL6.png"
                      data-src="https://img0.yeshen.cc/vn-alibaba/dK/L6/dKDjrCqQs5L8XembeZk3oENQe3sHOckPagdtzwL6.png"
                      alt="Thời trang Nam & Phụ kiện"
                      className="img-fit lazyloaded"
                      height={78}
                      onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder-rect.jpg';"
                    />
                    <div className="text-truncate fs-12 fw-600 mt-2 opacity-70">
                      <span className="obf-iengVNbgetVN123">Caesar Toy</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        Thời trang
                      </span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        {" "}
                        Nam &amp; Phụ
                      </span>
                      <span className="obf-iengVNbgetVN123">Prof. Ellis Bednar</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        {" "}
                        kiện
                      </span>
                      <span className="obf-iengVNbgetVN123">Ernesto Klocko I</span>
                    </div>
                  </Link>
                </li>
                <li className="minw-0 col-4 col-md mt-3">
                  <Link
                    to="/products-filter"
                    className="d-block rounded bg-white p-2 text-reset shadow-sm"
                  >
                    <img
                      src="https://img9.yeshen.cc/vn-alibaba/Cc/lI/CcGQCop2RKI8zA80TZEss7YuNRxYSREELseYODlI.png"
                      data-src="https://img9.yeshen.cc/vn-alibaba/Cc/lI/CcGQCop2RKI8zA80TZEss7YuNRxYSREELseYODlI.png"
                      alt="Phụ kiện máy tính"
                      className="img-fit lazyloaded"
                      height={78}
                      onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder-rect.jpg';"
                    />
                    <div className="text-truncate fs-12 fw-600 mt-2 opacity-70">
                      <span className="obf-iengVNbgetVN123">Alayna Hudson</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        Phụ k
                      </span>
                      <span className="obf-iengVNbgetVN123">Lester Daugherty</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        iện máy tí
                      </span>
                      <span className="obf-iengVNbgetVN123">Mazie Lakin</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">nh</span>
                    </div>
                  </Link>
                </li>
                <li className="minw-0 col-4 col-md mt-3">
                  <Link
                    to="/products-filter"
                    className="d-block rounded bg-white p-2 text-reset shadow-sm"
                  >
                    <img
                      src="https://img5.yeshen.cc/vn-alibaba/ux/Hu/uxhH7xhMgkGFke3iSf7CSzaNUVnyJFekGfP6DwHu.png"
                      data-src="https://img5.yeshen.cc/vn-alibaba/ux/Hu/uxhH7xhMgkGFke3iSf7CSzaNUVnyJFekGfP6DwHu.png"
                      alt="Ô tô và Xe máy"
                      className="img-fit lazyloaded"
                      height={78}
                      onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder-rect.jpg';"
                    />
                    <div className="text-truncate fs-12 fw-600 mt-2 opacity-70">
                      <span className="obf-iengVNbgetVN123">Dr. Marcus Hoeger IV</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        Ô tô và{" "}
                      </span>
                      <span className="obf-iengVNbgetVN123">Lavon Cole III</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        Xe máy
                      </span>
                    </div>
                  </Link>
                </li>
                <li className="minw-0 col-4 col-md mt-3">
                  <Link
                    to="/products-filter"
                    className="d-block rounded bg-white p-2 text-reset shadow-sm"
                  >
                    <img
                      src="https://img5.yeshen.cc/vn-alibaba/P0/Pr/P052DIfVaW5aIufaDbbjBvOgzucl1PJAevaLLlPr.png"
                      data-src="https://img5.yeshen.cc/vn-alibaba/P0/Pr/P052DIfVaW5aIufaDbbjBvOgzucl1PJAevaLLlPr.png"
                      alt="Trang sức & Đồng hồ"
                      className="img-fit lazyloaded"
                      height={78}
                      onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder-rect.jpg';"
                    />
                    <div className="text-truncate fs-12 fw-600 mt-2 opacity-70">
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        Trang sứ
                      </span>
                      <span className="obf-iengVNbgetVN123">Estrella Daniel</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        c &amp; Đồng{" "}
                      </span>
                      <span className="obf-iengVNbgetVN123">Jeramy Pagac</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">hồ</span>
                      <span className="obf-iengVNbgetVN123">Ms. Jordane O'Keefe I</span>
                    </div>
                  </Link>
                </li>
                <li className="minw-0 col-4 col-md mt-3">
                  <Link
                    to="/products-filter"
                    className="d-block rounded bg-white p-2 text-reset shadow-sm"
                  >
                    <img
                      src="https://img5.yeshen.cc/vn-alibaba/Md/mp/Mdqpntq74vXUac1DOSZC0chtS4jmw0BbEpSvdImp.jpg"
                      data-src="https://img5.yeshen.cc/vn-alibaba/Md/mp/Mdqpntq74vXUac1DOSZC0chtS4jmw0BbEpSvdImp.jpg"
                      alt="phụ kiện điện thoại"
                      className="img-fit lazyloaded"
                      height={78}
                      onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder-rect.jpg';"
                    />
                    <div className="text-truncate fs-12 fw-600 mt-2 opacity-70">
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        phụ kiện
                      </span>
                      <span className="obf-iengVNbgetVN123">Berneice Haley</span>
                      <span className="obf-iengVNbgetVN123">Shanelle Kemmer</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        {" "}
                        điện t
                      </span>
                      <span className="obf-iengVNbgetVN123">Dr. Micaela Pacocha</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        hoại
                      </span>
                    </div>
                  </Link>
                </li>
                <li className="minw-0 col-4 col-md mt-3">
                  <Link
                    to="/products-filter"
                    className="d-block rounded bg-white p-2 text-reset shadow-sm"
                  >
                    <img
                      src="https://img3.yeshen.cc/vn-alibaba/Uf/Vd/Uf2an5rtjhEAa7tLLoJ3zIViOrgfSNrGoyw13lVd.png"
                      data-src="https://img3.yeshen.cc/vn-alibaba/Uf/Vd/Uf2an5rtjhEAa7tLLoJ3zIViOrgfSNrGoyw13lVd.png"
                      alt="Thiết bị gia dụng"
                      className="img-fit lazyloaded"
                      height={78}
                      onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder-rect.jpg';"
                    />
                    <div className="text-truncate fs-12 fw-600 mt-2 opacity-70">
                      <span className="obf-iengVNbgetVN123">Mr. Greyson Collier I</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        Thiết bị g
                      </span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        ia dụn
                      </span>
                      <span className="obf-iengVNbgetVN123">Janis Johnson</span>
                      <span className="obf-iengVNbgetVN123">Devante Champlin</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">g</span>
                    </div>
                  </Link>
                </li>
                <li className="minw-0 col-4 col-md mt-3">
                  <Link
                    to="/products-filter"
                    className="d-block rounded bg-white p-2 text-reset shadow-sm"
                  >
                    <img
                      src="https://img3.yeshen.cc/vn-alibaba/bx/cq/bxlhVvN0AzEbPUw18ywPWlqB0ikeFoFRSjgWtacq.jpg"
                      data-src="https://img3.yeshen.cc/vn-alibaba/bx/cq/bxlhVvN0AzEbPUw18ywPWlqB0ikeFoFRSjgWtacq.jpg"
                      alt="Trẻ em & Đồ chơi"
                      className="img-fit lazyloaded"
                      height={78}
                      onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder-rect.jpg';"
                    />
                    <div className="text-truncate fs-12 fw-600 mt-2 opacity-70">
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        Trẻ em &amp;{" "}
                      </span>
                      <span className="obf-iengVNbgetVN123">Ms. Charlene Frami</span>
                      <span className="obf-iengVNbgetVN123">Dr. Raven Brakus IV</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                        Đồ chơi
                      </span>
                      <span className="obf-iengVNbgetVN123">Sandra Spinka Jr.</span>
                      <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy" />
                    </div>
                  </Link>
                </li>
              </ul>

            </div>
            <div className="col-lg-2 order-3 mt-3 mt-lg-0">
              <div className="bg-white rounded shadow-sm">
                <div className="bg-soft-primary rounded-top p-3 d-flex align-items-center justify-content-center">
                  <span className="fw-600 fs-16 mr-2 text-truncate">
                    Thỏa thuận Todays
                  </span>
                  <span className="badge badge-primary badge-inline">Nóng bức</span>
                </div>
                <div className="c-scrollbar-light overflow-auto h-lg-400px p-2 bg-primary rounded-bottom">
                  <div className="gutters-5 lg-no-gutters row row-cols-2 row-cols-lg-1">
                    <div className="col mb-2">
                      <a
                        href="#product/736542063-jRkqY"
                        className="d-block p-2 text-reset bg-white h-100 rounded"
                      >
                        <div className="row gutters-5 align-items-center">
                          <div className="col-xxl">
                            <div className="img">
                              <img
                                className="img-fit h-140px h-lg-80px lazyloaded"
                                src="https://img3.yeshen.cc/vn-alibaba/47/a7/4752cb03-cacd-4d30-86b0-41bf7afb62a7.jpeg"
                                data-src="https://img3.yeshen.cc/vn-alibaba/47/a7/4752cb03-cacd-4d30-86b0-41bf7afb62a7.jpeg"
                                alt="REJURAN Healer Turnover Ampoule 1-[10ml X 3 piece] & 2-[ 30ml big bottle]"
                                onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                              />
                            </div>
                          </div>
                          <div className="col-xxl">
                            <div className="fs-16">
                              <span className="d-block text-primary fw-600">
                                $47.90
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------ */}

      <div className="mb-4">
        <div className="container">
          <div className="row gutters-10">
            <div className="col-xl col-md-6">
              <div className="mb-3 mb-lg-0">
                <a href="" className="d-block text-reset">
                  <img
                    src="https://img8.yeshen.cc/vn-alibaba/G4/sL/G4kHuPnMRYKNyfF7aBuirqvbbxYk5hSCDGhJ0IsL.png"
                    data-src="https://img8.yeshen.cc/vn-alibaba/G4/sL/G4kHuPnMRYKNyfF7aBuirqvbbxYk5hSCDGhJ0IsL.png"
                    alt="AlibabaVn promo"
                    className="img-fluid w-100 lazyloaded"
                  />
                </a>
              </div>
            </div>
            <div className="col-xl col-md-6">
              <div className="mb-3 mb-lg-0">
                <a href="" className="d-block text-reset">
                  <img
                    src="https://img2.yeshen.cc/vn-alibaba/fb/sC/fbGIQHGvdDs3ZmgmLuQ546o3ToOU5YKleb9kkasC.png"
                    data-src="https://img2.yeshen.cc/vn-alibaba/fb/sC/fbGIQHGvdDs3ZmgmLuQ546o3ToOU5YKleb9kkasC.png"
                    alt="AlibabaVn promo"
                    className="img-fluid w-100 lazyloaded"
                  />
                </a>
              </div>
            </div>
            <div className="col-xl col-md-6">
              <div className="mb-3 mb-lg-0">
                <a href="" className="d-block text-reset">
                  <img
                    src="https://img3.yeshen.cc/vn-alibaba/AX/24/AXlNH3zPDO3AIWY3TEno72Y0e4lfbX2EAARxcC24.png"
                    data-src="https://img3.yeshen.cc/vn-alibaba/AX/24/AXlNH3zPDO3AIWY3TEno72Y0e4lfbX2EAARxcC24.png"
                    alt="AlibabaVn promo"
                    className="img-fluid w-100 lazyloaded"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* -----product news---- */}

      <div id="section_newest">
        <section className="mb-4">
          <div className="container">
            <div className="px-2 py-4 px-md-4 py-md-3 bg-white shadow-sm rounded">
              <div className="d-flex mb-3 align-items-baseline border-bottom">
                <h3 className="h5 fw-700 mb-0">
                  <span className="border-bottom border-primary border-width-2 pb-3 d-inline-block">
                    Sản phẩm mới
                  </span>
                </h3>
              </div>
              <div
                className="aiz-carousel gutters-10 half-outside-arrow slick-initialized slick-slider"
                data-items={6}
                data-xl-items={5}
                data-lg-items={4}
                data-md-items={3}
                data-sm-items={2}
                data-xs-items={2}
                data-arrows="true"
              >
                {/* <button
                  type="button"
                  className="slick-prev slick-arrow slick-disabled"
                  aria-disabled="true"
                  style={{}}
                >
                  <i className="fas fa-angle-left" />
                </button> */}

                <Slider {...settings}>

                  {
                    productsNew.map((i) => (
                      <div
                        className="slick-slide slick-current slick-active"
                        data-slick-index={0}
                        aria-hidden="false"
                        style={{ width: 217 }}
                        onClick={() => {
                          navigate('/detail/' + i?._id)
                        }}
                      >
                        <div>
                          <div
                            className="carousel-box"
                            style={{ width: "100%", display: "inline-block" }}
                          >
                            <div className="aiz-card-box border-light hov-shadow-md has-transition mb-2 mt-1 rounded border bg-white">
                              <div className="position-relative">
                                <a

                                  className="d-block"
                                  tabIndex={0}
                                >
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
                                  <span className="fw-700 text-primary">${i?.price}</span>
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
                                      className="obf-iengVNbgetVN123">
                                      {i?.name}
                                    </span>

                                  </a>
                                </h3>
                                <div className="bg-soft-primary border-soft-primary mt-2 rounded border px-2">
                                  Điểm câu lạc bộ:{" "}
                                  <span className="fw-700 float-right">0</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }


                </Slider>
                {/* <button
                  type="button"
                  className="slick-next slick-arrow"
                  style={{}}
                  aria-disabled="false"
                >
                  <i className="fas fa-angle-right" />
                </button> */}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* ----product feature--- */}


      <div id="section_featured">
        <section className="mb-4">
          <div className="container">
            <div className="px-2 py-4 px-md-4 py-md-3 bg-white shadow-sm rounded">
              <div className="d-flex mb-3 align-items-baseline border-bottom">
                <h3 className="h5 fw-700 mb-0">
                  <span className="border-bottom border-primary border-width-2 pb-3 d-inline-block">
                    Sản phẩm nổi bật
                  </span>
                </h3>
              </div>
              <div
                className="aiz-carousel gutters-10 half-outside-arrow slick-initialized slick-slider"
                data-items={6}
                data-xl-items={5}
                data-lg-items={4}
                data-md-items={3}
                data-sm-items={2}
                data-xs-items={2}
                data-arrows="true"
              >
                <Slider {...settings}>

                  {
                    productsFeature.map((i) => (
                      <div
                        className="slick-slide slick-current slick-active"
                        data-slick-index={0}
                        aria-hidden="false"
                        style={{ width: 217 }}
                        onClick={() => {
                          navigate('/detail/' + i?._id)
                        }}
                      >
                        <div>
                          <div
                            className="carousel-box"
                            style={{ width: "100%", display: "inline-block" }}
                          >
                            <div className="aiz-card-box border-light hov-shadow-md has-transition mb-2 mt-1 rounded border bg-white">
                              <div className="position-relative">
                                <a

                                  className="d-block"
                                  tabIndex={0}
                                >
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
                                  <span className="fw-700 text-primary">${i?.price}</span>
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
                                      className="obf-iengVNbgetVN123">
                                      {i?.name}
                                    </span>

                                  </a>
                                </h3>
                                <div className="bg-soft-primary border-soft-primary mt-2 rounded border px-2">
                                  Điểm câu lạc bộ:{" "}
                                  <span className="fw-700 float-right">0</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }


                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* ---product bestselling--- */}
      <div id="section_best_selling">
        <section className="mb-4">
          <div className="container">
            <div className="px-2 py-4 px-md-4 py-md-3 bg-white shadow-sm rounded">
              <div className="d-flex mb-3 align-items-baseline border-bottom">
                <h3 className="h5 fw-700 mb-0">
                  <span className="border-bottom border-primary border-width-2 pb-3 d-inline-block">
                    Bán chạy nhất
                  </span>
                </h3>
                <a
                  href="javascript:void(0)"
                  className="ml-auto mr-0 btn btn-primary btn-sm shadow-md"
                >
                  20 hạng đầu
                </a>
              </div>
              <div
                className="aiz-carousel gutters-10 half-outside-arrow slick-initialized slick-slider"
                data-items={6}
                data-xl-items={5}
                data-lg-items={4}
                data-md-items={3}
                data-sm-items={2}
                data-xs-items={2}
                data-arrows="true"
                data-infinite="true"
              >
                <Slider {...settings}>

                  {
                    productsBestSelling.map((i) => (
                      <div
                        className="slick-slide slick-current slick-active"
                        data-slick-index={0}
                        aria-hidden="false"
                        style={{ width: 217 }}
                        onClick={() => {
                          navigate('/detail/' + i?._id)
                        }}
                      >
                        <div>
                          <div
                            className="carousel-box"
                            style={{ width: "100%", display: "inline-block" }}
                          >
                            <div className="aiz-card-box border-light hov-shadow-md has-transition mb-2 mt-1 rounded border bg-white">
                              <div className="position-relative">
                                <a

                                  className="d-block"
                                  tabIndex={0}
                                >
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
                                  <span className="fw-700 text-primary">${i?.price}</span>
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
                                      className="obf-iengVNbgetVN123">
                                      {i?.name}
                                    </span>

                                  </a>
                                </h3>
                                <div className="bg-soft-primary border-soft-primary mt-2 rounded border px-2">
                                  Điểm câu lạc bộ:{" "}
                                  <span className="fw-700 float-right">0</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }


                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <!-- Auction Product --> */}
      <div className="mb-4">
        <div className="container">
          <div className="row gutters-10">
            <div className="col-xl col-md-6">
              <div className="mb-3 mb-lg-0">
                <a href="" className="d-block text-reset">
                  <img
                    src="https://img7.yeshen.cc/vn-alibaba/JZ/vK/JZFkoh2DdpJ7t3a1PPUN5IVmJkJb27IzwMKPzTvK.png"
                    data-src="https://img7.yeshen.cc/vn-alibaba/JZ/vK/JZFkoh2DdpJ7t3a1PPUN5IVmJkJb27IzwMKPzTvK.png"
                    alt="AlibabaVn promo"
                    className="img-fluid w-100 lazyloaded"
                  />
                </a>
              </div>
            </div>
            <div className="col-xl col-md-6">
              <div className="mb-3 mb-lg-0">
                <a href="" className="d-block text-reset">
                  <img
                    src="https://img7.yeshen.cc/vn-alibaba/cJ/E4/cJxfU7v3KPBN2FqzyJdhheajgkZvv8yJBiqxmUE4.png"
                    data-src="https://img7.yeshen.cc/vn-alibaba/cJ/E4/cJxfU7v3KPBN2FqzyJdhheajgkZvv8yJBiqxmUE4.png"
                    alt="AlibabaVn promo"
                    className="img-fluid w-100 lazyloaded"
                  />
                </a>
              </div>
            </div>
            <div className="col-xl col-md-6">
              <div className="mb-3 mb-lg-0">
                <a href="" className="d-block text-reset">
                  <img
                    src="https://img6.yeshen.cc/vn-alibaba/uY/Hr/uYNLvMXQB4mmYdzBTmDepkASoqjDAlIBDTFrtWHr.png"
                    data-src="https://img6.yeshen.cc/vn-alibaba/uY/Hr/uYNLvMXQB4mmYdzBTmDepkASoqjDAlIBDTFrtWHr.png"
                    alt="AlibabaVn promo"
                    className="img-fluid w-100 lazyloaded"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="section_home_categories" />
      <div className="mb-4">
        <div className="container">
          <div className="row gutters-10">
            <div className="col-xl col-md-6">
              <div className="mb-3 mb-lg-0">
                <a href="" className="d-block text-reset">
                  <img
                    src="https://img7.yeshen.cc/vn-alibaba/Yo/Cl/YocWwPF4fUUGLleFmcYVLWE0Olhs1Lanpit8k4Cl.png"
                    data-src="https://img7.yeshen.cc/vn-alibaba/Yo/Cl/YocWwPF4fUUGLleFmcYVLWE0Olhs1Lanpit8k4Cl.png"
                    alt="AlibabaVn promo"
                    className="img-fluid w-100 lazyloaded"
                  />
                </a>
              </div>
            </div>
            <div className="col-xl col-md-6">
              <div className="mb-3 mb-lg-0">
                <a href="" className="d-block text-reset">
                  <img
                    src="https://img5.yeshen.cc/vn-alibaba/Nf/QI/NfZnwsvoIy7acEClZiprH0VD0VE0b42w05PSqHQI.png"
                    data-src="https://img5.yeshen.cc/vn-alibaba/Nf/QI/NfZnwsvoIy7acEClZiprH0VD0VE0b42w05PSqHQI.png"
                    alt="AlibabaVn promo"
                    className="img-fluid w-100 lazyloaded"
                  />
                </a>
              </div>
            </div>
            <div className="col-xl col-md-6">
              <div className="mb-3 mb-lg-0">
                <a href="" className="d-block text-reset">
                  <img
                    src="https://img8.yeshen.cc/vn-alibaba/4j/6c/4jQOAwYDppta27E3rfI1Zhzq1iSgrygw4WYZbo6c.png"
                    data-src="https://img8.yeshen.cc/vn-alibaba/4j/6c/4jQOAwYDppta27E3rfI1Zhzq1iSgrygw4WYZbo6c.png"
                    alt="AlibabaVn promo"
                    className="img-fluid w-100 lazyloaded"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* all categories */}
      <section className="mb-4">
        <div className="container">
          <div className="row gutters-10">
            <div className="col-lg-12">
              <div className="d-flex mb-3 align-items-baseline border-bottom">
                <h3 className="h5 fw-700 mb-0">
                  <span className="border-bottom border-primary border-width-2 pb-3 d-inline-block">
                    10 danh mục hàng đầu
                  </span>
                </h3>
                <a
                  href="#categories"
                  className="ml-auto mr-0 btn btn-primary btn-sm shadow-md"
                >
                  Xem tất cả danh mục
                </a>
              </div>
              <div className="row gutters-5">
                <div className="col-sm-3">
                  <a
                    to="/products-filter#category/women-clothing-fashion"
                    className="bg-white border d-block text-reset rounded p-2 hov-shadow-md mb-2"
                  >
                    <div className="row align-items-center no-gutters">
                      <div className="col-3 text-center">
                        <img
                          src="https://img3.yeshen.cc/vn-alibaba/iH/Bo/iHOjnygPdOMIDICsimZMAMoE0b3NXYGInqETeSBo.png"
                          data-src="https://img3.yeshen.cc/vn-alibaba/iH/Bo/iHOjnygPdOMIDICsimZMAMoE0b3NXYGInqETeSBo.png"
                          alt="Thời trang & Phụ kiện nữ"
                          className="img-fluid img h-60px ls-is-cached lazyloaded"
                          onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                        />
                      </div>
                      <div className="col-7">
                        <div className="text-truncat-2 pl-3 fs-14 fw-600 text-left">
                          <span className="obf-iengVNbgetVN123">Lily Koepp</span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            Thời t
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            rang &amp; Phụ
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Dr. Camylle Stroman
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            {" "}
                            kiện{" "}
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Ernie Reinger III
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Mr. Kip Blick MD
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            nữ
                          </span>
                        </div>
                      </div>
                      <div className="col-2 text-center">
                        <i className="fa fa-angle-right text-primary" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-sm-3">
                  <a
                    to="/products-filter#category/men-clothing-men-shoes"
                    className="bg-white border d-block text-reset rounded p-2 hov-shadow-md mb-2"
                  >
                    <div className="row align-items-center no-gutters">
                      <div className="col-3 text-center">
                        <img
                          src="https://img9.yeshen.cc/vn-alibaba/dK/L6/dKDjrCqQs5L8XembeZk3oENQe3sHOckPagdtzwL6.png"
                          data-src="https://img9.yeshen.cc/vn-alibaba/dK/L6/dKDjrCqQs5L8XembeZk3oENQe3sHOckPagdtzwL6.png"
                          alt="Thời trang Nam & Phụ kiện"
                          className="img-fluid img h-60px ls-is-cached lazyloaded"
                          onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                        />
                      </div>
                      <div className="col-7">
                        <div className="text-truncat-2 pl-3 fs-14 fw-600 text-left">
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            Thời tran
                          </span>
                          <span className="obf-iengVNbgetVN123">Lottie Hilpert</span>
                          <span className="obf-iengVNbgetVN123">
                            Wade Cruickshank
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            g Nam &amp; Ph
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Ardella Wilderman
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            ụ kiện
                          </span>
                        </div>
                      </div>
                      <div className="col-2 text-center">
                        <i className="fa fa-angle-right text-primary" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-sm-3">
                  <a
                    to="/products-filter#category/computer-accessories"
                    className="bg-white border d-block text-reset rounded p-2 hov-shadow-md mb-2"
                  >
                    <div className="row align-items-center no-gutters">
                      <div className="col-3 text-center">
                        <img
                          src="https://img8.yeshen.cc/vn-alibaba/Cc/lI/CcGQCop2RKI8zA80TZEss7YuNRxYSREELseYODlI.png"
                          data-src="https://img8.yeshen.cc/vn-alibaba/Cc/lI/CcGQCop2RKI8zA80TZEss7YuNRxYSREELseYODlI.png"
                          alt="Phụ kiện máy tính"
                          className="img-fluid img h-60px ls-is-cached lazyloaded"
                          onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                        />
                      </div>
                      <div className="col-7">
                        <div className="text-truncat-2 pl-3 fs-14 fw-600 text-left">
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            Phụ kiện
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Andreanne Langosh
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            {" "}
                            máy tí
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Mrs. Marlee Heaney
                          </span>
                          <span className="obf-iengVNbgetVN123">Francis White</span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            nh
                          </span>
                        </div>
                      </div>
                      <div className="col-2 text-center">
                        <i className="fa fa-angle-right text-primary" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-sm-3">
                  <a
                    to="/products-filter#category/sports-outdoor"
                    className="bg-white border d-block text-reset rounded p-2 hov-shadow-md mb-2"
                  >
                    <div className="row align-items-center no-gutters">
                      <div className="col-3 text-center">
                        <img
                          src="https://img2.yeshen.cc/vn-alibaba/N3/yi/N3vnccAj2nO1mipj3ErFMaf4Lt87CMOlJ5kyIVyi.png"
                          data-src="https://img2.yeshen.cc/vn-alibaba/N3/yi/N3vnccAj2nO1mipj3ErFMaf4Lt87CMOlJ5kyIVyi.png"
                          alt="Thể thao & ngoài trời"
                          className="img-fluid img h-60px lazyloaded"
                          onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                        />
                      </div>
                      <div className="col-7">
                        <div className="text-truncat-2 pl-3 fs-14 fw-600 text-left">
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            Thể tha
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Dr. Jaden Hamill
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            o &amp; n
                          </span>
                          <span className="obf-iengVNbgetVN123">Marlen Huel</span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            goài trờ
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Dr. Al Leuschke I
                          </span>
                          <span className="obf-iengVNbgetVN123">Lila Tromp MD</span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            i
                          </span>
                        </div>
                      </div>
                      <div className="col-2 text-center">
                        <i className="fa fa-angle-right text-primary" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-sm-3">
                  <a
                    to="/products-filter#category/automobile%20&%20motorcycle-jjc59"
                    className="bg-white border d-block text-reset rounded p-2 hov-shadow-md mb-2"
                  >
                    <div className="row align-items-center no-gutters">
                      <div className="col-3 text-center">
                        <img
                          src="https://img0.yeshen.cc/vn-alibaba/ux/Hu/uxhH7xhMgkGFke3iSf7CSzaNUVnyJFekGfP6DwHu.png"
                          data-src="https://img0.yeshen.cc/vn-alibaba/ux/Hu/uxhH7xhMgkGFke3iSf7CSzaNUVnyJFekGfP6DwHu.png"
                          alt="Ô tô và Xe máy"
                          className="img-fluid img h-60px ls-is-cached lazyloaded"
                          onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                        />
                      </div>
                      <div className="col-7">
                        <div className="text-truncat-2 pl-3 fs-14 fw-600 text-left">
                          <span className="obf-iengVNbgetVN123">Modesto Sanford</span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            Ô tô{" "}
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Mr. Darion Runolfsdottir DDS
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            và Xe máy
                          </span>
                        </div>
                      </div>
                      <div className="col-2 text-center">
                        <i className="fa fa-angle-right text-primary" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-sm-3">
                  <a
                    to="/products-filter#category/jewelry--watches-9zv51"
                    className="bg-white border d-block text-reset rounded p-2 hov-shadow-md mb-2"
                  >
                    <div className="row align-items-center no-gutters">
                      <div className="col-3 text-center">
                        <img
                          src="https://img8.yeshen.cc/vn-alibaba/P0/Pr/P052DIfVaW5aIufaDbbjBvOgzucl1PJAevaLLlPr.png"
                          data-src="https://img8.yeshen.cc/vn-alibaba/P0/Pr/P052DIfVaW5aIufaDbbjBvOgzucl1PJAevaLLlPr.png"
                          alt="Trang sức & Đồng hồ"
                          className="img-fluid img h-60px ls-is-cached lazyloaded"
                          onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                        />
                      </div>
                      <div className="col-7">
                        <div className="text-truncat-2 pl-3 fs-14 fw-600 text-left">
                          <span className="obf-iengVNbgetVN123">
                            Mr. Giovanni Kilback IV
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            Trang{" "}
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            sức &amp; Đồ
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Sister Runolfsson
                          </span>
                          <span className="obf-iengVNbgetVN123">Allen Bode</span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            ng hồ
                          </span>
                        </div>
                      </div>
                      <div className="col-2 text-center">
                        <i className="fa fa-angle-right text-primary" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-sm-3">
                  <a
                    to="/products-filter#category/phone-accessories-fqzez"
                    className="bg-white border d-block text-reset rounded p-2 hov-shadow-md mb-2"
                  >
                    <div className="row align-items-center no-gutters">
                      <div className="col-3 text-center">
                        <img
                          src="https://img9.yeshen.cc/vn-alibaba/Md/mp/Mdqpntq74vXUac1DOSZC0chtS4jmw0BbEpSvdImp.jpg"
                          data-src="https://img9.yeshen.cc/vn-alibaba/Md/mp/Mdqpntq74vXUac1DOSZC0chtS4jmw0BbEpSvdImp.jpg"
                          alt="phụ kiện điện thoại"
                          className="img-fluid img h-60px ls-is-cached lazyloaded"
                          onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                        />
                      </div>
                      <div className="col-7">
                        <div className="text-truncat-2 pl-3 fs-14 fw-600 text-left">
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            phụ kiện{" "}
                          </span>
                          <span className="obf-iengVNbgetVN123">Jany Predovic V</span>
                          <span className="obf-iengVNbgetVN123">
                            Marianna Heathcote
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            điện{" "}
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            thoại
                          </span>
                          <span className="obf-iengVNbgetVN123">
                            Darrion Weissnat
                          </span>
                        </div>
                      </div>
                      <div className="col-2 text-center">
                        <i className="fa fa-angle-right text-primary" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-sm-3">
                  <a
                    to="/products-filter#category/home-decoration--appliance-ydsus"
                    className="bg-white border d-block text-reset rounded p-2 hov-shadow-md mb-2"
                  >
                    <div className="row align-items-center no-gutters">
                      <div className="col-3 text-center">
                        <img
                          src="https://img7.yeshen.cc/vn-alibaba/Uf/Vd/Uf2an5rtjhEAa7tLLoJ3zIViOrgfSNrGoyw13lVd.png"
                          data-src="https://img7.yeshen.cc/vn-alibaba/Uf/Vd/Uf2an5rtjhEAa7tLLoJ3zIViOrgfSNrGoyw13lVd.png"
                          alt="Thiết bị gia dụng"
                          className="img-fluid img h-60px ls-is-cached lazyloaded"
                          onerror="this.onerror=null;this.src='https://albbcbe-cme.org/public/assets/img/al-placeholder.jpg';"
                        />
                      </div>
                      <div className="col-7">
                        <div className="text-truncat-2 pl-3 fs-14 fw-600 text-left">
                          <span className="obf-iengVNbgetVN123">
                            Prof. Melyna Gusikowski
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            Thiết bị
                          </span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            {" "}
                            gia dụn
                          </span>
                          <span className="obf-iengVNbgetVN123">Rudolph Beatty</span>
                          <span className="obf-iengVNbgetVN123 obf-iengVNbgetVN123--dy">
                            g
                          </span>
                          <span className="obf-iengVNbgetVN123">Preston Howe</span>
                        </div>
                      </div>
                      <div className="col-2 text-center">
                        <i className="fa fa-angle-right text-primary" />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white border-top mt-auto">
        <div className="container">       <div className="row no-gutters">
          <div className="col-lg-3 col-md-6">
            <a
              className="text-reset border-left text-center p-4 d-block"
              href="#/terms"
            >
              <i className="fa fa-file-text la-3x text-primary mb-2" />
              <h4 className="h6">Điều khoản và điều kiện</h4>
            </a>
          </div>
          <div className="col-lg-3 col-md-6">
            <a
              className="text-reset border-left text-center p-4 d-block"
              href="#/return-policy"
            >
              <i className="fa fa-mail-reply la-3x text-primary mb-2" />
              <h4 className="h6">Chính sách hoàn trả</h4>
            </a>
          </div>
          <div className="col-lg-3 col-md-6">
            <a
              className="text-reset border-left text-center p-4 d-block"
              href="#/support-policy"
            >
              <i className="fa-solid fa-phone la-3x text-primary mb-2" />
              <h4 className="h6">Chính sách hỗ trợ</h4>
            </a>
          </div>
          <div className="col-lg-3 col-md-6">
            <a
              className="text-reset border-left border-right text-center p-4 d-block"
              href="#/privacy-policy"
            >
              <i className="fas fa-exclamation-circle la-3x text-primary mb-2" />
              <h4 className="h6">Chính sách bảo mật</h4>
            </a>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

/* eslint-disable jsx-a11y/anchor-is-valid */
import { Pagination, Select, Spin } from "antd";
import { Option } from "antd/es/mentions";
import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import categories from 'mockup-data/categories.json'
const ProductsFilter = () => {
  //const [categories, setCategories] = useState([]);
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const allSubcategories = categories.flatMap((category) =>
    category.subcategories?.map((sub) => ({
      name: sub.name || sub.subcategory,
      slug: sub.slug || sub.url,
    })) || []
  );


  const location = useLocation();
  const onChange = (page) => {
    setCurrent(page);
    setQuery({
      ...query,
      page,
    });
  };
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await requestService.get("/auth/getProductsFilter", {
          params: {
            ...query,
          },
        });
        if (res && res.data) {
          setData(res?.data?.data);
        }
      } catch (error) { }
      setLoading(false);
    };
    getData();
  }, [query]);
  useEffect(() => {
    const getDetail = async () => {
      try {
        // const res = await requestService.get("/auth/category");
        // if (res && res.data?.data) {
        //   setCategories(res.data?.data);
        // }
      } catch (error) { }
    };
    getDetail();
  }, []);

  return (
    <section className="mb-4 pt-3">
      <Spin spinning={loading} fullscreen />
      <div className="container sm-px-0">
        <form className="" id="search-form" action="" method="GET">
          <div className="row">
            <div className="col-xl-3">
              <div className="aiz-filter-sidebar collapse-sidebar-wrap sidebar-xl sidebar-right z-1035">
                <div
                  className="overlay overlay-fixed dark c-pointer"
                  data-toggle="class-toggle"
                  data-target=".aiz-filter-sidebar"
                  data-same=".filter-sidebar-thumb"
                />
                <div className="collapse-sidebar c-scrollbar-light text-left">
                  <div className="d-flex d-xl-none justify-content-between align-items-center pl-3 border-bottom">
                    <h3 className="h6 mb-0 fw-600">Bộ lọc</h3>
                    <button
                      type="button"
                      className="btn btn-sm p-2 filter-sidebar-thumb"
                      data-toggle="class-toggle"
                      data-target=".aiz-filter-sidebar"
                    >
                      <i className="fas fa-times la-2x" />
                    </button>
                  </div>
                  <div className="bg-white shadow-sm rounded mb-3">
                    <div className="fs-15 fw-600 p-3 border-bottom">
                      Thể Loại
                    </div>
                    <div className="p-3">
                      <ul className="list-unstyled">
                        {!!allSubcategories?.length &&
                          allSubcategories?.map((i) => (
                            <li className="mb-2 ml-2" key={i?._id}>
                              <div
                                className="text-reset fs-14"
                                onClick={() =>
                                  setQuery({
                                    ...query,
                                    page: 1,
                                    category: i?.slug,
                                  })
                                }
                              >
                                {i?.name}
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white shadow-sm rounded mb-3"></div>
                  <div className="bg-white shadow-sm rounded mb-3"></div>
                  <div className="bg-white shadow-sm rounded mb-3"></div>
                  <div className="bg-white shadow-sm rounded mb-3"></div>
                  <div className="bg-white shadow-sm rounded mb-3"></div>
                </div>
              </div>
            </div>
            <div className="col-xl-9">
              <ul className="breadcrumb bg-transparent p-0">
                <li className="breadcrumb-item opacity-50">
                  <a className="text-reset" href="https://global-jd.com">
                    Trang Chủ
                  </a>
                </li>
                <li className="breadcrumb-item fw-600  text-dark">
                  <a className="text-reset" href="#search">
                    "Tất cả danh mục"
                  </a>
                </li>
              </ul>
              <div className="text-left">
                <div className="row gutters-5 flex-wrap align-items-center">
                  <div className="col-lg col-10">
                    <h1 className="h6 fw-600 text-body">Tất Cả Sản Phẩm</h1>
                    <input type="hidden" name="keyword" defaultValue="" />
                  </div>
                  {/* <div className="col-2 col-lg-auto d-xl-none mb-lg-3 text-right">
                    <button
                      type="button"
                      className="btn btn-icon p-0"
                      data-toggle="class-toggle"
                      data-target=".aiz-filter-sidebar"
                    >
                      <i className="fa fa-filter la-2x" />
                    </button>
                  </div> */}

                  <div className="d-block d-md-none col-6 col-lg-auto mb-3 w-lg-200px">
                    {/* <label className="mb-0 opacity-50">Sắp xếp theo</label>
                    <div className="dropdown bootstrap-select form-control form-control-sm aiz-">
                      <select
                        className="form-control form-control-sm aiz-selectpicker"
                        name="sort_by"
                        onchange="filter()"
                        tabIndex={-98}
                      >
                        <option value="newest" selected="">
                          Mới Nhất
                        </option>
                        <option value="oldest">Cũ Nhất</option>
                        <option value="price-asc">Giá Thấp Đến Cao</option>
                        <option value="price-desc">Giá Từ Cao Đến Thấp</option>
                      </select>
                      <button
                        type="button"
                        className="btn dropdown-toggle btn-light"
                        data-toggle="dropdown"
                        role="combobox"
                        aria-owns="bs-select-2"
                        aria-haspopup="listbox"
                        aria-expanded="false"
                        title="Mới Nhất"
                      >
                        <div className="filter-option">
                          <div className="filter-option-inner">
                            <div className="filter-option-inner-inner">
                              Mới Nhất
                            </div>
                          </div>{" "}
                        </div>
                      </button>
                      <div className="dropdown-menu ">
                        <div
                          className="inner show"
                          role="listbox"
                          id="bs-select-2"
                          tabIndex={-1}
                        >
                          <ul
                            className="dropdown-menu inner show"
                            role="presentation"
                          />
                        </div>
                      </div>
                    </div> */}
                    <Select
                      placeholder="Thể loại"
                      onChange={(val) => {

                        setQuery({ ...query, page: 1, category: val })
                      }}
                      style={{
                        width: "200px",
                      }}
                    >
                      {!!allSubcategories?.length &&
                        allSubcategories?.map((i) => (
                          <Option value={i?.slug}>{i?.name}</Option>
                        ))}
                    </Select>
                  </div>
                </div>
              </div>
              <input type="hidden" name="min_price" defaultValue="" />
              <input type="hidden" name="max_price" defaultValue="" />
              <div className="row gutters-5 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-4 row-cols-md-3 row-cols-2">
                {!!data?.products?.length &&
                  data?.products?.map((i) => (
                    <div className="col" key={i?._id}>
                      <div className="aiz-card-box border border-light rounded hov-shadow-md mt-1 mb-2 has-transition bg-white">
                        <div className="position-relative">
                          <Link to={"/detail/" + i?._id} className="d-block">
                            <img
                              className="img-fit mx-auto h-140px h-md-210px ls-is-cached lazyloaded"
                              src={i?.images[0]}
                              data-src={i?.images[0]}
                              alt={i?.name}
                            />
                          </Link>
                          <div className="absolute-top-right aiz-p-hov-icon">
                            <a
                              href="javascript:void(0)"
                              onclick="addToWishList(446933)"
                              data-toggle="tooltip"
                              data-title="Thêm Vào Danh Sách Yêu Thích"
                              data-placement="left"
                            >
                              <i className="fa fa-heart" />
                            </a>
                            <a
                              href="javascript:void(0)"
                              onclick="addToCompare(446933)"
                              data-toggle="tooltip"
                              data-title="Thêm Vào Để So Sánh"
                              data-placement="left"
                            >
                              <i className="fas fa-sync" />
                            </a>
                            <a
                              href="javascript:void(0)"
                              onclick="showAddToCartModal(446933)"
                              data-toggle="tooltip"
                              data-title="Thêm Vào Giỏ Hàng"
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
                            <i className="fas fa-star active" />
                          </div>
                          <h3 className="fw-600 fs-13 text-truncate-2 lh-1-4 mb-0 h-35px">
                            <a
                              href="#product/disney-minnie-mouse-plastic-sleep-and-play-toddler-bed-by-delta-children-uQYli"
                              className="d-block text-reset"
                            >
                              {i?.name}
                            </a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="aiz-pagination aiz-pagination-center mt-4">
                <nav>
                  <Pagination
                    current={current}
                    onChange={onChange}
                    total={data?.total || 0}
                    showSizeChanger={false}
                  />
                </nav>
              </div>
            </div>
          </div>
        </form>
      </div >
    </section >
  );
};

export default ProductsFilter;

/* eslint-disable jsx-a11y/alt-text */
import { Button, Select, Spin, message } from "antd";
import { Option } from "antd/es/mentions";
import requestService from "api/request";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { setUser } from "store/app";
import categories from 'mockup-data/categories.json'
const StoreHouse = () => {
  const [products, setProducts] = useState<any>([]);
  const [productSelect, setProductSelect] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  //const [category, setCategory] = useState([]);

  const [name_key, setNameKey] = useState();
  const [seletctCate, setSelectCate] = useState();

  const category = categories.flatMap((category) =>
    category.subcategories?.map((sub: any) => ({
      name: sub.name || sub.subcategory,
      slug: sub.slug || sub.url,
    })) || []
  );
  // const getCategory = async () => {
  //   try {
  //     const res = await requestService.get("/auth/category");
  //     if (res && res.data) {
  //       setCategory(res.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const product_ids = productSelect.map((item: any) => {
        return item?._id;
      });
      const res = await requestService.post("/profile/add-product-store", {
        data: {
          product_ids,
        },
      });
      await getMe();
      if (res && res.data) message.success("Thành công");
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Có lỗi xảy ra. Thử lại sau"
      );
    }
    setLoading(false);
  };
  const getProducts = async (
    page: any,
    name_key?: string,
    category?: string
  ) => {
    setLoading1(true);
    try {
      const res = await requestService.get("/profile/get-products-store", {
        params: {
          page,
          name_key,
          category,
        },
      });
      if (res && res.data) {
        setProducts([...products, ...res.data?.data]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading1(false);
  };

  const handleDelete = (prod: any) => {
    const newPro = productSelect.filter((item: any) => item?._id !== prod?._id);
    setProductSelect(newPro);
  };

  const getMe = async () => {
    try {
      const res = await requestService.get("/profile/me");
      if (res && res.data) {
        dispatch(setUser(res.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectProducts = (prod: any) => {
    try {
      const productFind = productSelect.find(
        (item: any) => item?._id === prod?._id
      );
      if (productFind) return;
      setProductSelect([...productSelect, prod]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts(page, name_key, seletctCate);
  }, [page, seletctCate]);

  // useEffect(() => {
  //   getCategory();
  // }, []);

  const handleInputChange = (e: any) => {
    setProducts([]);
    setNameKey(e?.target?.value);
  };
  return (
    <div className="px-15px px-lg-25px">
      <Spin spinning={loading1} fullscreen />
      <section className="gry-bg py-4 profile">
        <div className="container-fluid">
          <div className="row gutters-10">
            <div className="row gutters-5 mb-3 w-100">
              <div className="col-6 mb-2 mb-md-0">
                <div className="form-group mb-0">
                  <input
                    className="form-control form-control-lg"
                    name="keyword"
                    placeholder="Search by Product Name"
                    type="text"
                    value={name_key}
                    onChange={handleInputChange}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        getProducts(1, name_key, seletctCate);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-6 col-6">
                <Select
                  onChange={(val) => {
                    setPage(1);
                    setProducts([]);
                    setSelectCate(val);
                  }}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  placeholder="Select category"
                >
                  {!!category?.length &&
                    category?.map((item: any) => (
                      <Option value={item?.slug}>{item?.name}</Option>
                    ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="row gutters-10">
            <div className="col-12 col-md-8">
              {/* 搜索 */}

              {/* 商品列表 */}
              <div className="aiz-pos-product-list c-scrollbar-light">
                <div
                  className="d-flex flex-wrap justify-content-center"
                  id="product-list"
                >
                  {products?.map((item: any, index: number) => (
                    <div className="w-140px w-xl-180px w-xxl-210px mx-2">
                      <div className="card bg-white c-pointer product-card hov-container">
                        <div className="position-relative">
                          <span className="absolute-top-left mt-1 ml-1 mr-0">
                            <span className="badge badge-inline badge-success fs-13">
                              Trong kho : {item?.quantity || 999}
                            </span>
                          </span>
                          <span className="badge badge-inline badge-warning absolute-bottom-left mb-1 ml-1 mr-0 fs-13 text-truncate" />
                          <img
                            src={item?.images[0]}
                            className="card-img-top img-fit h-120px h-xl-180px h-xxl-210px mw-100 mx-auto"
                          />
                        </div>
                        <div className="card-body p-2 p-xl-3">
                          <div className="text-truncate fw-600 fs-14 mb-2">
                            {item?.name}
                          </div>
                          <div className="">
                            {/* <del className="mr-2 ml-0">$150.00</del> */}
                            <span>${item?.price}</span>
                          </div>
                        </div>
                        <div
                          className="add-plus absolute-full rounded overflow-hidden hov-box "
                          onClick={() => handleSelectProducts(item)}
                        >
                          <div className="absolute-full bg-dark opacity-50"></div>
                          <i className="fa fa-plus absolute-center la-2x text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div id="load-more" className="text-center">
                  <div
                    className="fs-14 d-inline-block fw-600 btn btn-primary c-pointer"
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    <u>Tải thêm</u>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 w-md-350px w-lg-400px w-xl-500px">
              {/* 选中的商品列表 */}
              <div className="card mb-3">
                <div className="card-body">
                  <div className="">
                    <div className="aiz-pos-cart-list mb-4 mt-3 c-scrollbar-light">
                      <ul
                        className="list-group list-group-flush"
                        id="product-selection"
                      >
                        {productSelect?.map((item: any) => (
                          <li className="list-group-item py-3 pl-2">
                            <div className="row gutters-5 align-items-center">
                              <div className="col">
                                <div className="text-truncate-2">
                                  {item?.name}
                                </div>
                                <span className="span badge badge-inline fs-12 badge-soft-secondary" />
                              </div>
                              <div className="col-auto">
                                <div className="fs-15 fw-600">
                                  ${item?.price}
                                </div>
                              </div>
                              <div className="col-auto">
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item)}
                                  className="btn btn-circle btn-icon btn-sm btn-danger ml-2 mr-0"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pos-footer mar-btm">
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  {/* 添加全部商品 */}
                  {/* <div className="d-flex">
                    <button
                      id="add-all-btn"
                      type="button"
                      className="btn btn-outline-info btn-block"
                    >
                      <span
                        className="spinner-border spinner-border-sm d-none"
                        role="status"
                        aria-hidden="true"
                      />
                      Thêm tất cả vào Sản phẩm của tôi
                    </button>
                  </div> */}
                  {/* 添加选中商品 */}
                  <div className="my-2 my-md-0">
                    <Button
                      id="add-selection-btn"
                      disabled={!productSelect?.length}
                      loading={loading}
                      onClick={onSubmit}
                      className="btn btn-primary btn-block"
                    >
                      <span
                        className="spinner-border spinner-border-sm d-none"
                        role="status"
                        aria-hidden="true"
                      />
                      Thêm vào sản phẩm của tôi
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoreHouse;

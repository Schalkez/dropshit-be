import { Spin } from "antd";
import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Search = () => {
  const [loading, setLoading] = useState(false);

  const useQuery = () => new URLSearchParams(useLocation().search);

  let query = useQuery();
  const [data, setData] = useState();

  const getData = async () => {
    setLoading(true);
    try {
      const res = await requestService.get(
        "/auth/searchDataUser?key=" + query.get("key")
      );
      if (res && res?.data) {
        setData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query.get("key")) getData();
  }, [query.get("key")]);
  return (
    <section className="mb-4 pt-3">
      <Spin spinning={loading} fullscreen />
      {
        !loading &&
        <>
          {
            !!data?.store?.length &&
            <div className="container sm-px-0">
              <div className="text-left">
                <div className="row gutters-5 flex-wrap align-items-center">
                  <div className="col-lg col-10">
                    <h1 className="h6 fw-600 text-body">Đề xuất cửa hàng</h1>
                    <input type="hidden" name="keyword" defaultValue="" />
                  </div>
                  <div className="col-12">
                    <ul className="list-group list-group-raw">
                      {data?.store?.map((item) => (
                        <li className="list-group-item">
                          <Link className="text-reset" to={"/shop/" + item?._id}>
                            <div className="d-flex search-product align-items-center">
                              <div className="mr-3">
                                <img
                                  className="size-40px img-fit rounded"
                                  src={
                                    !!item?.store?.logoStore ?
                                      item?.store?.logoStore :
                                      "/images/avatar-place.png"}
                                />
                              </div>
                              <div className="flex-grow-1 overflow--hidden">
                                <div className="product-name text-truncate fs-14 mb-5px" style={{
                                  fontWeight: "900"
                                }}>
                                  {item?.store?.nameStore}
                                </div>
                                <div className="opacity-60">
                                  {item?.store?.address}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          }

          {
            !!data?.products?.length &&
            <div className="container sm-px-0">
              <div className="text-left">
                <div className="row gutters-5 flex-wrap align-items-center">
                  <div className="col-lg col-10">
                    <h1 className="h6 fw-600 text-body">Đề xuất sản phẩm</h1>
                    <input type="hidden" name="keyword" defaultValue="" />
                  </div>
                  <div className="col-12">
                    <ul className="list-group list-group-raw">
                      {!data?.products?.length ? (
                        <h3>No Item</h3>
                      ) : (
                        data?.products?.map((item) => (
                          <li className="list-group-item">
                            <Link
                              className="text-reset"
                              to={'/detail/' + item?._id}
                            >
                              <div className="d-flex search-product align-items-center">
                                <div className="mr-3">
                                  <img
                                    className="size-40px img-fit rounded"
                                    src={item?.images[0]}
                                  />
                                </div>
                                <div className="flex-grow-1 overflow--hidden minw-0">
                                  <div className="product-name text-truncate fs-14 mb-5px">
                                    {item?.name}
                                  </div>
                                  <div className="">
                                    <span className="fw-600 fs-16 text-primary">
                                      ${item?.price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          }

        </>
      }

    </section>
  );
};

export default Search;

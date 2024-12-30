import { Button, Form, Spin, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import requestService from "api/request";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { setCart } from "store/app";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.app);
  const { user } = useAppSelector((state) => state.app);
  const [loading, setLoading] = useState(false);
  console.log(cart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const totalPrice = () => {
    let total = 0;
    if (cart?.length) {
      cart.map((i) => {
        total = total + i?.quantity * i?.product?.price;
      });
    }
    return total;
  };

  const onSubmit = async () => {
    try {
      if (!cart.length || !user) return;
      setLoading(true);
      cart.forEach(async (element) => {
        const res = await requestService.post("/profile/add-order", {
          data: {
            products: [
              {
                quantity: element?.quantity,
                product: element.product,
              },
            ],
            user_store: element?.product?.user?._id,
            user_customer: user?._id,
          },
        });
        if (res && res?.data) {
          message.success("Đã đặt hàng thành công");
          navigate("/");
          localStorage.setItem("cart", []);
          dispatch(setCart([]));
        }
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteCart = (id) => {
    const newc = cart.filter((i) => i.product._id !== id);
    localStorage.setItem("cart", JSON.stringify(newc));
    dispatch(setCart(newc));
  };
  useEffect(() => {
    if (!localStorage.getItem("tokens")) return navigate("/login");
  });
  if (!cart?.length)
    return (
      <section className="pt-5 mb-4">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <h3 className="text-center">No Item</h3>
          </div>
        </div>
      </section>
    );
  return (
    <>
      <Spin fullscreen spinning={loading} />
      <section className="pt-5 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 mx-auto">
              <div className="row  arrow-divider">
                <div
                  className={clsx("col ", {
                    active: step === 0,
                    done: step > 0,
                  })}
                >
                  <div
                    className={clsx("text-center ", {
                      "text-primary": step === 0,
                      "text-success": step > 0,
                    })}
                  >
                    <i className="la-3x mb-2 fas fa-shopping-cart" />
                    <h3 className="fs-14 fw-600 d-none d-lg-block">
                      1. Giỏ hàng của tôi
                    </h3>
                  </div>
                </div>
                <div className="col done">
                  <div
                    className={clsx("text-center ", {
                      "text-primary": step === 1,
                      "text-success": step > 1,
                    })}
                  >
                    <i className="fa-3x mb-2 opacity-50 fas la-map" />
                    <h3 className="fs-14 fw-600 d-none d-lg-block opacity-50">
                      2. Thông tin vận chuyển
                    </h3>
                  </div>
                </div>

                <div className="col done">
                  <div
                    className={clsx("text-center ", {
                      "text-primary": step === 2,
                      "text-success": step >= 2,
                    })}
                  >
                    <i className="la-3x mb-2 opacity-50 fas fa-check-circle" />
                    <h3 className="fs-14 fw-600 d-none d-lg-block opacity-50">
                      3. Xác nhận
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4" id="cart-summary">
        <div className="container">
          <div className="row">
            {step === 0 && (
              <div className="col-xxl-8 col-xl-10 mx-auto">
                <div className="shadow-sm bg-white p-3 p-lg-4 rounded text-left">
                  <div className="mb-4">
                    <div className="row gutters-5 d-none d-lg-flex border-bottom mb-3 pb-3">
                      <div className="col-md-5 fw-600">Sản phẩm</div>
                      <div className="col fw-600">Giá bán</div>
                      <div className="col fw-600">Thuế</div>
                      <div className="col fw-600">Định lượng</div>
                      <div className="col fw-600">TOÀN BỘ</div>
                      <div className="col-auto fw-600">Tẩy</div>
                    </div>
                    <ul className="list-group list-group-flush">
                      {!!cart?.length &&
                        cart?.map((i) => (
                          <li className="list-group-item px-0 px-lg-3">
                            <div className="row gutters-5">
                              <div className="col-lg-5 d-flex">
                                <span className="mr-2 ml-0">
                                  <img
                                    src={i?.product?.images[0]}
                                    className="img-fit size-60px rounded"
                                    alt="Conopeptide Anti-Wrinkle Moisturizing Facial Cream Shrink Pores Firming Lifting Day Cream Skin Care Products Beauty Face Cream"
                                  />
                                </span>
                                <span className="fs-14 opacity-60">
                                  {i?.name}
                                </span>
                              </div>
                              <div className="col-lg col-4 order-1 order-lg-0 my-3 my-lg-0">
                                <span className="opacity-60 fs-12 d-block d-lg-none">
                                  Giá bán
                                </span>
                                <span className="fw-600 fs-16">
                                  ${i?.product?.price}
                                </span>
                              </div>
                              <div className="col-lg col-4 order-2 order-lg-0 my-3 my-lg-0">
                                <span className="opacity-60 fs-12 d-block d-lg-none">
                                  Thuế
                                </span>
                                <span className="fw-600 fs-16">$0.00</span>
                              </div>
                              <div className="col-lg col-6 order-4 order-lg-0">
                                <div className="row no-gutters align-items-center aiz-plus-minus mr-2 ml-0">
                                  <input
                                    type="number"
                                    name="quantity[2677]"
                                    className="col border-0 text-center flex-grow-1 fs-16 input-number"
                                    value={i?.quantity}
                                    readOnly
                                    min={1}
                                    max={200}
                                    onchange="updateQuantity(2677, this)"
                                  />
                                </div>
                              </div>
                              <div className="col-lg col-4 order-3 order-lg-0 my-3 my-lg-0">
                                <span className="opacity-60 fs-12 d-block d-lg-none">
                                  TOÀN BỘ
                                </span>
                                <span className="fw-600 fs-16 text-primary">
                                  ${i?.product?.price * i?.quantity}
                                </span>
                              </div>
                              <div className="col-lg-auto col-6 order-5 order-lg-0 text-right">
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => deleteCart(i?.product?._id)}
                                  className="btn btn-icon btn-sm btn-soft-primary btn-circle"
                                >
                                  <i className="fas fa-trash" />
                                </a>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="px-3 py-2 mb-4 border-top d-flex justify-content-between">
                    <span className="opacity-60 fs-15">Tổng phụ</span>
                    <span className="fw-600 fs-17">${totalPrice()}</span>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-left order-1 order-md-0">
                      <a href="/" className="btn btn-link">
                        <i className="fas fa-arrow-left" />
                        Quay lại cửa hàng
                      </a>
                    </div>
                    <div className="col-md-6 text-center text-md-right">
                      <div
                        onClick={() => setStep(1)}
                        className="btn btn-primary fw-600"
                      >
                        Tiếp tục vận chuyển
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="col-xxl-8 col-xl-10 mx-auto">
                <div className="shadow-sm bg-white p-4 rounded mb-4">
                  <div className="row gutters-5">
                    <div className="col-md-12 mb-3">
                      <Form
                        defaultValue={{
                          address: user?.address,
                        }}
                        layout="vertical"
                        onFinish={async (form) => {
                          setLoading(true);
                          try {
                            const res = await requestService.post(
                              "/profile/updateUserAddress",
                              {
                                data: {
                                  id: user?._id,
                                  address: form?.address,
                                },
                              }
                            );
                            if (res && res?.data) {
                              setStep(2);
                            }
                          } catch (error) {
                            console.log(error);
                          }
                          setLoading(false);
                        }}
                      >
                        <Form.Item label="Địa chỉ giao hàng" name="address">
                          <TextArea
                            size="large"
                            rows={5}
                            placeholder="Thêm địa chỉ mới"
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            className="btn btn-primary fw-600 "
                            style={{ minWidth: "100px" }}
                            htmlType="submit"
                          >
                            Tiếp tục
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                    <input
                      type="hidden"
                      name="checkout_type"
                      defaultValue="logged"
                    />
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="col-12 mt-lg-0 mt-4" id="cart_summary">
                <div className="card rounded border-0 shadow-sm">
                  <div className="card-header">
                    <h3 className="fs-16 fw-600 mb-0">Tóm lược</h3>
                    <div className="text-right">
                      <span className="badge badge-inline badge-primary">
                        2 Mặt hàng
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="product-name">Sản phẩm</th>
                          <th className="product-total text-right">TOÀN BỘ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart?.map((i) => (
                          <tr className="cart_item">
                            <td className="product-name">
                              {i?.product?.name}
                              <strong className="product-quantity">
                                × {i?.quantity}
                              </strong>
                            </td>
                            <td className="product-total text-right">
                              <span className="pl-4 pr-0">
                                ${i?.product?.price}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <input type="hidden" id="sub_total" defaultValue="81.1" />
                    <table className="table">
                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Tổng phụ</th>
                          <td className="text-right">
                            <span className="fw-600">${totalPrice()}</span>
                          </td>
                        </tr>
                        <tr className="cart-shipping">
                          <th>Thuế</th>
                          <td className="text-right">
                            <span className="font-italic">$0.00</span>
                          </td>
                        </tr>
                        <tr className="cart-shipping">
                          <th>Tổng số vận chuyển</th>
                          <td className="text-right">
                            <span className="font-italic">$0.00</span>
                          </td>
                        </tr>
                        <tr className="cart-total">
                          <th>
                            <span className="strong-600">TOÀN BỘ</span>
                          </th>
                          <td className="text-right">
                            <strong>
                              <span>${totalPrice()}</span>
                            </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="mt-3">
                      <Button
                        className="btn-primary"
                        size="large"
                        style={{ minWidth: "250px" }}
                        onClick={onSubmit}
                        loading={loading}
                      >
                        Xác nhận đặt hàng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;

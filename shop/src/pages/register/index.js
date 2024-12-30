import { Button, Spin, message } from "antd";
import requestService from "api/request";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { setUser } from "store/app";

const Register = () => {
  const [form, setForm] = useState(null);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!form?.name || !form?.email || !form?.password)
      return message.error("Vui lòng nhập đầy đủ thông tin");
    setLoading(true);
    try {
      const res = await requestService.post("/auth/signup", {
        data: {
          ...form,
          refCode: searchParams.get("code") || "",
          roleCode: "CUSTOMER",
        },
      });
      if (res && res.data) {
        dispatch(setUser(res.data?.data?.user));
        window.localStorage.setItem(
          "tokens",
          JSON.stringify(res.data?.data?.tokens)
        );
        navigate("/");
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
    }
    setLoading(false);
  };
  return (
    <section className="gry-bg py-4">
      <Spin fullscreen spinning={loading} />
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8 mx-auto">
              <div className="card">
                <div className="text-center pt-4">
                  <h1 className="h4 fw-600">Tạo một tài khoản.</h1>
                </div>
                <div className="px-4 py-3 py-lg-4">
                  <div className="">
                    <div className="form-default">
                   
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          placeholder="Họ và tên"
                          value={form?.name}
                          onChange={(e)=>setForm({...form,name:e?.target?.value})}
                          name="name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          placeholder="Phone"
                          value={form?.phone}
                          onChange={(e)=>setForm({...form,phone:e?.target?.value})}
                          name="phone"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          defaultValue=""
                          placeholder="E-mail"
                          value={form?.email}
                          onChange={(e)=>setForm({...form,email:e?.target?.value})}
                          name="email"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="mật khẩu"
                          value={form?.password}
                          onChange={(e)=>setForm({...form,password:e?.target?.value})}
                          name="password"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Xác nhận mật khẩu"
                          name="password_confirmation"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="aiz-checkbox">
                          <input type="checkbox" name="checkbox_example_1" />
                          <span className="opacity-60">
                            Bằng cách đăng ký, bạn đồng ý với các điều khoản và
                            điều kiện của chúng tôi.
                          </span>
                          <span className="aiz-square-check" />
                        </label>
                      </div>
                      <div className="mb-5">
                        <Button
                          loading={loading}
                          onClick={onSubmit}
                          className="btn btn-primary btn-block fw-600"
                        >
                          Tạo tài khoản
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Bạn co săn san để tạo một tai khoản?
                    </p>
                    <a href="#/users/login">Đăng nhập</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

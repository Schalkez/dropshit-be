import { Button, message } from "antd";
import requestService from "api/request";
import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAppDispatch } from "store";
import { setUser } from "store/app";

const CreateShop = () => {
  const [form, setForm] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [laoding, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onSubmit = async () => {
    if (!form?.name || !form?.phone || !form?.email || !form?.password)
      return message.error("Vui lòng nhập đầy đủ thông tin");
    setLoading(true);
    try {
      const res = await requestService.post("/auth/signup", {
        data: {
          ...form,
          refCode: form?.refCode,
          roleCode: "SELLER",
        },
      });
      if (res && res.data) {
        dispatch(setUser(res.data?.data?.user));
        window.localStorage.setItem(
          "tokens",
          JSON.stringify(res.data?.data?.tokens)
        );
        navigate("/dashboard-seller");
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
    }
    setLoading(false);
  };
  useEffect(() => {
    setForm({ ...form, refCode: searchParams.get("code") });
  }, [searchParams.get("code")]);
  return (
    <section className="pt-4 mb-4">
      <div className="container">
        <div className="row">
          <div className="col-xxl-5 col-xl-6 col-md-8 mx-auto">
            <div id="shop" className="">
              <input
                type="hidden"
                name="_token"
                defaultValue="ra0SSoOvH7Z7epBFDDyOcCjTrrI1G2119w0NONEJ"
              />{" "}
              <div
                className="bg-white rounded shadow-sm mb-3"
                style={{ border: "1px solid #cccc" }}
              >
                <div className="fs-15 fw-600 p-3 border-bottom">
                  Thông tin cá nhân
                </div>
                <div className="p-3">
                  <div className="form-group text-left">
                    <label>
                      Tên của bạn <span className="text-primary">*</span>
                    </label>
                    <input
                      value={form?.name}
                      onChange={(e: any) =>
                        setForm({ ...form, name: e?.target?.value })
                      }
                      type="text"
                      className="form-control"
                      defaultValue=""
                      placeholder="Tên"
                      name="name"
                    />
                  </div>
                  <div className="form-group text-left">
                    <label>
                      Số điện thoại <span className="text-primary">*</span>
                    </label>
                    <input
                      value={form?.phone}
                      onChange={(e: any) =>
                        setForm({ ...form, phone: e?.target?.value })
                      }
                      type="text"
                      className="form-control"
                      defaultValue=""
                      placeholder="Số điện thoại"
                      name="name"
                    />
                  </div>
                  <div className="form-group text-left">
                    <label>
                      Email của bạn <span className="text-primary">*</span>
                    </label>
                    <input
                      value={form?.email}
                      onChange={(e: any) =>
                        setForm({ ...form, email: e?.target?.value })
                      }
                      type="email"
                      className="form-control"
                      defaultValue=""
                      placeholder="E-mail"
                      name="email"
                    />
                  </div>
                  <div className="form-group text-left">
                    <label>
                      Mật khẩu của bạn <span className="text-primary">*</span>
                    </label>
                    <input
                      value={form?.password}
                      onChange={(e: any) =>
                        setForm({ ...form, password: e?.target?.value })
                      }
                      type="password"
                      className="form-control"
                      placeholder="mật khẩu"
                      name="password"
                    />
                  </div>
                  <div className="form-group text-left">
                    <label>
                      Mã giới thiệu của bạn{" "}
                      <span className="text-primary">*</span>
                    </label>
                    <input
                      value={form?.refCode}
                      onChange={(e: any) =>
                        setForm({ ...form, refCode: e?.target?.value })
                      }
                      type="text"
                      className="form-control"
                      defaultValue=""
                      placeholder="Mã giới thiệu"
                      name="refCode"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button
                  loading={laoding}
                  onClick={onSubmit}
                  className="btn btn-primary fw-600"
                >
                  Đăng ký cửa hàng của bạn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateShop;

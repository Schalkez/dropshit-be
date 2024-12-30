import { Button, Spin, Upload, UploadProps, message } from "antd";
import { useEffect, useState } from "react";
import store, { useAppDispatch, useAppSelector } from "store";
import { UploadOutlined, LeftOutlined } from "@ant-design/icons";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import requestService from "api/request";
import { Link } from "react-router-dom";
import { setUser } from "store/app";

const ApplyVerify = () => {
  const [form, setForm] = useState<any>(null);
  const [bank, setBank] = useState<any>(null);
  const { user } = useAppSelector((state) => state.app) as any;
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) setBank({ ...user?.bankInfo });
  }, [user]);
  const getMe = async () => {
    try {
      const res = await requestService.get("/profile/me");
      if (res && res.data) {
        dispatch(setUser(res.data?.data));
      }
    } catch (error) {
      console.log(error);
      window.localStorage.clear();
    }
  };

  const addBank = async () => {
    try {
      if (
        !bank?.nameBank ||
        !bank?.numberBank ||
        !bank?.authorName ||
        !bank?.branchBank
      )
        return message.error("Điền đầy đủ thông tin");
      setLoading(true);
      const res = await requestService.post("/profile/update-bank", {
        data: {
          ...bank,
        },
      });
      if (res && res?.data) {
        message.success("Đã thêm ngân hàng thành công");
        getMe();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const onSubmit = async () => {
    if (user?.store?.isVerify === "NO_KYC")
      if (
        !form?.nameStore ||
        !form?.phone ||
        !form?.address ||
        !image ||
        !image1
      )
        return message.warning("Vui lòng điền đầy đủ thông tin");

    try {

      if (
        !user?.store ||
        !user?.store?.isVerify ||
        user?.store?.isVerify === "NO_KYC"
      ) {
        if (!image || !image1)
          return message.warning("Vui lòng gửi đầy đủ hình ảnh");
        setLoading(true);
        const res = await requestService.post("/profile/verifyShop", {
          data: {
            nameStore: form?.nameStore,
            phone: form?.phone,
            address: form?.address,
            cmnd_before: image,
            logoStore: form.logoStore,
            cmnd_after: image1,
          },
        });
        if (res && res.data) {
          message.success("Đã gửi thông tin");
          window.location.href = "/dashboard-seller";
        }
      }
      if (user?.store?.isVerify === "SUCCESS") {
        const res = await requestService.post("/profile/updateInfoShop", {
          data: {
            nameStore: form?.nameStore,
            phone: form?.phone,
            address: form?.address,
            logoStore: form.logoStore
          },
        });
        if (res && res.data) {
          message.success("Đã gửi thông tin");
          window.location.href = "/dashboard-seller";
        }
      }
    } catch (error: any) {
      console.log(error);
      message.error(error?.response?.data?.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user) {
      setForm({ ...form, phone: user?.phone });
    }
  }, [user]);

  const props1: UploadProps = {
    name: "file",
    action: `${process.env.REACT_APP_API_URL}/api/upload/file`,
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png" || "image/jpeg";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },

    onChange: (info) => {
      if (info.file?.response?.url) setImage(info.file?.response?.url);
    },
  };
  const props3: UploadProps = {
    name: "file",
    action: `${process.env.REACT_APP_API_URL}/api/upload/file`,
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png" || "image/jpeg";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },

    onChange: (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file?.response?.url) {
        setForm({ ...form, logoStore: info.file?.response?.url });
        setLoading(false)
      }
    },
  };
  const props2: UploadProps = {
    name: "file",
    action: `${process.env.REACT_APP_API_URL}/api/upload/file`,
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png" || "image/jpeg";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },

    onChange: (info) => {
      if (info.file?.response?.url) setImage1(info.file?.response?.url);
    },
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
    if (user?.store) setForm({ ...form, ...user?.store });
  }, [user?.store]);
  return (
    <div className="px-15px px-lg-25px">
      <Spin spinning={loading} fullscreen />
      <div className="aiz-titlebar mt-2 mb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="h3">
              {user?.store?.isVerify === "SUCCESS" && "Cài Đặt Cửa Hàng"}
              {user?.store?.isVerify === "NO_KYC" && "Xác Minh Cửa Hàng"}
              <Link
                to={"/shop/" + user?._id}
                className="btn btn-link btn-sm"
                target="_blank"
              >
                (Ghé thăm cửa hàng)
                <i className="fa fa-external-link" />)
              </Link>
            </h1>
          </div>
        </div>
      </div>
      <div>
        <input
          type="hidden"
          name="_token"
          defaultValue="3sI6QEFPdTdTFaKGtKqr2QCykmyO4NBlhQ0WS2mN"
        />{" "}
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0 h6">
              {user?.store?.isVerify === "NO_KYC"
                ? " Thông tin xác minh"
                : "Thông tin cửa hàng"}
            </h4>
          </div>
          <div className="card-body">
            {/* <div className="row">
              <div className="col-md-2">
                <label>
                  Tên <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-10">
                <input
                  
                  type="text"
                  className="form-control mb-3"
                  placeholder="Tên"
                  name="element_0"
                />
              </div>
            </div> */}
            <Upload

              name="avatar"
              listType="picture-circle"
              className="avatar-uploader my-3"
              showUploadList={false}
              {...props3}
            >
              {form?.logoStore ? <img src={form?.logoStore} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            <div className="row">
              <div className="col-md-2">
                <label>
                  Tên shop <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-10">
                <input
                  value={form?.nameStore}
                  onChange={(e: any) =>
                    setForm({ ...form, nameStore: e?.target?.value })
                  }
                  type="text"
                  className="form-control mb-3"
                  placeholder="Tên shop"
                  name="element_1"
                />
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-2">
                <label>
                  E-mail <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="E-mail"
                  name="element_2"
                />
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-2">
                <label>
                  Địa chỉ <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-10">
                <input
                  value={form?.address}
                  onChange={(e: any) =>
                    setForm({ ...form, address: e?.target?.value })
                  }
                  type="text"
                  className="form-control mb-3"
                  placeholder="Địa chỉ"
                  name="element_3"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2">
                <label>
                  Số điện thoại <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-md-10">
                <input
                  value={form?.phone}
                  onChange={(e: any) =>
                    setForm({ ...form, phone: e?.target?.value })
                  }
                  type="text"
                  className="form-control mb-3"
                  placeholder="Số điện thoại"
                  name="element_4"
                />
              </div>
            </div>

            {(!user?.store || user?.tore?.isVerify === "NO_KYC") && (
              <>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label>CCCD/CMT ( Mặt trước )</label>
                  </div>
                  <div className="col-md-10">
                    <Upload {...props2}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <label>CCCD/CMT ( Mặt sau )</label>
                  </div>
                  <div className="col-md-10">
                    <Upload {...props1}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </div>
                </div>
              </>
            )}

            <div className="text-right mt-4">
              <Button
                loading={loading}
                onClick={onSubmit}
                className="btn btn-primary"
              >
                Áp dụng
              </Button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0 h6">Cài đặt thanh toán</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <label className="col-md-3 col-form-label" htmlFor="bank_name">
                Tên ngân hàng
              </label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="bank_name"
                  defaultValue=""
                  value={bank?.nameBank}
                  onChange={(e: any) =>
                    setBank({ ...bank, nameBank: e?.target?.value })
                  }
                  id="bank_name"
                  className="form-control mb-3"
                  placeholder="Tên ngân hàng"
                />
              </div>
            </div>
            <div className="row">
              <label
                className="col-md-3 col-form-label"
                htmlFor="bank_acc_name"
              >
                Tên tài khoản ngân hàng
              </label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="bank_acc_name"
                  defaultValue=""
                  value={bank?.authorName}
                  onChange={(e: any) =>
                    setBank({ ...bank, authorName: e?.target?.value })
                  }
                  id="bank_acc_name"
                  className="form-control mb-3"
                  placeholder="Tên tài khoản ngân hàng"
                />
              </div>
            </div>
            <div className="row">
              <label className="col-md-3 col-form-label" htmlFor="bank_acc_no">
                Số tài khoản ngân hàng
              </label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="bank_acc_no"
                  defaultValue=""
                  value={bank?.numberBank}
                  onChange={(e: any) =>
                    setBank({ ...bank, numberBank: e?.target?.value })
                  }
                  id="bank_acc_no"
                  className="form-control mb-3"
                  placeholder="Số tài khoản ngân hàng"
                />
              </div>
            </div>
            <div className="row">
              <label
                className="col-md-3 col-form-label"
                htmlFor="bank_routing_no"
              >
                Chi nhánh
              </label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="bank_routing_no"
                  defaultValue=""
                  id="bank_routing_no"
                  value={bank?.branchBank}
                  onChange={(e: any) =>
                    setBank({ ...bank, branchBank: e?.target?.value })
                  }
                  lang="en"
                  className="form-control mb-3"
                  placeholder="Chi nhánh"
                />
              </div>
            </div>
            <div className="text-right mt-4">
              <Button
                loading={loading}
                onClick={addBank}
                className="btn btn-primary"
              >
                Áp dụng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyVerify;

import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  TableProps,
  message,
} from "antd";
import requestService from "api/request";
import React, { useEffect, useState } from "react";

const Customer = () => {
  const [isOpen, setisOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const [callBack, setCallBak] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (form: any) => {
    if (!form?.name || !form?.phone || !form?.email || !form?.address)
      return message.error("Vui lòng nhập đầy đủ thông tin");
    setLoading(true);
    try {
      const res = await requestService.post("/profile/add-virtual", {
        data: {
          ...form,
        },
      });
      if (res && res.data) {
        setCallBak(!callBack);
        setisOpen(false);
        message.success("Đã thêm 1 khách hàng ảo");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra");
      console.log(error);
    }
    setLoading(false);
  };

  const getData = async () => {
    try {
      const res = await requestService.get("/profile/get-virtual");
      if (res && res.data) {
        setData(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [callBack]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: any) => (
        <div>
          {name} <span style={{ color: "rgb(255, 0, 0)" }}>(Virtual)</span>
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="aiz-main-content">
      <div className="px-15px px-lg-25px">
        <div className="aiz-titlebar text-left mt-2 mb-3 row align-items-center">
          <div className="align-items-center">
            <h1 className="h3">Tất cả khách hàng</h1>
          </div>
          <Modal
            open={isOpen}
            onCancel={() => setisOpen(false)}
            footer={null}
            centered
            title="Thêm tài khoản ảo"
          >
            <Form layout="vertical" onFinish={onSubmit}>
              <Form.Item label="Tên" name={"name"}>
                <Input />
              </Form.Item>
              <Form.Item label="Địa chỉ" name={"address"}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name={"email"}>
                <Input />
              </Form.Item>
              <Form.Item label="Số điện thoại" name={"phone"}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" loading={loading}>
                  {" "}
                  Thêm
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <div className="ml-auto" style={{ marginRight: 6 }}>
            <button
              onClick={() => setisOpen(true)}
              id="create_virtual_user"
              type="button"
              className="btn btn-outline-primary btn-block"
            >
              Tạo khách hàng ảo
            </button>
          </div>
        </div>
        <div className="card">
          <Table columns={columns} dataSource={data} />
        </div>
        <div className="modal fade" id="confirm-ban">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title h6">Xác nhận</h5>
                <button type="button" className="close" data-dismiss="modal" />
              </div>
              <div className="modal-body">
                <p>Bạn có thực sự muốn cấm Khách hàng này không?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-dismiss="modal"
                >
                  Huỷ bỏ
                </button>
                <a type="button" id="confirmation" className="btn btn-primary">
                  Tiếp tục!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;

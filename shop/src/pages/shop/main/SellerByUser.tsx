import { Button, Space, Table } from "antd";
import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "store";

const SellerByUser = () => {
  const { user } = useAppSelector((state) => state.app);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await requestService.get("/profile/seller-by-employee");
      if (res && res.data) {
        setData(res.data.data);
      }
    } catch (error) {}
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tên Shop",
      dataIndex: "store",
      render: (store: any) => store?.nameShop || "Chưa verify",
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button>View</Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);
  return (
    <div className="px-15px px-lg-25px">
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default SellerByUser;

import type { RouteObject } from "react-router";
import { useRoutes } from "react-router-dom";
import Login from "../pages/login";
import WrapperRouteComponent from "./WrapperRouteComponent";
import HomePage from "pages/home";
import MainLayout from "components/MainLayout";
import Products from "pages/products";
import Register from "pages/register";
import DashboardEmployee from "pages/dashboard-employee";
import MainDashboardEmployee from "pages/dashboard-employee/MainDashboardEmployee";
import Customer from "pages/dashboard-employee/Customer";
import Pos from "pages/dashboard-employee/Pos";
import CreateShop from "pages/shop/create";
import DashBoardSeller from "pages/shop/main";
import MainDashBoard from "pages/shop/main/MainDashBoard";
import ProductsSeller from "pages/shop/main/ProductsSeller";
import CreateProduct from "pages/products/create";
import StoreHouse from "pages/shop/main/StoreHouse";
import SellerPackages from "pages/shop/main/SellerPackages";
import ApplyVerify from "pages/shop/main/ApplyVerify";
import SellerByUser from "pages/shop/main/SellerByUser";
import Order from "pages/dashboard-employee/Order";
import OrderDetail from "pages/dashboard-employee/OrderDetail";
import OrderStore from "pages/shop/main/OrderStore";
import OrderDetailStore from "pages/shop/main/OrderDetailStore";

import Detail from "pages/detail";
import ProductsFilter from "pages/products-filter";
import DashboardClient from "pages/dashboard-client";
import Deposit from "pages/shop/main/Deposit";
import ShopDetail from "pages/shop/detail";
import Cart from "pages/Cart";
import Search from "pages/search";
import Dashboard from "pages/dashboard-client/Dashboard";
import HistoryPayment from "pages/dashboard-client/HistoryPayment";
import Wallet from "pages/dashboard-client/Wallet";
import Message from "pages/dashboard-client/Message";
import Message1 from "pages/dashboard-client/Message_copy";
import WithDraw from "pages/shop/main/WithDraw";
import MessageDetail from "pages/dashboard-client/MessageDetail";
import MessageDetail1 from "pages/dashboard-client/MessageDetail_copy";
const routeList: RouteObject[] = [
  {
    path: "/",
    element: <WrapperRouteComponent element={<MainLayout />} />,
    children: [
      {
        path: "/dashboard-client",
        element: <WrapperRouteComponent element={<DashboardClient />} />,
        children:[
          {
            path: "",
            element: <WrapperRouteComponent element={<Dashboard  />} />,
          },
          {
            path: "history",
            element: <WrapperRouteComponent element={<HistoryPayment  />} />,
          },
          {
            path: "wallet",
            element: <WrapperRouteComponent element={<Wallet  />} />,
          },
          {
            path: "message",
            element: <WrapperRouteComponent element={<Message  />} />,
          },
          {
            path: "message-detail",
            element: <WrapperRouteComponent element={<MessageDetail  />} />,
          },
        ]
        
      },
      {
        path: "/",
        element: <WrapperRouteComponent element={<HomePage />} />,
      },
      {
        path: "/shop/:id",
        element: <WrapperRouteComponent element={<ShopDetail />} />,
      },
      {
        path: "/products-filter",
        element: <WrapperRouteComponent element={<ProductsFilter />} />,
      },
      {
        path: "/detail/:id",
        element: <WrapperRouteComponent element={<Detail />} />,
      },
      {
        path: "/products",
        element: <WrapperRouteComponent element={<Products />} />,
      },
      {
        path: "/cart",
        element: <WrapperRouteComponent element={<Cart />} />,
      },
      {
        path: "/search",
        element: <WrapperRouteComponent element={<Search />} />,
      },
      {
        path: "/register",
        element: <WrapperRouteComponent element={<Register />} />,
      },
      {
        path: "/login",
        element: <WrapperRouteComponent element={<Login />} />,
      },
      {
        path: "/shop/create",
        element: <WrapperRouteComponent element={<CreateShop />} />,
      },
    ],
  },
  {
    path: "/dashboard-seller",
    element: <WrapperRouteComponent element={<DashBoardSeller />} />,
    children: [
      {
        path: "",
        element: <WrapperRouteComponent element={<MainDashBoard />} />,
      },
      {
        path: "products",
        element: <WrapperRouteComponent element={<ProductsSeller />} />,
      },
      {
        path: "create-product",
        element: <WrapperRouteComponent element={<CreateProduct />} />,
      },
      {
        path: "store-house",
        element: <WrapperRouteComponent element={<StoreHouse />} />,
      },
      {
        path: "message",
        element: <WrapperRouteComponent element={<Message1 />} />,
      },
      {
        path: "message-detail",
        element: <WrapperRouteComponent element={<MessageDetail1 />} />,
      },
      {
        path: "deposit",
        element: <WrapperRouteComponent element={<Deposit />} />,
      },
      {
        path: "seller-packages",
        element: <WrapperRouteComponent element={<SellerPackages />} />,
      },
      {
        path: "apply_for_verification",
        element: <WrapperRouteComponent element={<ApplyVerify />} />,
      },
      {
        path: "setting-store",
        element: <WrapperRouteComponent element={<ApplyVerify />} />,
      },
      {
        path: "orders",
        element: <WrapperRouteComponent element={<OrderStore />} />,
      },
      {
        path: "withdraw",
        element: <WrapperRouteComponent element={<WithDraw />} />,
      },
      {
        path: "order-detail",
        element: <WrapperRouteComponent element={<OrderDetailStore />} />,
      },
    ]
  },

  {
    path: "/dashboard-employee",
    element: <WrapperRouteComponent element={<DashboardEmployee />} />,
    children: [
      {
        path: "",
        element: <WrapperRouteComponent element={<MainDashboardEmployee />} />,
      },
      {
        path: "customer",
        element: <WrapperRouteComponent element={<Customer />} />,
      },
      {
        path: "pos",
        element: <WrapperRouteComponent element={<Pos />} />,
      },
      {
        path: "sales-main",
        element: <WrapperRouteComponent element={<SellerByUser />} />,
      },
      {
        path: "orders",
        element: <WrapperRouteComponent element={<Order />} />,
      },
      {
        path: "order-detail",
        element: <WrapperRouteComponent element={<OrderDetail />} />,
      },
    ],
  },
];
const RenderRouter = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;

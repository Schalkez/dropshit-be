import { ProtectedRequest, RoleRequest } from "app-request";
import asyncHandler from "../helpers/asyncHandler";
import UserRepo from "../database/repository/UserRepo";

import PaymentRepo from "../database/repository/PaymentRepo";
import Sample, { SampleModel } from "../database/model/Payment";
import { ResultModel } from "../database/model/Result";
import TicKet, { Ratio, TicketBuyModel } from "../database/model/TicketBuy";
import History, { HistoryModel } from "../database/model/History";
import cron from "node-cron";
import WithDraw, { WithDrawModel } from "../database/model/WithDraw";
import {
  BadRequestResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from "../core/ApiResponse";
import { BanInfoModel } from "../database/model/BankInfo";
import { UserModel } from "../database/model/User";
import { ProductModel } from "../database/model/Products";
import { RoleModel } from "../database/model/Role";
import { PackageModel } from "../database/model/Package";
import { OrderModel } from "../database/model/Order";
import { BranchModel } from "../database/model/Branch";
import { ConfigModel } from "../database/model/Config";
import { MessageModel } from "../database/model/Message";
import { RoomModel } from "../database/model/Room";
import moment from "moment";
import Conservation from "../database/model/Conservation";
import mongoose, { Types } from "mongoose";
import { CategoryModel } from "../database/model/Category";
import { SettingModel } from "../database/model/Setting";

import { Socket } from "socket.io";
import dayjs from "dayjs";

export const UserControllers = {
  getHisDeposit: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1;
  }),

  getOrderNotPayment: asyncHandler(async (req: any, res) => {
    const order = await OrderModel.find({
      isPayment: false,
      seller: req.user._id,
    });

    return new SuccessResponse("1", order).send(res);
  }),
  buyPack: asyncHandler(async (req: any, res) => {
    const pack = await PackageModel.findById(req.body.packageID);
    if (!pack)
      return new BadRequestResponse("Không tìm thấy gói này").send(res);

    if ((pack.price || 0) > req.user.money)
      return new BadRequestResponse("Số dư không đủ").send(res);
    req.user.package = pack._id;
    req.user.money = req.user.money - (pack.price || 0);
    await UserRepo.updateInfo(req.user);
    return new SuccessMsgResponse("tt").send(res);
  }),
  updateEmploy: asyncHandler(async (req: any, res) => {
    const { keys, email, phone, password, money, id } = req.body;
    const user = await UserModel.findById(id);
    if (!user) return new BadRequestResponse("Not user").send(res);
    user.keys = keys ? keys : user.keys;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.password = password || user.password;
    user.shopWallet = money || user.shopWallet;
    await user.save();
    return new SuccessMsgResponse("ok").send(res);
  }),

  getConservationUser: asyncHandler(async (req: any, res) => {
    const conservation = await Conservation.find({
      user: req.params.id,
    }).populate("store user product");
    return new SuccessResponse("ok", conservation).send(res);
  }),

  // Seller get his conservation
  getConservationStore: asyncHandler(async (req: any, res) => {
    const conservations = await Conservation.find({
      store: req.params.id,
    }).populate("store user product");

    // for (let conservation of conservations) {
    //   conservation.isView = true;
    //   await conservation.save();
    // }

    return new SuccessResponse("ok", conservations).send(res);
  }),

  getMessageUser: asyncHandler(async (req: any, res) => {
    const conservation = await Conservation.findOne({
      store: req.params.id,
      user: req?.user?._id,
    })
      .populate("product")
      .populate("store");

    return new SuccessResponse("ok", conservation).send(res);
  }),
  getMessageStore: asyncHandler(async (req: any, res) => {
    const id = req.query.user;
    const conservation = await Conservation.findOne({
      store: req?.user?._id,
      user: req.params.id,
    }).populate("product");

    if (conservation) {
      conservation.isView = true;
      await conservation.save();
    }

    return new SuccessResponse("ok", conservation).send(res);
  }),
  chatMessage: asyncHandler(async (req: any, res) => {
    const { store, user, text, product, sender, type } = req.body;
    const conservation = await Conservation.findOne({
      store,
      user,
    });
    if (!conservation) {
      const newMessage = new Conservation({
        store,
        product: product,
        user: user,
        messages: [{ text, type, time: new Date().getTime() }],
      });
      await newMessage.save();
    } else {
      await Conservation.findOneAndUpdate(
        { store: store, user: user },
        {
          $push: { messages: { text, type, time: new Date().getTime() } },
        },
        { new: true }
      );
    }

    return res.status(200).json({ message: "Message sent successfully" });
  }),

  updateProfileUser: asyncHandler(async (req: any, res) => {
    const {
      id,
      nameStore,
      cmndNumber,
      email,
      password,
      views,
      nameBank,
      numberBank,
      authorName,
      deliveryWallet,
      shopWallet,
      packageId,
      stars,
      avatar,
    } = req.body;

    const user = await UserModel.findById(id);
    if (!user) return new BadRequestResponse("Không tìm thấy user").send(res);

    if (avatar) {
      user.avatar = avatar;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    if (nameStore) {
      user.store.nameStore = nameStore;
    }

    if (cmndNumber) {
      user.store.cmndNumber = cmndNumber;
    }

    if (packageId) {
      user.store.package = {
        name: packageId,
        createdAt: dayjs().toISOString(),
      };
    }

    if (user.store) {
      user.store.views = views || user.store.views;
      user.store.stars = stars || user.store.stars;
    }
    // user.store.views = views || user.store.views || 50;

    if (user.bankInfo) {
      user.bankInfo.nameBank = nameBank || user.bankInfo.nameBank;
      user.bankInfo.numberBank = numberBank || user.bankInfo.numberBank;
      user.bankInfo.authorName = authorName || user.bankInfo.authorName;
    } else {
      user.bankInfo = {
        nameBank,
        authorName,
        branchBank: "",
        numberBank,
        isApplyOnce: true,
      };
    }

    user.deliveryWallet = deliveryWallet || user.deliveryWallet;
    user.shopWallet = shopWallet || user.shopWallet;

    await user.save();
    return new SuccessMsgResponse("ok").send(res);
  }),

  getUserProfile: asyncHandler(async (req: any, res) => {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return new BadRequestResponse("Không tìm thấy user này").send(res);
    const countProduct = await ProductModel.countDocuments({
      sellers: user?._id,
    });

    const countOrder = await OrderModel.countDocuments({ seller: user._id });

    const payments = await SampleModel.find({
      user: user?._id,
      isResolve: "RESOLVE",
    });
    const withDraws = await WithDrawModel.find({
      user: user?._id,
      isResolve: "RESOLVE",
    });
    let totalPayment = 0;
    let totalWithdraw = 0;
    payments.forEach((element) => {
      totalPayment += element.moneyPayment;
    });
    withDraws.forEach((element) => {
      totalWithdraw += element.moneyWithDraw;
    });
    return new SuccessResponse("ok", {
      user,
      countOrder,
      countProduct,
      totalPayment,
      totalWithdraw,
    }).send(res);
  }),

  getDataShop: asyncHandler(async (req: any, res) => {
    const countProduct = await ProductModel.countDocuments({
      sellers: req?.user?._id,
    });
    const countOrderNEW = await OrderModel.countDocuments({
      seller: req?.user?._id,
      status: "PENDING",
    });
    const countOrderOnTheWay = await OrderModel.countDocuments({
      seller: req?.user?._id,
      status: "ON_THE_WAY",
    });
    const countOrderDelivered = await OrderModel.countDocuments({
      seller: req?.user?._id,
      status: "DELIVERED",
    });

    const countOrder = await OrderModel.countDocuments({
      seller: req?.user?._id,
    });

    // Lấy ngày đầu tiên của tháng hiện tại
    const firstDayOfMonth = moment().startOf("month");

    // Lấy ngày cuối cùng của tháng hiện tại
    const lastDayOfMonth = moment().endOf("month");

    // Lấy ngày đầu tiên của tháng trước
    const firstDayOfLastMonth = moment().subtract(1, "months").startOf("month");

    // Lấy ngày cuối cùng của tháng trước
    const lastDayOfLastMonth = moment().subtract(1, "months").endOf("month");

    // const orders = await OrderModel.find({
    //   seller: req?.user?._id,
    //   isPayment: true,
    //   status: "DELIVERED",
    // });

    const allOrders = await OrderModel.find({
      seller: req?.user?._id,
    }).lean();

    const doneOrders = allOrders.filter(
      (order) => order.status === "DELIVERED" && order.isPayment
    );

    const allOrdersTotalPrice = allOrders.reduce((acc, order) => {
      return acc + (order.gia_kho || 0);
    }, 0);

    const needResolveOrders = allOrders.filter((order) => !order.isPayment);

    const needResolveOrdersTotalPrice = needResolveOrders.reduce(
      (acc, order) => {
        return acc + (order.gia_kho || 0);
      },
      0
    );

    // Lọc các đơn hàng trong tháng hiện tại
    const ordersInCurrentMonth = doneOrders.filter((order) => {
      // Kiểm tra nếu ngày tạo đơn hàng nằm trong khoảng từ firstDayOfMonth đến lastDayOfMonth
      return moment(order.createdAt).isBetween(
        firstDayOfMonth,
        lastDayOfMonth,
        null,
        "[]"
      );
    });

    // Tính tổng số tiền đã bán trong tháng hiện tại
    let totalRevenueCurrentMonth = 0;
    ordersInCurrentMonth.forEach((order) => {
      totalRevenueCurrentMonth += order.tongtien || 0;
    });

    // Lọc các đơn hàng trong tháng trước
    const ordersInLastMonth = doneOrders.filter((order) => {
      // Kiểm tra nếu ngày tạo đơn hàng nằm trong khoảng từ firstDayOfLastMonth đến lastDayOfLastMonth
      return moment(order.createdAt).isBetween(
        firstDayOfLastMonth,
        lastDayOfLastMonth,
        null,
        "[]"
      );
    });

    // Tính tổng số tiền đã bán trong tháng trước
    let totalRevenueLastMonth = 0;
    ordersInLastMonth.forEach((order) => {
      totalRevenueLastMonth += order.tongtien || 0;
    });

    let totalProfit = 0;
    let totalRevenue = 0;

    doneOrders.forEach((item) => {
      totalProfit += item.profit || 0;
      totalRevenue += item.tongtien || 0;
    });

    const user = await UserModel.findById(req?.user?._id).lean();

    return new SuccessResponse("ok", {
      countOrderNEW,
      countOrder,
      countProduct,
      totalProfit,
      totalRevenue,
      countOrderOnTheWay,
      countOrderDelivered,
      allOrdersTotalPrice,
      totalRevenueLastMonth,
      totalRevenueCurrentMonth,
      needResolveOrdersTotalPrice,
      package: user?.store.package,
    }).send(res);
  }),
  addMessage: asyncHandler(async (req: any, res) => {
    const { user, room, message } = req.body;
    const roomF = await RoomModel.findOne({ room });
    if (roomF)
      await RoomModel.create({
        room,
        user,
      });
    await MessageModel.create({
      room: room,
      user,
      message,
    });
    return new SuccessMsgResponse("ok").send(res);
  }),

  getRoom: asyncHandler(async (req: any, res) => {
    const rooms = await RoomModel.find({ user: req.user?._id });
    return new SuccessResponse("ok", rooms).send(res);
  }),

  getMessage: asyncHandler(async (req: any, res) => {
    const msg = await MessageModel.find({ room: req.body.room });
    return new SuccessResponse("ok", msg).send(res);
  }),
  searchDataUser: asyncHandler(async (req: any, res) => {
    const products = await ProductModel.find({
      name: { $regex: new RegExp(req.query.key, "i") },
    }).limit(10);
    const role = await RoleModel.findOne({ code: "SELLER" });
    if (!role) return new BadRequestResponse("No Role").send(res);
    const store = await UserModel.find({
      "store.nameStore": { $regex: new RegExp(req.query.key, "i") },
      roles: role._id,
    }).limit(10);
    return new SuccessResponse("ok", {
      products,
      store,
    }).send(res);
  }),
  updateUserAddress: asyncHandler(async (req: any, res) => {
    await UserModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          address: [req.body.address],
        },
      }
    );
    return new SuccessMsgResponse("ok").send(res);
  }),
  getProductsByStore: asyncHandler(async (req: any, res) => {
    const products = await ProductModel.find({
      sellers: req.params.user,
    });

    return new SuccessResponse("ok", products).send(res);
  }),
  getShopDetail: asyncHandler(async (req: any, res) => {
    const role = await RoleModel.findOne({ code: "SELLER" });
    if (!role) return new BadRequestResponse("Không có cửa hàng này").send(res);
    const shop = await UserModel.findOne({
      _id: req.params.id,
      roles: { $in: [role?._id] },
    });
    return new SuccessResponse("ok", shop).send(res);
  }),

  getProductsFilter: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.per_page) || 40;
    const category = req.query.category;
    const searchQuery = {} as any;
    if (category) {
      searchQuery.category = category;
    }
    const products = await ProductModel.find(searchQuery)
      .populate("user")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await ProductModel.countDocuments();
    return new SuccessResponse("tt", { products, total }).send(res);
  }),

  getProductDetail: asyncHandler(async (req: any, res) => {
    const product = await ProductModel.findById(req.params.id).populate("user");
    return new SuccessResponse("tt", product).send(res);
  }),

  getProductByCategory: asyncHandler(async (req: any, res) => {
    const products = await ProductModel.find({
      category: req.params.category,
    }).limit(6);
    return new SuccessResponse("tt", products).send(res);
  }),

  getAllStore: asyncHandler(async (req: any, res) => {
    const role = await RoleModel.findOne({
      code: "SELLER",
    });
    if (!role) return new BadRequestResponse("Có lỗi xảy ra").send(res);
    const stores = await UserModel.find({ roles: { $in: [role._id] } });

    return new SuccessResponse("tt", stores).send(res);
  }),

  getOrderByStore: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.per_page) || 40;

    const orders = await OrderModel.find({
      seller: req.user._id,
    })
      .populate("customer")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await OrderModel.count({
      seller: req.user._id,
    });

    return new SuccessResponse("Success", { orders, total }).send(res);
  }),

  itemsExport: asyncHandler(async (req: any, res) => {
    const items = req.body.items;

    if (!items || items.length === 0) {
      return new BadRequestResponse("Không có đơn nào được chọn").send(res);
    }

    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return new BadRequestResponse("Không tìm thấy user").send(res);
    }

    const deliveryWallet = user.deliveryWallet;

    const orders = await OrderModel.find({
      _id: { $in: items },
    }).lean();

    const total = orders.reduce(
      (acc, order) => acc + (Number(order.gia_kho) || 0),
      0
    );

    if (total > deliveryWallet) {
      return new BadRequestResponse("Số dư không đủ").send(res);
    }

    await OrderModel.updateMany(
      { _id: { $in: items } }, // Áp dụng cho tất cả items
      [
        {
          $set: {
            isPayment: true, // Đặt isPayment thành true cho tất cả
            status: {
              $cond: {
                if: { $eq: ["$status", "PENDING"] }, // Nếu status là "PENDING"
                then: "PICKED_UP", // Thay đổi thành "PICKED_UP"
                else: "$status", // Giữ nguyên trạng thái hiện tại
              },
            },
          },
        },
      ]
    );

    await UserModel.updateOne(
      { _id: req.user._id },
      { $inc: { deliveryWallet: -total } }
    );

    const products = await ProductModel.find({
      user: req.user._id,
    });
    return new SuccessResponse("ok", products).send(res);
  }),

  updateOrder: asyncHandler(async (req: any, res) => {
    const plusMoney = req.body.plusMoney;

    if (typeof plusMoney === "number" && plusMoney < 0) {
      return new BadRequestResponse("Phải lớn hơn 0").send(res);
    }

    const order = await OrderModel.findById(req.body.orderId);
    if (!order) return new BadRequestResponse("Không tìm thấy").send(res);
    order.status = req.body.status || order.status;
    order.isPayment = req.body.isPayment || order.isPayment;

    if (req.body.status == "DELIVERED" && plusMoney) {
      await UserModel.updateOne(
        { _id: order.seller },
        {
          $inc: {
            shopWallet: plusMoney,
          },
        }
      );
    }

    await order.save();
    return new SuccessMsgResponse("Đã update").send(res);
  }),
  getOrderByEmployee: asyncHandler(async (req: any, res) => {
    const orders = await OrderModel.find({
      employee: req.user._id,
    }).populate("customer user");
    return new SuccessResponse("Success", orders).send(res);
  }),

  getOrderAll: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search;
    const status = req.query.status;
    const isPayMentStore = req.query.isPaymentStore;
    let query: any = {};

    if (status) {
      query.status = status;
    }

    if (isPayMentStore) {
      query.isPayMentStore = isPayMentStore == "1";
    }

    const limit = parseInt(req.query.per_page) || 20;

    // Aggregation pipeline
    const pipeline: any[] = [
      // Sorting
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users", // Collection name for User
          localField: "seller",
          foreignField: "_id",
          as: "seller",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $addFields: {
          seller: { $arrayElemAt: ["$seller", 0] },
          customer: { $arrayElemAt: ["$customer", 0] },
        },
      },
    ];

    // Add search query if `search` is provided
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { "seller.email": { $regex: new RegExp(search, "i") } }, // Search by seller's email
            { "customer.name": { $regex: new RegExp(search, "i") } }, // Search by customer's name
          ],
        },
      });
    }

    // Add additional filters to the match stage
    pipeline.push({ $match: query });

    // Pagination
    pipeline.push({ $skip: (page - 1) * limit }, { $limit: limit });

    // Execute aggregation
    const orders = await OrderModel.aggregate(pipeline);

    // Get total count
    const totalPipeline = pipeline.filter(
      (stage) => !["$skip", "$limit", "$sort"].includes(Object.keys(stage)[0])
    );
    totalPipeline.push({ $count: "total" });

    const totalResult = await OrderModel.aggregate(totalPipeline);
    const total = totalResult[0]?.total || 0;

    return new SuccessResponse("Success", { orders, total }).send(res);
  }),

  resolvePaymentOrder: asyncHandler(async (req: any, res) => {
    const order = await OrderModel.findById(req.body.id);
    if (!order)
      return new BadRequestResponse("Không tìm thấy đơn hàng này").send(res);
    const user = await UserModel.findById(req.user?._id);
    if (!user)
      return new BadRequestResponse("Không tìm thấy người dùng này").send(res);
    order.isPayMentStore = true;
    order.status = "CONFIRM";
    if (user.deliveryWallet < (order.gia_kho || 0))
      return new BadRequestResponse("Shop vui lòng nạp thêm tiền").send(res);
    user.deliveryWallet = user.deliveryWallet - (order.gia_kho || 0);
    await order.save();
    await user.save();
    return new SuccessMsgResponse("ok").send(res);
  }),

  // TODO: ORDER

  addCart: asyncHandler(async (req: any, res) => {
    const {
      products,
      user_customer,
      chosenSeller,
      contactName,
      note,
      contactPhone,
    } = req.body;

    // const userStore = (await UserModel.findById(user_store).populate(
    //   "package"
    // )) as any;
    // const profit = await ConfigModel.findOne({
    //   name: "PROFIT",
    // });
    // if (!userStore) {
    //   return new SuccessMsgResponse("tt").send(res);
    // }
    // let tong_gia_kho = 0;

    // products.forEach((item: any) => {
    //   tong_gia_kho =
    //     tong_gia_kho + parseFloat(item?.product?.price) * item?.quantity;
    // });

    const gia_tung_product = products.map((product: any) => {
      const tong_gia_chot =
        Number(product.product.finalPrice) * Number(product.quantity);

      const tong_gia_kho =
        Number(product.product.price) * Number(product.quantity);

      const profit = tong_gia_chot - tong_gia_kho;

      return {
        profit,
        gia_kho: tong_gia_kho,
        tongtien: tong_gia_chot,
      };
    });

    console.log(gia_tung_product);

    const { profit, gia_kho, tongtien } = gia_tung_product.reduce(
      (acc: any, gia: any) => ({
        ...acc,
        profit: acc.profit + gia.profit,
        gia_kho: acc.gia_kho + gia.gia_kho,
        tongtien: acc.tongtien + gia.tongtien,
      }),
      {
        profit: 0,
        gia_kho: 0,
        tongtien: 0,
      }
    );

    const order = OrderModel.create({
      product: products,
      // gia_kho:
      //   tong_gia_kho -
      //   (tong_gia_kho * Number.parseFloat(userStore?.package?.profit)) / 100,
      // profit:
      //   (tong_gia_kho * Number.parseFloat(userStore?.package?.profit)) / 100,
      profit,
      gia_kho,
      tongtien,
      seller: chosenSeller,
      customer: user_customer,
      contactName,
      contactPhone,
      note,
    });
    return new SuccessMsgResponse("tt").send(res);
  }),
  getSellerByEmployee: asyncHandler(async (req: any, res) => {
    const seller = await UserModel.find({
      parentCode: req.user?.code,
    });
    return new SuccessResponse("tt", seller).send(res);
  }),

  updateInfoShop: asyncHandler(async (req: any, res) => {
    const {
      nameStore,
      phone,
      address,
      logoStore,
      isApplyOnce,
      email,
      packageId,
      cmndNumber,
    } = req.body;
    const user = await UserModel.findById(req.user._id);
    if (!user) return new BadRequestResponse("Không tìm thấy user").send(res);
    user.store = {
      address,
      cmndNumber,
      package: { name: packageId, createdAt: dayjs().toISOString() },
      email,
      isApplyOnce,
      cmnd: {
        ...user?.store?.cmnd,
      },
      isVerify: user.store?.isVerify,
      logoStore: logoStore || "",
      nameStore: nameStore || user.store?.nameStore,
      phone: phone || user.store?.phone,
      views: (user?.store?.views || 0) + 1000,
    };
    await UserRepo.updateInfo(user);
    return new SuccessMsgResponse("Đã update User").send(res);
  }),

  verifyShop: asyncHandler(async (req: any, res) => {
    const {
      nameStore,
      phone,
      address,
      cmnd_before,
      cmnd_after,
      cmndNumber,
      isApplyOnce,
      packageId,
      email,
    } = req.body;

    const user = await UserModel.findById(req.user._id);
    if (!user) return new BadRequestResponse("Không tìm thấy user").send(res);
    user.store = {
      email,
      cmndNumber,
      address,
      isApplyOnce,
      package: { name: packageId, createdAt: dayjs().toISOString() },
      cmnd: {
        after: cmnd_after,
        before: cmnd_before,
      },
      isVerify: "PENDING",
      logoStore: "",
      nameStore,
      phone,
      views: 0,
    };
    await UserRepo.updateInfo(user);
    return new SuccessMsgResponse("Đã update User").send(res);
  }),
  getPackage: asyncHandler(async (req: any, res) => {
    const packages = await PackageModel.find().sort({ createdAt: 1 });
    return new SuccessResponse("tt", packages).send(res);
  }),

  getProductsStore: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.per_page) || 30;
    const category = req.query.category;
    const name_key = req.query.name_key;

    let query = {} as any;

    console.log("FILTER");

    if (category) {
      const existCategory = await CategoryModel.findOne({
        "subCategories.tag": category,
      });

      query.category = existCategory?.subCategories?.filter(
        (subCategory) => subCategory.tag === category
      )[0]?.id;
    }

    const filterName: any = {};

    if (name_key) {
      filterName.name = name_key;
    }

    const subCategoryFilter: any = {};
    if (query?.category) {
      subCategoryFilter.subCategory = query.category;
    }

    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : null;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;

    const priceFilter: any = {};

    if (minPrice !== null && maxPrice !== null) {
      priceFilter.price = {
        $expr: {
          $and: [
            { $gt: [{ $toDouble: "$price" }, minPrice] },
            { $lt: [{ $toDouble: "$price" }, maxPrice] },
          ],
        },
      };
    } else if (minPrice !== null) {
      priceFilter.price = {
        $expr: { $lt: [{ $toDouble: "$price" }, minPrice] },
      };
    } else if (maxPrice !== null) {
      priceFilter.price = {
        $expr: { $gt: [{ $toDouble: "$price" }, maxPrice] },
      };
    }

    const filterQuantity: any = {};
    const quantity = req.query.quantity ? parseFloat(req.query.quantity) : null;

    if (quantity) {
      filterQuantity.quantity = quantity;
    }

    const products = await ProductModel.find({
      ...filterName,
      ...subCategoryFilter,
      ...priceFilter.price,
      ...filterQuantity,
      $and: [
        { sellers: { $nin: [req.user._id] } }, // Loại bỏ sản phẩm có ID user trong sellers
        {
          $or: [
            { sellers: { $exists: true } }, // sellers không tồn tại (undefined)
            { sellers: { $size: 0 } }, // sellers là mảng rỗng
            { sellers: null }, // sellers là null
          ],
        },
      ],
    })
      .populate("category branch")
      .populate("sellers", "-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await ProductModel.countDocuments({
      ...filterName,
      ...subCategoryFilter,
      ...priceFilter.price,
      ...filterQuantity,
      $and: [
        { sellers: { $nin: [req.user._id] } }, // Loại bỏ sản phẩm có ID user trong sellers
        {
          $or: [
            { sellers: { $exists: false } }, // sellers không tồn tại (undefined)
            { sellers: { $size: 0 } }, // sellers là mảng rỗng
            { sellers: null }, // sellers là null
          ],
        },
      ],
    });

    res.json({ total: totalCount, data: products });
  }),

  addProductUser: asyncHandler(async (req: any, res) => {
    // const products = await ProductModel.find({
    //   _id: { $in: req.body.product_ids },
    // });

    // if (!products?.length) {
    //   return new BadRequestResponse("Không tìm thấy sản phẩm này").send(res);
    // }

    // const user = (await UserModel.findById(req.user?._id)) as any;
    // const employee = await UserModel.findOne({
    //   code: user?.parentCode,
    // });

    // async function getRandomBranchId() {
    //   const count = await BranchModel.countDocuments();
    //   const randomIndex = Math.floor(Math.random() * count);
    //   const randomBranch = await BranchModel.findOne().skip(randomIndex);
    //   return randomBranch?._id;
    // }

    // if (!user) {
    //   return new BadRequestResponse("Không tìm thấy user").send(res);
    // }

    // user.productQuantity = (user.productQuantity || 0) + products?.length;

    // if (
    //   (user.productQuantity || 0) + products?.length >
    //   (user?.package?.limit || 0)
    // ) {
    //   return new BadRequestResponse("Đã quá giới hạn gói").send(res);
    // }

    // const branchId = await getRandomBranchId();

    // await ProductModel.create(
    //   products.map((product) => ({
    //     branch: product?.branch || branchId,
    //     category: product?.category,
    //     images: product?.images,
    //     quantity: product.quantity,
    //     description: product?.description,
    //     name: product?.name,
    //     price: product.price,
    //     user: user._id,
    //     // employee: employee?._id, // Gán _id của người dùng cho trường user
    //   }))
    // );
    // await UserRepo.updateInfo(user);

    if (!req.body.product_ids?.length) {
      return new BadRequestResponse("Vui lòng chọn sản phẩm").send(res);
    }

    if (!req.user?._id) {
      return new BadRequestResponse("Hãy đăng nhập").send(res);
    }

    await ProductModel.updateMany(
      { _id: { $in: req.body.product_ids } }, // Tìm sản phẩm có _id nằm trong mảng productIds
      { $addToSet: { sellers: req.user._id } } // Thêm sellerId vào trường sellers (nếu chưa tồn tại)
    );

    return new SuccessMsgResponse("Thêm sản phẩm thành công").send(res);
  }),
  getShopProducts: asyncHandler(async (req: any, res) => {
    console.log(req.params.id);
    console.log(123);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.per_page) || 50;
    const totalCount = await ProductModel.countDocuments();

    const products = await ProductModel.find({
      sellers: { $in: [req.params.id] },
    })
      .populate("sellers category branch")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ total: totalCount, data: products });
  }),
  gteProductByUser: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.per_page) || 50;
    console.log(req.params.id);
    // const totalCount = await ProductModel.countDocuments();
    const products = await ProductModel.find({
      sellers: req.params.id,
    })
      .populate("category branch")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ total: 0, data: products });
  }),
  addProduct: asyncHandler(async (req: any, res) => {
    const {
      branch,
      category,
      description,
      images,
      price,
      quantity,
      user,
      name,
    } = req.body;

    const employee = await UserModel.findOne({ code: req.user.parentCode });
    const data = await ProductModel.create({
      branch,
      category,
      description,
      images,
      price,
      quantity,
      user,
      name,
      employee: employee?._id,
    });
    return new SuccessMsgResponse("Success").send(res);
  }),

  getVirtualCustomer: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.per_page) || 10;
    const totalCount = await UserModel.countDocuments();
    const products = await UserModel.find({ isCustomerVirtual: true })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ total: totalCount, data: products });
  }),

  addVirtualCustomer: asyncHandler(async (req: ProtectedRequest, res) => {
    const role = await RoleModel.findOne({ code: "CUSTOMER" });

    if (!role) {
      return new BadRequestResponse("Không tìm thấy role").send(res);
    }

    const user = await UserModel.create({
      name: req.body.name,
      address: [req.body.address],
      isCustomerVirtual: true,
      email: req.body.email,
      roles: [role],
      phone: req.body.phone,
      money: 10000000,
      updatedAt: new Date().getTime(),
      createdAt: new Date().getTime(),
    });

    return new SuccessMsgResponse("tt").send(res);
  }),
  getMe: asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findById(req.user._id);
    const config = await ConfigModel.findOne({
      name: "PROFIT",
    });

    if (!user) return new BadRequestResponse("Không tìm thấy user").send(res);
    return new SuccessResponse("tt", {
      ...user,
      profit: config?.value,
    }).send(res);
  }),
  updateBank: asyncHandler(async (req: ProtectedRequest, res) => {
    const { nameBank, numberBank, authorName, branchBank, isApplyOnce } =
      req.body;
    const user = await UserRepo.findPrivateProfileById(req.user._id);
    if (!user) throw new BadRequestResponse("User not registered").send(res);
    user.bankInfo = {
      authorName,
      nameBank,
      numberBank,
      branchBank,
      isApplyOnce,
    };
    await UserRepo.updateInfo(user);

    return new SuccessResponse(
      "Bạn đã cập nhật thành công tài khoản ngân hàng",
      user
    ).send(res);
  }),

  payment: asyncHandler(async (req: ProtectedRequest, res) => {
    const { moneyPayment, content } = req.body;
    const payments = await PaymentRepo.findBy15Minute(req.user._id);
    if (payments) {
      // return new BadRequestResponse(
      //   "Bạn đang có 1 thanh toán vui lòng đợi sau 15 phút nữa"
      // ).send(res);
    }

    const newPayment = await PaymentRepo.create({
      moneyPayment,
      user: req.user._id,
      content,
    } as Sample);

    return new SuccessResponse("Vui lòng chờ", { newPayment }).send(res);
  }),

  withDraw: asyncHandler(async (req: ProtectedRequest, res) => {
    const { moneyWithDraw } = req.body;
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const user = await UserRepo.findById(req.user._id);
    if (!user)
      return new BadRequestResponse("Không tìm thấy người dùng này").send(res);
    if (user.shopWallet < moneyWithDraw)
      return new BadRequestResponse(
        "Số tiền trong tài khoản của bạn không đủ"
      ).send(res);
    // user.shopWallet = user.shopWallet - moneyWithDraw;
    const payments = await WithDrawModel.findOne({
      user: req.user._id,
      status: false,
      createdAt: { $gte: fifteenMinutesAgo },
    });

    if (payments) {
      // return new BadRequestResponse(
      //   "Bạn đang có 1 thanh toán vui lòng đợi sau 15 phút nữa"
      // ).send(res);
    }

    // await UserRepo.updateInfo(user);

    const newPayment = await WithDrawModel.create({
      moneyWithDraw,
      user: req.user._id,
    } as WithDraw);

    return new SuccessResponse(
      "Đã rút thành công vui long đợi tiền về tài khaonr",
      { newPayment }
    ).send(res);
  }),

  buyTicket: asyncHandler(async (req: ProtectedRequest, res) => {
    const { category, result, ticket, price } = req.body;
    if (!ticket.length)
      return new BadRequestResponse("Bạn chưa chọn kết quả").send(res);
    if (price <= 0)
      return new BadRequestResponse("Tiền cược không hợp lệ").send(res);
    const resultCurrent = await ResultModel.findOne({ id_custom: result });
    if (!resultCurrent)
      return new BadRequestResponse("không tìm thấy kì này").send(res);
    const userCurrent = await UserRepo.findById(req.user._id);
    if (!userCurrent)
      return new BadRequestResponse("Người dùng không tồn tại").send(res);
    if (userCurrent.deliveryWallet < price)
      return new BadRequestResponse(
        "Số tiền trong tài khoản của bạn không đủ"
      ).send(res);
    const ticketBuyNew = await TicketBuyModel.create({
      category,
      price,
      result: resultCurrent._id,
      ticket,
      user: req.user._id,
    } as TicKet);

    const history = await HistoryModel.create({
      category,
      price,
      priceWin: 0,
      ticket,
      result: resultCurrent._id,
      user: req.user._id,
      ticketId: ticketBuyNew._id + "",
    } as History);
    userCurrent.deliveryWallet = userCurrent.deliveryWallet - price;
    await UserRepo.updateInfo(userCurrent);
    return new SuccessResponse("Bạn đã đặt vé thành công", {
      history,
    }).send(res);
  }),

  lotteryNow: asyncHandler(async (req: ProtectedRequest, res) => {
    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + 1 * 60000);
    const result = await ResultModel.findOne({
      timeEnd: { $gt: futureTime }, // Chọn tất cả các tài liệu có thời gian kết thúc nhỏ hơn hoặc bằng thời gian hiện tại
    })
      .sort({ timeEnd: 1 }) // Sắp xếp theo thời gian kết thúc giảm dần để lấy tài liệu gần nhất
      .select("timeEnd id_custom") // Chọn các trường cần hiển thị
      .limit(1);

    return new SuccessResponse("1", { result }).send(res);
  }),

  historyLottery: asyncHandler(async (req: ProtectedRequest, res) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const status = req.query.status;
    const startIndex = (page - 1) * limit;

    const hisotry = await HistoryModel.find({
      user: req.user._id,
      isCheck: status,
    })
      .populate(status === "true" ? "result" : "")
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean()
      .exec();
    return new SuccessResponse("Thành công", { hisotry }).send(res);
  }),

  historyLoteryResult: asyncHandler(async (req: ProtectedRequest, res) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const historyResults = await ResultModel.find({
      timeEnd: { $gte: startOfDay, $lte: now },
    }).sort({
      timeEnd: -1,
    });

    return new SuccessResponse("Thành công", historyResults).send(res);
  }),
  gteBanks: asyncHandler(async (req: ProtectedRequest, res) => {
    const banks = await BanInfoModel.find();
    return new SuccessResponse("Thành công", banks).send(res);
  }),

  getHistoryPayments: asyncHandler(async (req: ProtectedRequest, res) => {
    const total = await SampleModel.countDocuments();
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const data = await SampleModel.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return new SuccessResponse("Thành công", {
      payment: data,
      total,
    }).send(res);
  }),
  getHistoryWithDraws: asyncHandler(async (req: ProtectedRequest, res) => {
    const total = await WithDrawModel.countDocuments();
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const data = await WithDrawModel.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return new SuccessResponse("Thành công", {
      withdraws: data,
      total,
    }).send(res);
  }),

  // Setting
  getSettingByType: asyncHandler(async (req: ProtectedRequest, res) => {
    try {
      const setting = await SettingModel.findOne({
        type: req.query.type,
        userId: req.user._id,
      });

      return new SuccessResponse("Thành công", setting).send(res);
    } catch (error) {
      return new BadRequestResponse("SOMETHING_WENT_WRONG").send(res);
    }
  }),
};

export const scheduleCheckVote = async () => {
  const task = cron.schedule("*/30 * * * *", async () => {
    try {
      const tickets = await TicketBuyModel.find().populate("result user");
      if (!tickets.length) console.log("Không có ai đặt vé");

      tickets.forEach(async (ticket: any) => {
        if (new Date(ticket.result.timeEnd).getTime() < new Date().getTime()) {
          if (
            ticket.category == "DE" &&
            ticket.result.results[0] === ticket.ticket[0]
          ) {
            ticket.user.money += ticket.price * Ratio[ticket.category];
            await UserRepo.updateInfo(ticket.user);
            const history = await HistoryModel.findOne({
              ticketId: ticket._id,
            });
            if (history) {
              history.priceWin = ticket.price * Ratio[ticket.category];
              history.isCheck = true;
              history.status = "WIN";
              history.result = history.result;
              await history.save();
            }
            await TicketBuyModel.deleteOne({
              _id: ticket._id,
            });
            console.log("Thắng neffff");
          } else if (
            arraysContainSameNumbers(ticket.result.results, ticket.ticket)
          ) {
            const occurrences = countOccurrences(
              ticket.result.results,
              ticket.ticket[0]
            );
            console.log(11111111111111, occurrences);

            if (ticket.category == "COBAN") {
              ticket.user.money +=
                ticket.price * Ratio[ticket.category] * occurrences +
                ticket.price;
            } else
              ticket.user.money +=
                ticket.price * Ratio[ticket.category] + ticket.price;
            console.log(ticket.user);

            await UserRepo.updateInfo(ticket.user);
            const history = await HistoryModel.findOne({
              ticketId: ticket._id,
            });
            console.log(history);
            if (history) {
              history.priceWin =
                ticket.category == "COBAN"
                  ? ticket.price * Ratio[ticket.category] * occurrences
                  : ticket.price * Ratio[ticket.category];
              history.isCheck = true;
              history.status = "WIN";
              history.result = history.result;
              await history.save();
            }
            await TicketBuyModel.deleteOne({
              _id: ticket._id,
            });
            console.log("Thắng neffff");
          } else {
            const history = await HistoryModel.findOne({
              ticketId: ticket._id,
            });
            console.log(11111111111111, history);

            if (history) {
              history.status = "LOSE";
              history.isCheck = true;
              history.result = history.result;
              await history.save();
            }
            await TicketBuyModel.deleteOne({
              _id: ticket._id,
            });
            console.log("Thuaaa");
          }
        }
      });

      const currentTime = new Date();
      const twoMinutesAgo = new Date(currentTime.getTime() - 2 * 60 * 1000); // Lấy thời gian hiện tại trừ 2 phút
      const oneMinuteLater = new Date(currentTime.getTime() + 1 * 60 * 1000); // Lấy thời gian hiện tại cộng thêm 1 phút

      const result = await ResultModel.findOne({
        timeEnd: {
          $gt: twoMinutesAgo, // Lớn hơn thời gian trước 2 phút
          $lte: oneMinuteLater, // Nhỏ hơn hoặc bằng thời gian hiện tại + 1 phút
        },
      });
      if (result) {
        const newResult = result?.results?.map((item, index) => {
          if (index < 10)
            return Math.floor(Math.random() * 900 + 100) + "" + item;
          else if (index < 20)
            return Math.floor(Math.random() * 90 + 10) + "" + item;
          else if (index < 23)
            return Math.floor(Math.random() * 9) + "" + item + "";
          return item;
        });
        result.resultsView = newResult;
        await result.save();
      }
    } catch (error) {
      console.error("Error checking vote:", error);
    }
  });
};
function arraysContainSameNumbers(array1: any, array2: any) {
  for (const num of array2) {
    if (!array1.includes(num)) {
      return false;
    }
  }
  return true;
}
function countOccurrences(array: any, target: any) {
  return array.reduce((count: any, element: any) => {
    if (element === target) {
      return count + 1;
    }
    return count;
  }, 0);
}

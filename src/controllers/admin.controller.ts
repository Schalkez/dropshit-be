import asyncHandler from "../helpers/asyncHandler";
import { UserModel } from "../database/model/User";
import {
  BadRequestResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from "../core/ApiResponse";
import bcrypt from "bcrypt";
import { SampleModel } from "../database/model/Payment";
import { WithDrawModel } from "../database/model/WithDraw";
import { BanInfoModel } from "../database/model/BankInfo";
import { ResultModel } from "../database/model/Result";
import { HistoryModel } from "../database/model/History";
import UserRepo from "../database/repository/UserRepo";
import { LogsAdmin } from "../database/model/Log-login";
import { BranchModel } from "../database/model/Branch";
import { CategoryModel } from "../database/model/Category";
import { ProductModel } from "../database/model/Products";
import { RoleModel } from "../database/model/Role";
import { PackageModel } from "../database/model/Package";
import { MethodPaymentModel } from "../database/model/MethodPayment";
import { ConfigModel } from "../database/model/Config";
import { categoryErrors } from "../constants/errors/category.error";
import mongoose from "mongoose";

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const adminController = {
  setConfig: asyncHandler(async (req: any, res) => {
    const { value, name } = req.body;
    const config = await ConfigModel.findOne({ name });
    if (!config)
      await ConfigModel.create({
        value,
        name,
      });
    else {
      ConfigModel.findByIdAndUpdate(
        {
          _id: config._id,
        },
        {
          $set: {
            value,
          },
        }
      );
    }

    return new SuccessMsgResponse("ok").send(res);
  }),

  getConfig: asyncHandler(async (req: any, res) => {
    const data = await ConfigModel.find();
    return new SuccessResponse("ok", data).send(res);
  }),
  deleteConfig: asyncHandler(async (req: any, res) => {
    await ConfigModel.findByIdAndDelete(req.params.id);
    return new SuccessResponse("ok", true).send(res);
  }),
  verifyShop: asyncHandler(async (req: any, res) => {
    const shop = await UserModel.findById(req.body.id);
    if (!shop) return new BadRequestResponse("Không tìm thấy Shop").send(res);
    if (shop?.store) {
      shop.store.isVerify = req.body.isVerify ? "SUCCESS" : "NO_KYC";
      await shop.save();
    }
    return new SuccessMsgResponse("ok").send(res);
  }),
  getBankMethod: asyncHandler(async (req: any, res) => {
    const data = await MethodPaymentModel.find();
    return new SuccessResponse("ok", data).send(res);
  }),
  addBankMethod: asyncHandler(async (req: any, res) => {
    const { name, img, des, number, author } = req.body;
    await MethodPaymentModel.create({ name, img, des, number, author });
    return new SuccessMsgResponse("tt").send(res);
  }),
  deleteMethodBank: asyncHandler(async (req: any, res) => {
    await MethodPaymentModel.findByIdAndDelete(req.params.id);
    return new SuccessMsgResponse("tt").send(res);
  }),
  getProduct: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.per_page) || 10;
    const userId = "651ed18ed3c656cabc057998";

    const totalCount = await ProductModel.countDocuments({
      $or: [{ user: null }, { user: userId }],
    });

    const products = await ProductModel.find({
      $or: [{ user: null }, { user: userId }],
    })
      .populate("category branch")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ total: totalCount, data: products });
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
    const data = await ProductModel.create({
      branch,
      category,
      description,
      images,
      price,
      quantity,
      user,
      name,
    });
    return new SuccessMsgResponse("Success").send(res);
  }),
  deleteProduct: asyncHandler(async (req: any, res) => {
    await ProductModel.findByIdAndDelete(req.body.id);
    return new SuccessMsgResponse("Success").send(res);
  }),
  addBranch: asyncHandler(async (req: any, res) => {
    const { name, img } = req.body;
    const branch = await BranchModel.create({
      img,
      name,
    });
    return new SuccessMsgResponse("Success").send(res);
  }),
  deleteBranch: asyncHandler(async (req: any, res) => {
    await BranchModel.findByIdAndDelete(req.body.id);
    return new SuccessMsgResponse("Success").send(res);
  }),
  getBranch: asyncHandler(async (req: any, res) => {
    const categories = await BranchModel.find().sort({ createdAt: -1 });
    return new SuccessResponse("Success", categories).send(res);
  }),
  getPacke: asyncHandler(async (req: any, res) => {
    const categories = await PackageModel.find().sort({ createdAt: -1 });
    return new SuccessResponse("Success", categories).send(res);
  }),
  setDefaultPackage: asyncHandler(async (req: any, res) => {
    const packageC = await PackageModel.findById(req.body.id);
    const packeDefault = await PackageModel.findOne({ isDefaul: true });
    if (!packageC)
      return new BadRequestResponse("Không tìm thấy gối").send(res);
    packageC.isDefaul = true;
    await packageC.save();
    if (packeDefault) {
      packeDefault.isDefaul = false;
      await packeDefault.save();
    }
    return new SuccessMsgResponse("Success").send(res);
  }),

  deletePackage: asyncHandler(async (req: any, res) => {
    await PackageModel.findByIdAndDelete(req.body.id);
    return new SuccessMsgResponse("Success").send(res);
  }),

  addPackage: asyncHandler(async (req: any, res) => {
    const { name, img, limit, price, time, profit } = req.body;
    const branch = await PackageModel.create({
      img,
      name,
      limit,
      price,
      time,
      profit,
    });
    return new SuccessMsgResponse("Success").send(res);
  }),

  getCategory: asyncHandler(async (req: any, res) => {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    return new SuccessResponse("Success", categories).send(res);
  }),
  getCategoryById: asyncHandler(async (req: any, res) => {
    const id = req.params.id;

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      return new BadRequestResponse("ID_NOT_VALID").send(res);
    }

    const category = await CategoryModel.findById(id);

    if (!category) {
      return new BadRequestResponse(categoryErrors.CATEGORY_NOT_FOUND).send(
        res
      );
    }

    return new SuccessResponse("Success", category).send(res);
  }),
  addCategory: asyncHandler(async (req: any, res) => {
    const { name, img, slug, subCategories } = req.body;

    const category = await CategoryModel.create({
      img,
      name,
      tag: name.en
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-"),
      subCategories,
    });
    return new SuccessMsgResponse("Success").send(res);
  }),
  updateCategory: asyncHandler(async (req: any, res) => {
    const id = req.params.id;
    const { name, tag, img, status, subCategories } = req.body;

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      return new BadRequestResponse("ID_NOT_VALID").send(res);
    }

    const category = await CategoryModel.findById(id);

    if (!category) {
      return new BadRequestResponse(categoryErrors.CATEGORY_NOT_FOUND).send(
        res
      );
    }

    if (!Object.keys(req.body).length) {
      return new BadRequestResponse(
        categoryErrors.MUST_PROVIDE_BODY_TO_UPDATE_CATEGORY
      ).send(res);
    }

    const updateFields: any = {};

    if (name) {
      const updateName: any = {};
      if (Object.keys(name).length > 0) {
        for (let languageName in name) {
          if (name.languageName) {
            updateName.languageName = languageName;
          }
        }
        // TODO: Handle update name and subCategory using transaction
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
          id,
          {
            $set: updateName,
          },
          { new: true }
        );
      }
    }

    if (tag) {
      updateFields.tag = tag;
    }

    if (img) {
      updateFields.img = img;
    }

    if (status) {
      updateFields.status = status;
    }

    if (Object.keys(updateFields).length > 0) {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        {
          $set: updateFields,
        },
        { new: true }
      );

      return new SuccessResponse("Success", updatedCategory).send(res);
    }
  }),
  deleteCategory: asyncHandler(async (req: any, res) => {
    const id = req.params.id;

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      return new BadRequestResponse("ID_NOT_VALID").send(res);
    }

    const category = await CategoryModel.findById(id);

    if (!category) {
      return new BadRequestResponse(categoryErrors.CATEGORY_NOT_FOUND).send(
        res
      );
    }

    await CategoryModel.deleteOne({ _id: id });
    return new SuccessMsgResponse("Success").send(res);
  }),

  addEmployee: asyncHandler(async (req: any, res) => {
    const user = await UserModel.findOne({ email: req.body.phone });
    if (user) throw new BadRequestResponse("Người dùng đã tồn tại").send(res);
    // const passwordHash = await bcrypt.hash(req.body.password, 10);
    const role = await RoleModel.findOne({ code: req.body.roleCode })
      .select("+code")
      .lean()
      .exec();
    const newUser = await UserModel.create({
      name: req.body.name,
      phone: req.body.phone,
      password: req.body.password,
      email: req.body.email,
      code: makeid(5),
      roles: [role],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });
    return new SuccessMsgResponse("Success").send(res);
  }),
  getUsers: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const searchQuery = req.query.search || "";
    const role = await RoleModel.findOne({
      code: req.query.role,
    });

    let searchFilter = {
      email: { $ne: "admin@123.com" },

      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
        { phone: { $regex: searchQuery, $options: "i" } },
        { "store.nameStore": { $regex: searchQuery, $options: "i" } },
      ],
    } as any;
    if (role) {
      searchFilter.roles = { $elemMatch: { $eq: role._id } };
    }

    const totalCount = await UserModel.countDocuments(searchFilter);
    const products = await UserModel.find(searchFilter)
      .populate("roles")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ total: totalCount, data: products });
  }),
  deletebank: asyncHandler(async (req: any, res) => {
    await BanInfoModel.findByIdAndDelete(req.params.id);
    return new SuccessMsgResponse("Thành công").send(res);
  }),
  addUsers: asyncHandler(async (req: any, res) => {
    const { name, phone, password, money } = req.body;
    if (!phone || !money || !name || !password)
      return new BadRequestResponse("Có lỗi xảy ra").send(res);
    const user = await UserModel.findOne({ phone: req.body.phone });
    if (user) throw new BadRequestResponse("Người dùng đã tồn tại").send(res);

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const usernew = await UserModel.create({
      phone,
      name,
      password: passwordHash,
      money: +money || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return new SuccessResponse("Thành công", { usernew }).send(res);
  }),
  update: asyncHandler(async (req: any, res) => {
    const {
      name,
      authorName,
      branchBank,
      nameBank,
      numberBank,
      password,
      money,
      isVerify,
    } = req.body;

    const user = await UserModel.findOne({ phone: req.body.phone });
    if (!user)
      throw new BadRequestResponse("Người dùng không tồn  đã tồn tại").send(
        res
      );
    let passwordHash;
    if (password) passwordHash = await bcrypt.hash(password, 10);
    user.name = name || user.name;
    user.password = passwordHash || user.password;
    user.money = money || user.money;
    user.bankInfo.authorName = authorName || {
      ...user.bankInfo,
    };
    user.bankInfo.branchBank = authorName || {
      ...user.bankInfo,
    };
    user.bankInfo.nameBank = authorName || {
      ...user.bankInfo,
    };
    user.bankInfo.numberBank = authorName || {
      ...user.bankInfo,
    };
    user.store.isVerify = isVerify || user.store.isVerify;
    await UserRepo.updateInfo(user);
    return new SuccessResponse("Thành công", true).send(res);
  }),

  deleteUser: asyncHandler(async (req: any, res) => {
    await UserModel.findByIdAndDelete(req.params.id);
    return new SuccessResponse("Đã xóa", true).send(res);
  }),

  getPayments: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const searchQuery = req.query.search || "";
    const searchFilter = {} as any;

    const totalCount = await SampleModel.countDocuments();
    const products = await SampleModel.aggregate([
      {
        $lookup: {
          from: "users", // Replace 'users' with the actual collection name for the User model
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },

      { $unwind: "$user" },

      {
        $lookup: {
          from: "methodpayments", // Replace 'users' with the actual collection name for the User model
          localField: "bank",
          foreignField: "_id",
          as: "bank",
        },
      },

      { $unwind: "$bank" },
      {
        $match: {
          $or: [
            {
              "user.name": { $regex: searchQuery, $options: "i" },
            },
            {
              "user.phone": { $regex: searchQuery, $options: "i" },
            },
          ],
        },
      },

      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);
    res.json({ total: totalCount, data: products });
  }),
  resolveWithDraw: asyncHandler(async (req: any, res) => {
    const withdraw = await WithDrawModel.findById(req.body.id);
    if (!withdraw)
      return new BadRequestResponse("Không tìm thấy thanh toán").send(res);

    if (withdraw.isResolve !== "PENDING")
      return new BadRequestResponse("thanh toán đã được giải quyết").send(res);

    const user = await UserModel.findById(withdraw.user._id);
    if (!user) return new BadRequestResponse("không tìm thấy user").send(res);

    withdraw.isResolve = req.body.isResolve ? "RESOLVE" : "REJECT";
    withdraw.status = req.body.isResolve;
    withdraw.note = req.body.note;

    if (!req.body.isResolve) {
      user.money = user.money + withdraw.moneyWithDraw;
      await user.save();
    }

    await withdraw.save();
    return new SuccessResponse("Đã giải quyết", user).send(res);
  }),
  getWithdraws: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const searchQuery = req.query.search || "";
    const searchFilter = {} as any;
    if (searchQuery) {
      searchFilter["user.phone"] = { $regex: searchQuery, $options: "i" };
    }
    const totalCount = await WithDrawModel.countDocuments();

    const products = await WithDrawModel.aggregate([
      {
        $lookup: {
          from: "users", // Replace 'users' with the actual collection name for the User model
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },

      { $unwind: "$user" },

      {
        $match: {
          $or: [
            {
              "user.name": { $regex: searchQuery, $options: "i" },
            },
            {
              "user.phone": { $regex: searchQuery, $options: "i" },
            },
          ],
        },
      },

      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    res.json({ total: totalCount, data: products });
  }),
  resolvePayment: asyncHandler(async (req: any, res) => {
    const payment = await SampleModel.findById(req.body.id);
    if (!payment)
      return new BadRequestResponse("Không tìm thấy thanh toán").send(res);
    if (payment.isResolve !== "PENDING")
      return new BadRequestResponse("thanh toán đã được giải quyết").send(res);
    const user = await UserModel.findById(payment.user._id);
    if (!user) return new BadRequestResponse("không tìm thấy user").send(res);

    payment.isResolve = req.body.isResolve ? "RESOLVE" : "REJECT";
    payment.status = req.body.isResolve;
    payment.note = req.body.note || "";

    user.money = req.body.isResolve
      ? user.money + payment.moneyPayment
      : user.money;

    await user.save();
    await payment.save();
    return new SuccessResponse("Đã giải quyết", user).send(res);
  }),
  addbankInfo: asyncHandler(async (req: any, res) => {
    const { nameBank, numberbank, author, img } = req.body;
    const newBankInfo = await BanInfoModel.create({
      author,
      category: "BANK_LOCAL",
      img,
      nameBank,
      numberbank,
    });
    return new SuccessMsgResponse("thành công").send(res);
  }),

  getHistoryResult: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const searchQuery = req.query.search || "";
    const startOfToday = new Date();
    // const oneHourLater = new Date(startOfToday.getTime() - 1 * 60 * 60 * 1000);
    // startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    let searchFilter = {} as any;
    searchFilter = {
      timeEnd: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    };
    if (searchQuery) {
      searchFilter.id_custom = searchQuery;
    }

    const totalCount = await ResultModel.countDocuments(searchFilter);
    const results = await ResultModel.find(searchFilter)
      .sort({ timeEnd: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ total: totalCount, data: results });
  }),

  updateResult: asyncHandler(async (req: any, res) => {
    const result = await ResultModel.findById(req.body.id);
    if (!result)
      return new BadRequestResponse("Không tìm thấý kết quả").send(res);
    result.results = req.body.newResult;
    await result.save();
    return new SuccessMsgResponse("Thành công").send(res);
  }),
  historyBuy: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const searchQuery = req.query.search || "";
    let searchFilter = {} as any;
    if (searchQuery) {
      searchFilter["result.id_custom"] = { $regex: searchQuery, $options: "i" };
      // searchFilter["user.name"] = { $regex: searchQuery, $options: "i" };
      // searchFilter["user.phone"] = { $regex: searchQuery, $options: "i" };
    }

    const totalCount = await HistoryModel.countDocuments();

    const products = await HistoryModel.aggregate([
      {
        $lookup: {
          from: "users", // Replace 'users' with the actual collection name for the User model
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "results", // Replace 'votes' with the actual collection name for the Vote model
          localField: "result",
          foreignField: "_id",
          as: "result",
        },
      },
      { $unwind: "$user" },
      { $unwind: "$result" },
      {
        $match: {
          $or: [
            {
              "result.id_custom": { $regex: searchQuery, $options: "i" },
            },
            {
              "user.name": { $regex: searchQuery, $options: "i" },
            },
            {
              "user.phone": { $regex: searchQuery, $options: "i" },
            },
          ],
        },
      },

      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    res.json({ total: totalCount, data: products });
  }),

  getBanks: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const searchQuery = req.query.search || "";
    const totalCount = await BanInfoModel.countDocuments();
    const results = await BanInfoModel.find()
      .sort({ timeEnd: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ total: totalCount, data: results });
  }),
  getLogs: asyncHandler(async (req: any, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const searchQuery = req.query.search || "";
    const totalCount = await LogsAdmin.countDocuments();
    const results = await LogsAdmin.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ total: totalCount, data: results });
  }),

  deleteUserHistory: asyncHandler(async (req: any, res) => {
    await HistoryModel.findByIdAndDelete(req.params.id);
    return new SuccessMsgResponse("Thành công").send(res);
  }),
  deletWithdraw: asyncHandler(async (req: any, res) => {
    await WithDrawModel.findByIdAndDelete(req.params.id);
    return new SuccessMsgResponse("Thành công").send(res);
  }),
  deletePayment: asyncHandler(async (req: any, res) => {
    await SampleModel.findByIdAndDelete(req.params.id);
    return new SuccessMsgResponse("Thành công").send(res);
  }),
  changeStatusUser: asyncHandler(async (req: any, res) => {
    const user = await UserModel.findById(req.body.id);
    if (!user) return new BadRequestResponse("Không tìn thấy user").send(res);

    user.status = !user.status;

    await UserRepo.updateInfo(user);

    return new SuccessMsgResponse("Thành công").send(res);
  }),
};

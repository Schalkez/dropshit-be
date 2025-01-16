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
import mongoose, { Types } from "mongoose";
import { productErrors } from "../constants/errors/product.error";
import Conservation from "../database/model/Conservation";
import { OrderModel } from "../database/model/Order";
import { SettingModel } from "../database/model/Setting";

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
    const limit = parseInt(req.query.limit) || 10;
    const wishlistUser = parseInt(req.query.wishlistUser);

    const sellerEmail = req.query.sellerEmail;

    const branch = req.query.branch;

    const categorySlug = req.query.categorySlug;
    const subCategorySlug = req.query.subCategorySlug;

    let categoryFilter = {};
    if (categorySlug) {
      const category = await CategoryModel.findOne({
        slug: categorySlug,
      }).select("_id");

      categoryFilter = { category: category?._id };
    }

    let branchFilter = {};
    if (branch) {
      const existBranch = await BranchModel.findOne({
        name: branch,
      }).select("_id");

      branchFilter = { branch: existBranch?._id };
    }

    let sellerFilter = {};
    if (sellerEmail) {
      const seller = await UserModel.findOne({ email: sellerEmail }).select(
        "_id"
      );
      sellerFilter = { sellers: seller?._id };
    }

    const minPrice = req.query.min_price
      ? parseFloat(req.query.min_price)
      : null;
    const maxPrice = req.query.max_price
      ? parseFloat(req.query.max_price)
      : null;

    const priceFilter: any = {};
    if (minPrice !== null && maxPrice !== null) {
      priceFilter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== null) {
      priceFilter.price = { $gte: minPrice };
    } else if (maxPrice !== null) {
      priceFilter.price = { $lte: maxPrice };
    }

    if (wishlistUser) {
      const wishlist = await ProductModel.findOne({
        user: wishlistUser,
      }).select("_id");
    }

    const filters: any = {};

    const isAdmin = req.user?.role === "ADMIN";

    if (isAdmin) {
      filters.sellers = { $exists: true, $ne: [] };
    }

    const totalCount = await ProductModel.countDocuments({
      ...priceFilter,
      ...sellerFilter,
      ...categoryFilter,
      ...branchFilter,
      ...filters,
    });

    const products = await ProductModel.find({
      ...priceFilter,
      ...sellerFilter,
      ...categoryFilter,
      ...branchFilter,
      ...filters,
    })
      .populate("branch")
      .populate("category")
      .populate("sellers", "-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    products.map((product) => {
      const category: any = product.category;
      const subCate = category?.subCategories?.find((x: any) => {
        return x._id?.toString() === product?.subCategory?.toString();
      });

      product.subCategory = subCate;

      return product;
    });

    let result: any = [];
    if (subCategorySlug) {
      result = products.filter((product) => {
        const subCategories: any = product.subCategory;

        for (let subCategory of subCategories) {
          if (subCategory.slug === subCategorySlug) {
            return product;
          }
        }
      });
    } else {
      result = products;
    }

    const meta = {
      current: page,
      totalPage: Math.ceil(totalCount / limit),
      limit,
      totalRecords: totalCount,
    };

    res.json({ meta, data: result });
  }),

  addToWishlist: asyncHandler(async (req: any, res) => {
    const productId = req.params.id;
    const userId = req.body.userId;
    console.log(productId, userId);

    await ProductModel.findByIdAndUpdate(
      productId,
      { $addToSet: { wishlistUsers: new mongoose.Types.ObjectId(userId) } } // Chỉ thêm nếu userId chưa tồn tại
    );

    return new SuccessMsgResponse("Success").send(res);
  }),

  removeFromWishlist: asyncHandler(async (req: any, res) => {
    const productId = req.params.id;
    const userId = req.query.userId;

    await ProductModel.findByIdAndUpdate(productId, {
      $pull: { wishlistUsers: new mongoose.Types.ObjectId(userId) },
    });

    return new SuccessMsgResponse("Success").send(res);
  }),

  productsWishlist: asyncHandler(async (req: any, res) => {
    const wishlistUser = req.query.wishlistUser;

    const wishlistProducts = await ProductModel.find({
      wishlistUsers: new mongoose.Types.ObjectId(wishlistUser),
    });

    return res.json(wishlistProducts);
  }),

  productsWishlistCount: asyncHandler(async (req: any, res) => {
    const wishlistUser = req.query.wishlistUser;
    console.log(wishlistUser);
    const count = await ProductModel.countDocuments({
      wishlistUsers: new mongoose.Types.ObjectId(wishlistUser),
    });

    return res.json(count);
  }),

  getProductById: asyncHandler(async (req: any, res) => {
    const id = req.params.id;

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      return new BadRequestResponse("ID_NOT_VALID").send(res);
    }

    const userId = "651ed18ed3c656cabc057998";

    const totalCount = await ProductModel.countDocuments({
      $or: [{ user: null }, { user: userId }],
    });

    const product = await ProductModel.findById(id)
      .populate("branch")
      .populate("category")
      .populate("sellers", "-password")
      .sort({ createdAt: -1 });

    res.json(product);
  }),

  addProduct: asyncHandler(async (req: any, res) => {
    const {
      branch,
      category,
      subCategory,
      description,
      deliveryDays,
      images,
      price,
      finalPrice,
      quantity,
      user,
      name,
      sellers,
    } = req.body;

    const existCategory = await CategoryModel.findById(category);

    if (!existCategory) {
      return new BadRequestResponse(categoryErrors.CATEGORY_NOT_FOUND).send(
        res
      );
    }

    await ProductModel.create({
      branch,
      category,
      subCategory,
      description,
      images,
      price,
      finalPrice,
      deliveryDays,
      quantity,
      user,
      sellers,
      name,
    });
    return new SuccessMsgResponse("Success").send(res);
  }),

  updateProduct: asyncHandler(async (req: any, res) => {
    try {
      const id = req.params.id;

      if (!Object.keys(req.body).length) {
        return new BadRequestResponse(
          productErrors.MUST_PROVIDE_BODY_TO_UPDATE_PRODUCT
        ).send(res);
      }

      const { images, sellers } = req.body;

      const isValidId = mongoose.Types.ObjectId.isValid(id);

      if (!isValidId) {
        return new BadRequestResponse("ID_NOT_VALID").send(res);
      }

      const product = await ProductModel.findById(id);

      if (!product) {
        return new BadRequestResponse("ID_NOT_VALID").send(res);
      }

      const updateFields: any = {};

      for (const [key, value] of Object.entries(req.body)) {
        if (value !== undefined && value !== null && value !== 0) {
          updateFields[key] = value;
        }
      }

      if (Object.keys(updateFields).length > 0) {
        const updatedCategory = await ProductModel.findByIdAndUpdate(
          id,
          {
            $set: updateFields,
          },
          { new: true }
        );

        return new SuccessResponse("Success", updatedCategory).send(res);
      }
    } catch (error) {
      return new BadRequestResponse("SOMETHING_ERROR").send(res);
    }
  }),

  deleteProduct: asyncHandler(async (req: any, res) => {
    const id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
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
    console.log(id);

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
    const { name, img, parentCategoryId } = req.body;

    if (parentCategoryId) {
      await CategoryModel.updateOne(
        { _id: parentCategoryId },
        {
          $push: {
            subCategories: {
              name,
              tag: name.en
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/[^a-z0-9\s-]/g, "")
                .trim()
                .replace(/\s+/g, "-"),
              img,
            },
          },
        }
      );

      return new SuccessMsgResponse("Success").send(res);
    }

    await CategoryModel.create({
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
      subCategories: [],
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
    const subId = req.params.subId;

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
      return new BadRequestResponse("ID_NOT_VALID").send(res);
    }
    console.log(subId);
    if (!subId) {
      console.log(1);
      await CategoryModel.deleteOne({ _id: id });
      console.log(2);
      return new SuccessMsgResponse("Success").send(res);
    }

    const isValidSubId = mongoose.Types.ObjectId.isValid(subId);

    if (!isValidSubId) {
      return new BadRequestResponse("ID_NOT_VALID").send(res);
    }

    await CategoryModel.updateOne(
      { _id: id },
      {
        $pull: {
          subCategories: { _id: subId },
        },
      }
    );

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
      // email: { $ne: "admin@123.com" },

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
      deliveryWallet,
      shopWallet,
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
    user.deliveryWallet = deliveryWallet || user.deliveryWallet;
    user.shopWallet = shopWallet || user.shopWallet;
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

      // {
      //   $lookup: {
      //     from: "methodpayments", // Replace 'users' with the actual collection name for the User model
      //     localField: "bank",
      //     foreignField: "_id",
      //     as: "bank",
      //   },
      // },

      // { $unwind: "$bank" },
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
    const customMoney = Number(req.body.customMoney) || 0;

    const withdraw = await WithDrawModel.findById(req.body.id);
    if (!withdraw)
      return new BadRequestResponse("Không tìm thấy thanh toán").send(res);

    if (withdraw.isResolve !== "PENDING")
      return new BadRequestResponse("thanh toán đã được giải quyết").send(res);

    const user = await UserModel.findById(withdraw.user._id).lean();
    if (!user) return new BadRequestResponse("không tìm thấy user").send(res);

    withdraw.isResolve = req.body.isResolve ? "RESOLVE" : "REJECT";
    withdraw.status = req.body.isResolve;
    withdraw.note = req.body.note;

    if (
      user.shopWallet < customMoney ||
      user.shopWallet < withdraw.moneyWithDraw
    ) {
      return new BadRequestResponse(
        "Số tiền trong tài khoản của bạn không đủ"
      ).send(res);
    }
    console.log(customMoney);
    if (req.body.isResolve) {
      await UserModel.updateOne(
        { _id: withdraw.user._id },
        {
          $inc: { shopWallet: -customMoney },
        }
      );
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
    console.log(req.body.id);
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

    const moneyPayment = req.body.moneyPayment || payment.moneyPayment;

    user.deliveryWallet = req.body.isResolve
      ? (user.deliveryWallet || 0) + moneyPayment
      : user.deliveryWallet || 0;

    await user.save();
    await payment.save();
    return new SuccessResponse("Đã giải quyết", user).send(res);
  }),

  addBankInfo: asyncHandler(async (req: any, res) => {
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

  resolvePaymentOrderAdmin: asyncHandler(async (req: any, res) => {
    const order = await OrderModel.findById(req.body.orderId);
    if (!order)
      return new BadRequestResponse("Không tìm thấy đơn hàng này").send(res);
    const user = await UserModel.findById(req.body.sellerId);
    if (!user)
      return new BadRequestResponse("Không tìm thấy người dùng này").send(res);
    order.isPayment = true;
    order.status = "CONFIRM";
    if (user.deliveryWallet < (order.gia_kho || 0))
      return new BadRequestResponse("Shop vui lòng nạp thêm tiền").send(res);
    user.deliveryWallet = user.deliveryWallet - (order.gia_kho || 0);
    await order.save();
    await user.save();

    return new SuccessMsgResponse("ok").send(res);
  }),

  // Delete order by admin
  deleteOrder: asyncHandler(async (req: any, res) => {
    await OrderModel.findByIdAndDelete(req.params.id);
    return new SuccessMsgResponse("Xoá đơn hàng thành công").send(res);
  }),

  // chat

  getConversions: asyncHandler(async (req, res) => {
    try {
      const adminId = req.params.id;

      const isValidId = mongoose.Types.ObjectId.isValid(adminId);

      if (!isValidId) {
        return new BadRequestResponse("ID_NOT_VALID").send(res);
      }

      const conversions = await Conservation.find({ user: adminId });

      res.json(conversions);
    } catch (error) {
      return new BadRequestResponse("SOMETHING_ERROR").send(res);
    }
  }),

  // Setting
  getSettingByType: asyncHandler(async (req, res) => {
    try {
      const type = req.query.type;

      const setting = await SettingModel.find({ type }).populate({
        path: "userId",
      });

      return res.json(setting);
    } catch (error) {
      return new BadRequestResponse("SOMETHING_ERROR").send(res);
    }
  }),

  createSetting: asyncHandler(async (req, res) => {
    try {
      const existSetting = await SettingModel.findOne({
        type: req.body.type,
        userId: new Types.ObjectId(req.body.userId),
      });

      if (existSetting) {
        await SettingModel.findByIdAndUpdate(existSetting._id, req.body);
        return new SuccessMsgResponse("ok").send(res);
      }

      const setting = new SettingModel({
        ...req.body,
        userId: new Types.ObjectId(req.body.userId),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await setting.save();

      return new SuccessMsgResponse("ok").send(res);
    } catch (error) {
      return new BadRequestResponse("SOMETHING_ERROR").send(res);
    }
  }),

  updateSetting: asyncHandler(async (req, res) => {
    try {
      const id = req.params.id;

      const setting = await SettingModel.findById(id);
      if (!setting) {
        return new BadRequestResponse("SOMETHING_ERROR").send(res);
      }

      await SettingModel.findByIdAndUpdate(id, req.body);
      return new SuccessMsgResponse("ok").send(res);
    } catch (error) {
      return new BadRequestResponse("SOMETHING_ERROR").send(res);
    }
  }),

  deleteSetting: asyncHandler(async (req, res) => {
    try {
      const id = req.params.id;

      console.log(id, "id");

      const setting = await SettingModel.findById(id);
      console.log(setting, "setting");
      if (!setting) {
        return new BadRequestResponse("SOMETHING_ERROR").send(res);
      }

      await SettingModel.findByIdAndDelete(id, req.body);
      return new SuccessMsgResponse("ok").send(res);
    } catch (error) {
      return new BadRequestResponse("SOMETHING_ERROR").send(res);
    }
  }),
};

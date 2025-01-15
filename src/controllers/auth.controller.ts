import UserRepo from "../database/repository/UserRepo";
import asyncHandler from "../helpers/asyncHandler";
import {
  ProtectedRequest,
  PublicRequest,
  RoleRequest,
} from "../types/app-request";
import crypto from "crypto";
import { AuthFailureError, BadRequestError } from "../core/ApiError";
import bcrypt from "bcrypt";
import User, { UserModel } from "../database/model/User";
import {
  createTokens,
  getAccessToken,
  validateTokenData,
} from "../auth/authUtils";
import { getUserData } from "./utils";
import {
  BadRequestResponse,
  SuccessMsgResponse,
  SuccessResponse,
  TokenRefreshResponse,
} from "../core/ApiResponse";
import KeystoreRepo from "../database/repository/KeystoreRepo";
import JWT from "../core/JWT";
import { Types } from "mongoose";
import { LogsAdmin } from "../database/model/Log-login";
import { PackageModel } from "../database/model/Package";
import Noti from "../database/model/Noti";
import { ProductModel } from "../database/model/Products";
import { RoleModel } from "../database/model/Role";
const loginAdmin = {} as any;

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

export const AuthControllers = {
  getProductsNews: asyncHandler(async (req: RoleRequest, res) => {
    const products = await ProductModel.find()
      .limit(10)
      .sort({ createdAt: -1 });
    return new SuccessResponse("ok", products).send(res);
  }),
  getProductsFeature: asyncHandler(async (req: RoleRequest, res) => {
    const products = await ProductModel.aggregate([
      {
        $match: {
          isProductFeature: true,
          $or: [
            { sellers: { $ne: null } }, // sellers không phải null
            { sellers: { $ne: [] } }, // sellers không phải mảng rỗng
          ],
        },
      },
      { $sample: { size: 10 } }, // Randomly select 10 products
    ]);

    return new SuccessResponse("ok", products).send(res);
  }),
  getProductsBestSelling: asyncHandler(async (req: RoleRequest, res) => {
    const products = await ProductModel.aggregate([
      {
        $match: {
          isBestSelling: true,
          $or: [
            { sellers: { $ne: null } }, // sellers không phải null
            { sellers: { $ne: [] } }, // sellers không phải mảng rỗng
          ],
        },
      }, // Lọc các sản phẩm bán chạy và có sellers không null
      { $sample: { size: 10 } }, // Chọn ngẫu nhiên 10 sản phẩm
    ]);

    return new SuccessResponse("ok", products).send(res);
  }),
  up: asyncHandler(async (req: RoleRequest, res) => {
    res.send("ok");
  }),
  signUp: asyncHandler(async (req: RoleRequest, res) => {
    try {
      // Tìm user bằng email
      const user = await UserRepo.findByPhone(req.body.email);

      // Tạo token
      const accessTokenKey = crypto.randomBytes(64).toString("hex");
      const refreshTokenKey = crypto.randomBytes(64).toString("hex");

      if (user?.roles?.find((r) => r.code === "CUSTOMER")) {
        // Lấy thông tin role CUSTOMER và SELLER từ RoleModel

        if (req.body.roleCode === "CUSTOMER") {
          return new BadRequestResponse("Email đà tồn tại").send(res);
        }

        const customerRole = await RoleModel.findOne({ code: "CUSTOMER" });
        const sellerRole = await RoleModel.findOne({ code: "SELLER" });

        if (!customerRole || !sellerRole) {
          return new BadRequestResponse(
            "Role không tìm thấy, customerRole, sellerRole"
          ).send(res);
        }

        // Thực hiện xóa role CUSTOMER
        await UserModel.updateOne(
          { email: req.body.email },
          { $pull: { roles: customerRole._id } }
        );

        // Thực hiện thêm role SELLER
        await UserModel.updateOne(
          { email: req.body.email },
          { $addToSet: { roles: sellerRole._id } }
        );

        // Trả về phản hồi
        new SuccessResponse("Chúc mừng quý khách đã mở cửa hàng", {
          user,
          tokens: accessTokenKey,
        }).send(res);
        return;
      }

      if (user) {
        return new BadRequestResponse("Email đà tồn tại").send(res);
      }

      let packageC;
      if (req.body.roleCode === "SELLER") {
        packageC = await PackageModel.findOne({ isDefaul: true });
      }

      // Tạo user
      const { user: createdUser, keystore } = await UserRepo.create(
        {
          name: req.body.name,
          phone: req.body.phone,
          password: req.body.password,
          code: makeid(5),
          email: req.body.email,
          package: packageC?._id,
          parentCode: req.body.refCode || "",
        } as User,
        accessTokenKey,
        refreshTokenKey,
        req.body.roleCode
      );

      // Tạo token cho user
      const tokens = await createTokens(
        createdUser,
        keystore.primaryKey,
        keystore.secondaryKey
      );

      // Tạo thông báo
      await Noti.create({
        content: "Chúc mừng quý khách đã mở cửa hàng",
        user: createdUser?._id,
        type: "",
      });

      // Trả về phản hồi
      new SuccessResponse("Đăng kí tài khoản thành công", {
        user: createdUser,
        tokens: tokens,
      }).send(res);
    } catch (error) {
      console.error("Error in signUp:", error);
      return new BadRequestResponse("Lỗi trong quá trình đăng ký").send(res);
    }
  }),

  signIn: asyncHandler(async (req: PublicRequest, res) => {
    const user = await UserModel.findOne({ email: req.body.email }).populate(
      "roles"
    );
    if (!user)
      throw new BadRequestResponse("Tài khoản chưa được đăng kí").send(res);
    if (!user.status)
      throw new BadRequestResponse("Tài khoản bị khoá").send(res);
    if (!user.password)
      throw new BadRequestResponse("Mật khẩu không đúng").send(res);

    const match = req.body.password == user.password;
    if (!match) throw new BadRequestResponse("Mật khẩu không đúng").send(res);

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    await KeystoreRepo.create(user, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

    new SuccessResponse("Login Success", {
      user,
      tokens: tokens,
    }).send(res);
  }),
  signinAdmin: asyncHandler(async (req: any, res) => {
    const user = await UserModel.findOne({ email: req.body.email }).populate(
      "roles"
    );
    // const ip =
    //   req.headers["x-forwarded-for"] || req.connection.remoteAddress || "";
    // console.log(ip);

    // if (Object.keys(loginAdmin).length === 3)
    //   throw new BadRequestResponse("Chỉ được login 3 tài khoản cùng lúc").send(
    //     res
    //   );
    if (!user)
      throw new BadRequestResponse("Tài khoản chưa được đăng kí").send(res);
    if (!user.status)
      throw new BadRequestResponse("Tài khoản bị khoá").send(res);

    if (!user.password || user.password != req.body.password)
      throw new BadRequestResponse("Mật khẩu không đúng").send(res);

    // const match = await bcrypt.compare(req.body.password, user.password);
    // if (!match) throw new BadRequestResponse("Mật khẩu không đúng").send(res);
    // loginAdmin[ip];
    // await LogsAdmin.create({
    //   ip,
    // });
    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    await KeystoreRepo.create(user, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

    new SuccessResponse("Login Success", {
      user,
      tokens: tokens,
    }).send(res);
  }),
  refresh: asyncHandler(async (req: any, res) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase
    const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;

    const accessTokenPayload = await JWT.decode(req.accessToken);

    validateTokenData(accessTokenPayload);

    const user = await UserRepo.findById(
      new Types.ObjectId(accessTokenPayload.sub)
    );
    if (!user) {
      delete loginAdmin[ip];
      throw new AuthFailureError("User not registered");
    }
    req.user = user;

    const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
    validateTokenData(refreshTokenPayload);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub)
      throw new AuthFailureError("Invalid access token");

    const keystore = await KeystoreRepo.find(
      req.user,
      accessTokenPayload.prm,
      refreshTokenPayload.prm
    );

    if (!keystore) throw new AuthFailureError("Invalid access token");
    await KeystoreRepo.remove(keystore._id);

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    await KeystoreRepo.create(req.user, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(
      req.user,
      accessTokenKey,
      refreshTokenKey
    );

    new TokenRefreshResponse(
      "Token Issued",
      user,
      tokens.accessToken,
      tokens.refreshToken
    ).send(res);
  }),
  logout: asyncHandler(async (req: ProtectedRequest, res) => {
    await KeystoreRepo.remove(req.keystore._id);
    new SuccessMsgResponse("Logout success").send(res);
  }),
};

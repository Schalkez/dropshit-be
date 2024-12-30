import RoleRepo from "../database/repository/RoleRepo";
import {
  BadRequestResponse,
  SuccessMsgResponse,
  SuccessResponse,
  TokenRefreshResponse,
} from "../core/ApiResponse";
import asyncHandler from "../helpers/asyncHandler";

export const RoleControllers = {
  create: asyncHandler(async (req, res) => {
    const role = await RoleRepo.create(req.body.code, req.body.status);
    return new SuccessResponse("ok", role).send(res);
  }),
};

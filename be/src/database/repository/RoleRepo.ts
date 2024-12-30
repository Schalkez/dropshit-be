import { Types } from "mongoose";
import Role, { RoleModel } from "../model/Role";

async function findByCode(code: string): Promise<Role | null> {
  return RoleModel.findOne({ code: code, status: true }).lean().exec();
}

async function findByCodes(codes: string[]): Promise<Role[]> {
  return RoleModel.find({ code: { $in: codes }, status: true })
    .lean()
    .exec();
}

async function create(code: string, status: boolean = true): Promise<Role> {
  const existingRole = await RoleModel.findOne({ code }).exec();
  if (existingRole) {
    throw new Error(`Role with code "${code}" already exists.`);
  }

  const role = new RoleModel({
    _id: new Types.ObjectId(),
    code,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return await role.save();
}

export default {
  findByCode,
  findByCodes,
  create,
};

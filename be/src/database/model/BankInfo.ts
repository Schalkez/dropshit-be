import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "BankInfo";
export const COLLECTION_NAME = "bankInfos";

export enum Category {
  BANK_LOCAL = "BANK_LOCAL",
}

export default interface BankInfo {
  _id: Types.ObjectId;
  nameBank: string;
  numberbank: string;
  author: string;
  category: Category;
  status?: boolean;
  img?: string;
}

const schema = new Schema<BankInfo>(
  {
    category: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(Category),
    },
    nameBank: {
      type: Schema.Types.String,
      required: true,
    },
    numberbank: {
      type: Schema.Types.String,
      required: true,
    },
    author: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    img: {
      type: Schema.Types.String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const BanInfoModel = model<BankInfo>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);

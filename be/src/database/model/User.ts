import { model, Schema, Types } from "mongoose";
import Role from "./Role";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface User {
  _id: Types.ObjectId;
  name?: string;
  email?: string;
  profilePicUrl?: string;
  phone?: string;
  password?: string;
  roles?: Role[];
  verified?: boolean;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  address: [string];
  package: Types.ObjectId;
  money: number;
  bankInfo: BANK_INFO;
  keys: Array<string>;
  store: STORE_INFO;
  code: string;
  parentCode: string;
  isCustomerVirtual: boolean;
  creditScore: number;
  productQuantity: number;
}

export interface STORE_INFO {
  nameStore: string;
  stars?: number;
  logoStore: string;
  phone: string;
  address: string;
  views: number;
  isVerify: string;
  cmnd: {
    before: string;
    after: string;
  };
}

export interface BANK_INFO {
  nameBank: string;
  numberBank: string;
  authorName: string;
  branchBank: string;
}

const schema = new Schema<User>(
  {
    email: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: "Package",
    },
    productQuantity: {
      type: Schema.Types.Number,
      default: 0,
    },
    name: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
    },
    address: {
      type: [Schema.Types.String],
    },
    isCustomerVirtual: {
      type: Schema.Types.Boolean,
    },
    creditScore: {
      type: Schema.Types.Number,
      trim: true,
    },
    profilePicUrl: {
      type: Schema.Types.String,
      trim: true,
    },
    store: {
      type: {
        nameStore: Schema.Types.String,
        address: Schema.Types.String,
        logoStore: Schema.Types.String,
        phone: Schema.Types.String,
        views: Schema.Types.Number,
        stars: Schema.Types.Number,
        isVerify: {
          type: Schema.Types.String,
          default: "NO_KYC",
        },
        cmnd: {
          before: Schema.Types.String,
          after: Schema.Types.String,
        },
      },
    },
    bankInfo: {
      type: {
        nameBank: Schema.Types.String,
        numberBank: Schema.Types.String,
        authorName: Schema.Types.String,
        branchBank: Schema.Types.String,
      },
    },
    code: {
      type: Schema.Types.String,
    },
    parentCode: {
      type: Schema.Types.String,
    },
    keys: {
      type: [Schema.Types.String],
      default: [],
    },
    phone: {
      type: Schema.Types.String,
      // unique: true,
      //sparse: true, // allows null
      // required: true,
      trim: true,
      select: true,
    },
    password: {
      type: Schema.Types.String,
    },
    money: {
      type: Schema.Types.Number,
      default: 0,
    },
    roles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
      required: true,
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: true,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

schema.index({ _id: 1, status: 1 });
schema.index({ phone: 1 });
schema.index({ status: 1 });

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);

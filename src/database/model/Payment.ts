import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Payment";
export const COLLECTION_NAME = "payments";

export enum Category {
  ABC = "ABC",
  XYZ = "XYZ",
}

export default interface Sample {
  _id: Types.ObjectId;
  // bank: Types.ObjectId;
  user: Types.ObjectId;
  moneyPayment: number;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  content: string;
  isResolve: string;
  note?: string;
}

const schema = new Schema<Sample>(
  {
    // bank: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: "MethodPayment",
    // },
    note: Schema.Types.String,
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    moneyPayment: {
      type: Schema.Types.Number,
      required: true,
    },
    status: {
      type: Schema.Types.Boolean,
      default: false,
    },
    isResolve: {
      type: Schema.Types.String,
      default: "PENDING",
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: true,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      select: true,
    },
  },
  {
    versionKey: false,
  }
);

export const SampleModel = model<Sample>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);

import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "WithDraw";
export const COLLECTION_NAME = "withDraws";

export enum Category {
  ABC = "ABC",
  XYZ = "XYZ",
}

export default interface WithDraw {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  moneyWithDraw: number;
  note?: string;
  status?: boolean;
  isResolve: string;
}

const schema = new Schema<WithDraw>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    note: {
      type: Schema.Types.String,
    },
    isResolve: {
      type: Schema.Types.String,
      default: "PENDING",
    },
    moneyWithDraw: {
      type: Schema.Types.Number,
      default: 0,
    },
    status: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const WithDrawModel = model<WithDraw>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);

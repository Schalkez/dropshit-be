import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "History";
export const COLLECTION_NAME = "historys";

export enum Category {
  COBAN = "COBAN",
  XIEN2 = "XIEN2",
  XIEN3 = "XIEN3",
  XIEN4 = "XIEN4",
  DE = "DE",
}

export enum Ratio {
  COBAN = 3.5,
  XIEN2 = 15,
  XIEN3 = 45,
  XIEN4 = 180,
  DE = 90,
}

export default interface History {
  _id: Types.ObjectId;
  category: Category;
  ticketId: string;
  result: Types.ObjectId;
  ticket: Array<number>;
  price: number;
  priceWin: number;
  status?: string;
  isCheck?: boolean;
  user: Types.ObjectId;
}

const schema = new Schema<History>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    result: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Result",
    },
    category: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(Category),
    },
    ticketId: {
      type: Schema.Types.String,
      required: true,
    },
    ticket: {
      type: [Schema.Types.Number],
      required: true,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
    },
    priceWin: {
      type: Schema.Types.Number,
      default: 0,
    },
    status: {
      type: Schema.Types.String,
      default: "PENDING",
    },
    isCheck: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const HistoryModel = model<History>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);

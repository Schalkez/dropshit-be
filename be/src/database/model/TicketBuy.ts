import { number } from "joi";
import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "TicketBuy";
export const COLLECTION_NAME = "ticketBuys";

export enum Category {
  COBAN = "COBAN",
  XIEN2 = "XIEN2",
  XIEN3 = "XIEN3",
  XIEN4 = "XIEN4",
  DE = "DE",
}

export const Ratio: { [key: string]: number } = {
  COBAN: 3,
  XIEN2: 12,
  XIEN3: 45,
  XIEN4: 160,
  DE: 90,
};

export default interface TicKet {
  _id: Types.ObjectId;
  category: Category;
  user: Types.ObjectId;
  result: Types.ObjectId;
  ticket: Array<number>;
  price: number;
  status?: boolean;
}

const schema = new Schema<TicKet>(
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
    ticket: {
      type: [Schema.Types.Number],
      required: true,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      default: "PENDING",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const TicketBuyModel = model<TicKet>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);

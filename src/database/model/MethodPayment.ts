import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "MethodPayment";
export const COLLECTION_NAME = "methodpayments";

const schema = new Schema(
  {
    name: Schema.Types.String,
    number: Schema.Types.String,
    author: Schema.Types.String,
    img: Schema.Types.String,
    des: Schema.Types.String,
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const MethodPaymentModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);

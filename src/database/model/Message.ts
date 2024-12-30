import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "message";
export const COLLECTION_NAME = "messages";

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: Schema.Types.String,
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
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

export const MessageModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);

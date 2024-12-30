import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Room";
export const COLLECTION_NAME = "rooms";

const schema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
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

export const RoomModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);

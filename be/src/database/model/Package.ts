import { Schema, model } from "mongoose";

export const DOCUMENT_NAME = "Package";
export const COLLECTION_NAME = "packages";

const schema = new Schema(
  {
    name:Schema.Types.String,
    price:Schema.Types.Number,
    limit:Schema.Types.Number,
    time: Schema.Types.Number,
    img:Schema.Types.String,
    profit:Schema.Types.Number,
    isDefaul:Schema.Types.Boolean,
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    timestamps:true,
    versionKey: false,
  }
);

export const PackageModel = model(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);

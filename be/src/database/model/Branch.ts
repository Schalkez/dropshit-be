import { Schema, model } from "mongoose";

export const DOCUMENT_NAME = "Branch";
export const COLLECTION_NAME = "branchs";

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    img: {
      type: Schema.Types.String,
      required: true,
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

export const BranchModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);

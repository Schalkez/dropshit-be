import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Log";
export const COLLECTION_NAME = "logs";

export default interface Sample {
  _id: Types.ObjectId;
  ip: string;
}

const schema = new Schema<Sample>(
  {
    ip: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const LogsAdmin = model<Sample>(DOCUMENT_NAME, schema, COLLECTION_NAME);

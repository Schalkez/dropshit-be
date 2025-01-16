import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Setting";
export const COLLECTION_NAME = "settings";

export enum TypeSetting {
  TRUST = "TRUST",
  DAILY_ACCESS = "DAILY_ACCESS",
}

export default interface Setting {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  type: TypeSetting;
  point: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Setting>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(TypeSetting),
    },
    point: {
      type: Schema.Types.Number,
      default: 0,
    },
    createdAt: {
      type: Schema.Types.Date,
    },
    updatedAt: {
      type: Schema.Types.Date,
    },
  },
  {
    versionKey: false,
  }
);

export const SettingModel = model<Setting>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);

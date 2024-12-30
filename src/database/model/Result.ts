import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Result";
export const COLLECTION_NAME = "results";

export enum Category {
  COBAN = "COBAN",
  XI = "XYZ",
}

export default interface Sample {
  _id: Types.ObjectId;
  results?: Array<number>;
  resultsView?: any;
  status?: boolean;
  id_custom?: string;
  createdAt?: Date;
  updatedAt?: Date;
  timeEnd: Date;
}

const schema = new Schema<Sample>(
  {
    results: {
      type: [Schema.Types.Number],
      required: true,
    },
    resultsView: {
      type: Schema.Types.Array,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    id_custom: {
      type: Schema.Types.String,
      required: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
    timeEnd: {
      type: Schema.Types.Date,
      required: true,
      select: true,
    },
  },
  {
    versionKey: false,
  }
);

export const ResultModel = model<Sample>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);

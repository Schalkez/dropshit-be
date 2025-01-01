import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

export const DOCUMENT_NAME = "Category";
export const COLLECTION_NAME = "categories";

const subCategorySchema = new Schema(
  {
    tag: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    slug: { type: Schema.Types.String, slug: "name" },
    img: {
      type: Schema.Types.String,
      default: null,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  { _id: false }
);

const categorySchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    tag: {
      type: Schema.Types.String,
      required: true,
    },
    slug: { type: Schema.Types.String, slug: "name" },
    img: {
      type: Schema.Types.String,
      default: null,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    subCategories: {
      type: [subCategorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CategoryModel = model(
  DOCUMENT_NAME,
  categorySchema,
  COLLECTION_NAME
);

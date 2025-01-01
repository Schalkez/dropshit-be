import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import slugify from "slugify/slugify";
const URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

export const DOCUMENT_NAME = "Category";
export const COLLECTION_NAME = "categories";

const subCategorySchema = new Schema({
  tag: {
    type: Schema.Types.String,
    required: false,
  },
  name: {
    type: Map,
    of: String,
    required: true,
  },
  slug: { type: Schema.Types.String, unique: true },
  img: {
    type: Schema.Types.String,
    default: null,
  },
  status: {
    type: Schema.Types.Boolean,
    default: true,
  },
});

subCategorySchema.pre("save", function (next) {
  if (this.name && this.name.get("en")) {
    this.slug = slugify(this.name.get("en") || "", {
      lower: true,
      strict: true,
    });
  }
  next();
});

const categorySchema = new Schema(
  {
    name: {
      type: Map,
      of: String,
      required: true,
    },
    tag: {
      type: Schema.Types.String,
      required: false,
    },
    slug: { type: Schema.Types.String, unique: true },
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

categorySchema.pre("save", function (next) {
  if (this.name && this.name.get("en")) {
    this.slug = slugify(this.name.get("en") || "", {
      lower: true,
      strict: true,
    });
  }
  next();
});

export const CategoryModel = model(
  DOCUMENT_NAME,
  categorySchema,
  COLLECTION_NAME
);

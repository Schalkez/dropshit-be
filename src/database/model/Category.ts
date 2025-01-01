import { Schema, model } from "mongoose";
import slugify from "slugify/slugify";

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
  slug: { type: Schema.Types.String, unique: true, sparse: true }, // Sử dụng `sparse` để bỏ qua `null`/`undefined`
  img: {
    type: Schema.Types.String,
    default: null,
  },
  status: {
    type: Schema.Types.Boolean,
    default: true,
  },
});

// Middleware để gán giá trị cho slug
subCategorySchema.pre("save", function (next) {
  if (this.name && this.name.get("en")) {
    this.slug = slugify(this.name.get("en") || "", {
      lower: true,
      strict: true,
    });
  } else {
    this.slug = undefined; // Tránh gán `null`
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

// Middleware để gán giá trị cho slug của category
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

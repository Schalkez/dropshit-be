import { Schema, model } from "mongoose";

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
    img: {
      type: Schema.Types.String,
      default: null, // Không bắt buộc
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  { _id: false } // Không cần tạo `_id` riêng cho từng subCategory
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
    img: {
      type: Schema.Types.String,
      default: null, // Không bắt buộc
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    subCategories: {
      type: [subCategorySchema], // Là một mảng, nhưng không bắt buộc
      default: [], // Nếu không có, sẽ mặc định là mảng rỗng
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    versionKey: false, // Loại bỏ trường `__v`
  }
);

export const CategoryModel = model(
  DOCUMENT_NAME,
  categorySchema,
  COLLECTION_NAME
);

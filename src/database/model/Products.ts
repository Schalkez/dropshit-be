import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Product";
export const COLLECTION_NAME = "products";

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    // employee: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    wishlistUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    name: {
      type: Schema.Types.String,
    },
    price: {
      type: Schema.Types.String,
    },
    finalPrice: {
      type: Schema.Types.String,
    },
    isPublic: {
      type: Schema.Types.Boolean,
      default: true,
    },
    description: {
      type: Schema.Types.String,
    },
    type: {
      type: Schema.Types.String,
      enum: ["PHYSICAL", "VIRTUAL"],
      default: "PHYSICAL",
    },
    rate: {
      type: Schema.Types.Number,
      default: 0,
    },
    deliveryDays: {
      type: Schema.Types.Number,
      default: 0,
    },
    images: {
      type: [Schema.Types.String],
    },
    quantity: {
      type: Schema.Types.Number,
      default: 4999,
    },
    branch: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Branch",
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    isBestSelling: {
      type: Schema.Types.Boolean,
      default: true,
    },
    isProductFeature: {
      type: Schema.Types.Boolean,
      default: true,
    },
    saleDefault: {
      type: Schema.Types.String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      // ref: "subCategory",
      // required: true,
    },
    sellers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);

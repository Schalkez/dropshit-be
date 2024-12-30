import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Order";
export const COLLECTION_NAME = "orders";



const schema = new Schema(
  {
    employee:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    user:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    customer:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    product:{
      type:Schema.Types.Array,
    },
    profit:{
      type:Schema.Types.Number
    },
    gia_kho:{
      type:Schema.Types.Number
    },
    tongtien:{
      type:Schema.Types.Number
    },
    storePayment:{
      type:Schema.Types.Boolean,
      default:false
    },
    isPayment:{
      type:Schema.Types.Boolean,
      default:false
    },
    isPayMentStore:{
      type:Schema.Types.Boolean,
      default:false
    },
    status: {
      type: Schema.Types.String,
      default: "PENDING",
    },
  },
  {
    timestamps:true,
    versionKey: false,
  }
);

export const OrderModel  = model(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);

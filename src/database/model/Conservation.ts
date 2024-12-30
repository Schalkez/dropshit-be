import { ref } from "joi";
import mongoose, { Schema } from "mongoose";

const conserVationSchema = new mongoose.Schema(
  {
    messages: { type: Array },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("conservation", conserVationSchema);

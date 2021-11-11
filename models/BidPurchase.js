const { model, Schema } = require("mongoose");
const bidPurchaseSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    bid: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("bidPurchase", bidPurchaseSchema);

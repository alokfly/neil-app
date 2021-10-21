const { model, Schema } = require("mongoose");
const bidPurchaseSchema = new Schema(
  {
    subscription_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("bidPurchase", bidPurchaseSchema);

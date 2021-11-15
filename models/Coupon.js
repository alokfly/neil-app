const { model, Schema } = require("mongoose");
const couponSchema = new Schema(
  {
    couponCode: {
      type: String,
      required: true,
    },
    bids: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("coupon", couponSchema);

const { model, Schema } = require("mongoose");
const couponSchema = new Schema(
  {
    couponCode: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    userReedemCoupon: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    numberOfUserReedem: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = model("coupon", couponSchema);

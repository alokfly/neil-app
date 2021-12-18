const { model, Schema } = require("mongoose");
const exclusiveAuctionProgressSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    totoalUserBid: {
      type: Number,
      required: true,
    },
    totalAdminBid: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model(
  "exclusiveAuctionProgress",
  exclusiveAuctionProgressSchema
);

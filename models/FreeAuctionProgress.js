const { model, Schema } = require("mongoose");
const freeAuctionProgressSchema = new Schema(
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
module.exports = model("freeAuctionProgress", freeAuctionProgressSchema);

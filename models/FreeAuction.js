const { model, Schema } = require("mongoose");
const freeAuctionSchema = new Schema(
  {
    points: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("freeAuction", freeAuctionSchema);

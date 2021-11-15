const { model, Schema } = require("mongoose");
const exclusiveAuctionSchema = new Schema(
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
module.exports = model("exclusive", exclusiveAuctionSchema);

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
    bidName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("exclusiveAuction", exclusiveAuctionSchema);

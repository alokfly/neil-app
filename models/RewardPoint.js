const { model, Schema } = require("mongoose");
const rewardPointSchema = new Schema(
  {
    bid: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("rewardPoint", rewardPointSchema);

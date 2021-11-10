const { model, Schema } = require("mongoose");
const bidSchema = new Schema(
  {
    bid: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("bid", bidSchema);

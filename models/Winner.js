const { model, Schema } = require("mongoose");
const winnerSchema = new Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    bid: {
      type: Number,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("winner", winnerSchema);

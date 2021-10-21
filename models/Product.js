const { model, Schema } = require("mongoose");
const productSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    shoe_size: {
      type: String,
      required: true,
    },
    like: {
      type: String,
      required: true,
    },
    reminder: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("product", productSchema);

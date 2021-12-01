const { model, Schema } = require("mongoose");
const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    likeStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = model("product", productSchema);

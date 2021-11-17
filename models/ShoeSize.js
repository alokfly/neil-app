const { model, Schema } = require("mongoose");
const shoeSizeSchema = new Schema(
  {
    shoe_size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("shoeSize", shoeSizeSchema);

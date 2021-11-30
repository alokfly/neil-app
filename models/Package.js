const { model, Schema } = require("mongoose");
const packageSchema = new Schema(
  {
    bidno: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("package", packageSchema);

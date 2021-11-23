const { model, Schema } = require("mongoose");
const citySchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("city", citySchema);

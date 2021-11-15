const { model, Schema } = require("mongoose");
const stateSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("state", stateSchema);

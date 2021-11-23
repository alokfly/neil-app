const { model, Schema } = require("mongoose");
const stateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abbreviation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("state", stateSchema);

const { model, Schema } = require("mongoose");
const subscriptionSchema = new Schema(
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
module.exports = model("subscription", subscriptionSchema);

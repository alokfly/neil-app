const { model, Schema } = require("mongoose");
const userSubscriptionSchema = new Schema(
  {
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: "susbcriptions",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bidNumber: {
      type: Number,
      required: true,
    },
    bidPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("userSubscription", userSubscriptionSchema);

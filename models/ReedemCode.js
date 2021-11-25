const { model, Schema } = require("mongoose");
const reedemCodeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    reedemUser: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    bids: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);
module.exports = model("reedemCode", reedemCodeSchema);

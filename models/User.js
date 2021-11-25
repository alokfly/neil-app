const { model, Schema } = require("mongoose");
const userSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    shoe_size: {
      type: String,
      required: true,
    },
    bid: {
      type: Number,
      required: true,
      default: 0,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    agree: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("user", userSchema);

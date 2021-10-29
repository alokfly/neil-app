const { model, Schema } = require("mongoose");
const adminSchema = new Schema(
  {
    name: {
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
    userType: {
      type: String,
    },
    sucessCode: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = model("admin", adminSchema);

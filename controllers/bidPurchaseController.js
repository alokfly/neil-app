const BidPurchase = require("../models/BidPurchase");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

module.exports.bidPurchase = async (req, res) => {
  const { bid, productId, email } = req.body;
  try {
    const { _id } = await User.findOne({ email });
    const getBid = await BidPurchase.findOne({
      product_id: productId,
      user_id: _id,
    });
    if (getBid) {
      const placedBid = getBid.bid;
      const data = await BidPurchase.findOneAndUpdate(
        { product_id: productId, user_id: _id },
        {
          bid: placedBid + bid,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } else {
      const data = await BidPurchase.findOneAndUpdate(
        { product_id: productId, user_id: _id },
        {
          bid,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    return res.status(200).send({ msg: "bid placed successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.home = async (req, res) => {
  return res.status(200).send("home");
};

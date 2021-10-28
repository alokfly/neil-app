const BidPurchase = require("../models/BidPurchase");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

module.exports.bidPurchase = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const productId = req.params.id;
  const { bid, productId } = req.body;
  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, email) => {
      const { data } = email;
      const { _id } = await User.findOne({ email: data });
      const addBid = BidPurchase.create({
        user_id: _id,
        product_id: productId,
        bid,
      });
      return res.status(200).send({ msg: "Bid successfully placed" });
    });
  }
};

module.exports.home = async (req, res) => {
  return res.status(200).send("home");
};

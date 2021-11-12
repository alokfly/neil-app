const BidPurchase = require("../models/BidPurchase");
const User = require("../models/User");
const Product = require("../models/Product");
const Winner = require("../models/Winner");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectID;
require("dotenv").config();

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

module.exports.bidPurchase = async (req, res) => {
  const { bid, productId, email } = req.body;
  try {
    const { _id, username } = await User.findOne({ email });
    const productData = await Product.find({ _id: ObjectId(productId) });

    const getImage = productData.forEach(async (element) => {
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
            username,
            productName: element.productName,
            image: element.image,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } else {
        const data = await BidPurchase.findOneAndUpdate(
          { product_id: productId, user_id: _id },
          {
            bid,
            username,
            productName: element.productName,
            image: element.image,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    });

    return res.status(200).send({ msg: "bid placed successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.showBidPurchase = async (req, res) => {
  try {
    const response = await BidPurchase.find();
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.showWinner = async (req, res) => {
  const { productId } = req.body;
  const auctionWinner = await BidPurchase.findOne({
    product_id: productId,
  }).sort("-bid");
  const { productName, username, bid, image } = auctionWinner;
  await Winner.create({
    product_id: productId,
    productName,
    username,
    bid,
    image,
  });
  res.status(200).json({ auctionWinner });
};

module.exports.getWinner = async (req, res) => {
  try {
    const winner = await Winner.find().sort({ key: -1 });
    res.status(200).json(winner)
  } catch (error) {
    console.log(error);
  }
};

module.exports.home = async (req, res) => {
  return res.status(200).send("home");
};

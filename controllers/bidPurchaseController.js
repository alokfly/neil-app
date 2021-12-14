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
  const { userBid, productId, email } = req.body;
  try {
    const userDetail = await User.findOne({ email });
    const getProductDetail = await Product.findOne({
      _id: ObjectId(productId),
    });
    const getBid = getProductDetail.bid + userBid;
    const updateBid = await Product.findByIdAndUpdate(
      {
        _id: ObjectId(productId),
      },
      {
        $push: { bidingUser: userDetail._id },
        bid: getBid,
      }
    );
    const getUpdatedBid = await Product.findOne({
      _id: ObjectId(productId),
    })
      .populate("bidingUser", "username")
      .exec();
    return res.status(200).send({
      msg: "bid placed successfully",
      data: getUpdatedBid.bid,
      bidUsername: getUpdatedBid.bidingUser,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

module.exports.viewBidPurchaseUser = async (req, res) => {
  const { productId } = req.body;
  try {
    const getUpdatedBid = await Product.findOne({
      _id: ObjectId(productId),
    })
      .populate("bidingUser", "username")
      .exec();
    return res.status(200).send({
      data: getUpdatedBid.bid,
      bidUsername: getUpdatedBid.bidingUser,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
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
  try {
    const auctionWinner = await Product.findOne({
      _id: ObjectId(productId),
    })
      .populate("bidingUser", "username")
      .exec();
    const user = auctionWinner.bidingUser;
    const getWinner = user[user.length - 1];
    return res.status(200).send({
      bidUsername: auctionWinner,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

module.exports.getWinner = async (req, res) => {
  try {
    const winner = await Winner.find().sort({ key: -1 });
    res.status(200).json(winner);
  } catch (error) {
    console.log(error);
  }
};

module.exports.home = async (req, res) => {
  return res.status(200).send("home");
};

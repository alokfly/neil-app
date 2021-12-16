const BidPurchase = require("../models/BidPurchase");
const User = require("../models/User");
const Product = require("../models/Product");
const Winner = require("../models/Winner");
const RewardPoint = require("../models/RewardPoint");
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

module.exports.addWinner = async (req, res) => {
  const { productId } = req.body;
  try {
    const auctionWinner = await Product.findOne({
      _id: ObjectId(productId),
    })
      .populate("bidingUser", "username")
      .exec();
    const user = auctionWinner.bidingUser;
    const getWinner = user[user.length - 1];
    auctionWinner.image.forEach(async (item) => {
      const addWinner = await Winner.create({
        username: getWinner.username,
        productName: auctionWinner.productName,
        size: auctionWinner.size,
        bid: auctionWinner.bid,
        image: item,
      });
    });
    return res.status(201).send({ msg: "Winner added" });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

module.exports.getWinner = async (req, res) => {
  try {
    const winner = await Winner.find({})
      .sort({ created_at: -1 })
      .exec(function (err, response) {
        return res.status(200).json(response);
      });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

module.exports.addRewardPoints = async (req, res) => {
  const { bid, points } = req.body;
  try {
    const addRewardPoints = await RewardPoint.create({
      bid,
      points,
    });
    return res.status(201).json({ msg: "reward points successfully created" });
  } catch (error) {
    return res.status(500).json({ msg: errror.message });
  }
};

module.exports.getRewardPoints = async (req, res) => {
  try {
    const addRewardPoints = await RewardPoint.find();
    return res.status(200).json(addRewardPoints);
  } catch (error) {
    return res.status(500).json({ msg: errror.message });
  }
};

module.exports.editRewardPoints = async (req, res) => {
  const { bid, points } = req.body;
  try {
    const editRewardPoints = await RewardPoint.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        bid,
        points,
      }
    );
    return res.status(201).json({ msg: "reward points successfully edited" });
  } catch (error) {
    return res.status(500).json({ msg: errror.message });
  }
};

module.exports.deleteRewardPoints = async (req, res) => {
  try {
    const editRewardPoints = await RewardPoint.findByIdAndRemove({
      _id: ObjectId(req.params.id),
    });
    return res.status(200).json({ msg: "reward points successfully deleted" });
  } catch (error) {
    return res.status(500).json({ msg: errror.message });
  }
};

module.exports.home = async (req, res) => {
  return res.status(200).send("home");
};

const BidPurchase = require("../models/BidPurchase");
const User = require("../models/User");
const Product = require("../models/Product");
const FreeAuction = require("../models/FreeAuction");
const ExclusiveAuction = require("../models/ExclusiveAuction");
const Winner = require("../models/Winner");
const RewardPoint = require("../models/RewardPoint");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectID;
const FreeAuctionProgress = require("../models/FreeAuctionProgress");
const ExclusiveAuctionProgress = require("../models/ExclusiveAuctionProgress");
require("dotenv").config();

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

module.exports.bidPurchase = async (req, res) => {
  const { userBid, productId, email, status } = req.body;
  try {
    const userDetail = await User.findOne({ email });
    if (status === 1) {
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
    } else if (status === 2) {
      const getProductDetail = await FreeAuction.findOne({
        _id: ObjectId(productId),
      });
      const repeatData = await FreeAuction.aggregate([
        {
          $project: {
            userId: {
              $size: {
                $filter: {
                  input: "$bidingUser",
                  as: "item",
                  cond: {
                    $eq: ["$$item", userDetail._id],
                  },
                },
              },
            },
          },
        },
      ]);
      repeatData.forEach(async (item) => {
        const userCanBid = item.userId.length - 1;
        if (getProductDetail.numerofUserCanRedeem > userCanBid) {
          const getBid = getProductDetail.bid + userBid;
          const updateBid = await FreeAuction.findByIdAndUpdate(
            {
              _id: ObjectId(productId),
            },
            {
              $push: { bidingUser: userDetail._id },
              bid: getBid,
            }
          );
          const getUpdatedBid = await FreeAuction.findOne({
            _id: ObjectId(productId),
          })
            .populate("bidingUser", "username")
            .exec();
          return res.status(200).send({
            msg: "bid placed successfully",
            data: getUpdatedBid.bid,
            bidUsername: getUpdatedBid.bidingUser,
          });
        } else {
          return res.status(400).send({
            msg: "Your bid limit is exceded",
          });
        }
      });
    } else {
      const getProductDetail = await ExclusiveAuction.findOne({
        _id: ObjectId(productId),
      });
      const repeatData = await ExclusiveAuction.aggregate([
        {
          $project: {
            userId: {
              $size: {
                $filter: {
                  input: "$bidingUser",
                  as: "item",
                  cond: {
                    $eq: ["$$item", userDetail._id],
                  },
                },
              },
            },
          },
        },
      ]);
      repeatData.forEach(async (item) => {
        const userCanBid = item.userId.length - 1;
        if (getProductDetail.numerofUserCanRedeem > userCanBid) {
          const getBid = getProductDetail.bid + userBid;
          const updateBid = await ExclusiveAuction.findByIdAndUpdate(
            {
              _id: ObjectId(productId),
            },
            {
              $push: { bidingUser: userDetail._id },
              bid: getBid,
            }
          );
          const getUpdatedBid = await ExclusiveAuction.findOne({
            _id: ObjectId(productId),
          })
            .populate("bidingUser", "username")
            .exec();
          return res.status(200).send({
            msg: "bid placed successfully",
            data: getUpdatedBid.bid,
            bidUsername: getUpdatedBid.bidingUser,
          });
        } else {
          return res.status(400).send({
            msg: "Your bid limit is exceded",
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

module.exports.viewBidPurchaseUser = async (req, res) => {
  const { productId, status } = req.body;
  try {
    if (status === 1) {
      const getUpdatedBid = await Product.findOne({
        _id: ObjectId(productId),
      })
        .populate("bidingUser", "username")
        .exec();
      return res.status(200).send({
        data: getUpdatedBid.bid,
        bidUsername: getUpdatedBid.bidingUser,
      });
    } else if (status === 2) {
      const getUpdatedBid = await FreeAuction.findOne({
        _id: ObjectId(productId),
      })
        .populate("bidingUser", "username")
        .exec();
      return res.status(200).send({
        data: getUpdatedBid.bid,
        bidUsername: getUpdatedBid.bidingUser,
      });
    } else {
      const getUpdatedBid = await ExclusiveAuction.findOne({
        _id: ObjectId(productId),
      })
        .populate("bidingUser", "username")
        .exec();
      return res.status(200).send({
        data: getUpdatedBid.bid,
        bidUsername: getUpdatedBid.bidingUser,
      });
    }
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
    const checkProductId = await Winner.findOne({ productId });
    if (checkProductId === null) {
      const addWinner = await Winner.create({
        productId,
        username: getWinner.username,
        productName: auctionWinner.productName,
        size: auctionWinner.size,
        bid: auctionWinner.bid,
        image: auctionWinner.image,
      });
      return res
        .status(201)
        .send({ msg: "Winner added", addWinner, getWinner });
    } else {
      return res.status(400).send({ msg: "already added" });
    }
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

module.exports.getWinner = async (req, res) => {
  try {
    const winner = await Winner.find({})
      .sort({ _id: -1 })
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
    const addRewardPoints = await RewardPoint.findOne({});
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

module.exports.claimRewardPoints = async (req, res) => {
  const { email } = req.body;
  try {
    const getUserDetail = await User.findOne({ email });
    const getRewardPoints = await RewardPoint.findOne({});
    if (getUserDetail.points >= getRewardPoints.points) {
      const totalBids = getUserDetail.bids + getRewardPoints.bid;
      const upadatePoints = getUserDetail.points - getRewardPoints.points;
      const updateBid = await User.findOneAndUpdate(
        { email },
        {
          bids: totalBids,
          points: upadatePoints,
        }
      );
      const updatedUserDetail = await User.findOne({ email });
      return res
        .status(200)
        .json({ msg: "Reward points successfully claimed", updatedUserDetail });
    } else {
      return res.status(400).json({ msg: "You don't have enough points" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.totalUserBidingFreeAuction = async (req, res) => {
  const { productId, email } = req.body;
  try {
    const userDetail = await User.findOne({ email });
    const getProduct = await FreeAuction.findOne({ _id: ObjectId(productId) });
    const numberofUser = getProduct.totalUserBiding.length;
    if (getProduct.numerofUserCanRedeem > numberofUser) {
      const addUserBid = await FreeAuction.findByIdAndUpdate(
        {
          _id: ObjectId(productId),
        },
        {
          $push: { totalUserBiding: userDetail._id },
        }
      );
      const updatedPoduct = await FreeAuction.findOne({
        _id: ObjectId(productId),
      });
      const updatedOfUser = updatedPoduct.totalUserBiding.length;
      const addProgress = await FreeAuctionProgress.findByIdAndUpdate(
        { _id: ObjectId(productId) },
        {
          productId,
          totoalUserBid: updatedOfUser,
          totalAdminBid: getProduct.numerofUserCanRedeem,
        },
        { upsert: true }
      );
      return res
        .status(200)
        .json({ updatedOfUser, user: getProduct.numerofUserCanRedeem });
    } else {
      return res.status(400).json({ msg: "You can not claim now" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.totalUserBidingExclusiveAuction = async (req, res) => {
  const { productId, email } = req.body;
  try {
    const userDetail = await User.findOne({ email });
    const getProduct = await ExclusiveAuction.findOne({
      _id: ObjectId(productId),
    });
    const numberofUser = getProduct.totalUserBiding.length;
    if (getProduct.numerofUserCanRedeem > numberofUser) {
      const addUserBid = await ExclusiveAuction.findByIdAndUpdate(
        {
          _id: ObjectId(productId),
        },
        {
          $push: { totalUserBiding: userDetail._id },
        }
      );
      const updatedPoduct = await ExclusiveAuction.findOne({
        _id: ObjectId(productId),
      });
      const updatedOfUser = updatedPoduct.totalUserBiding.length;
      const addProgress = await ExclusiveAuctionProgress.findByIdAndUpdate(
        { _id: ObjectId(productId) },
        {
          productId,
          totoalUserBid: updatedOfUser,
          totalAdminBid: getProduct.numerofUserCanRedeem,
        },
        { upsert: true }
      );
      return res
        .status(200)
        .json({ updatedOfUser, user: getProduct.numerofUserCanRedeem });
    } else {
      return res.status(400).json({ msg: "You can not claim now" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.getFreeAuctionProgress = async (req, res) => {
  try {
    const getFreeAuctionProgress = await FreeAuctionProgress.findOne({
      _id: ObjectId(req.body.productId),
    });
    return res.status(200).json(getFreeAuctionProgress);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.getExclusiveAuctionProgress = async (req, res) => {
  try {
    const getExclusiveAuctionProgress = await ExclusiveAuctionProgress.findOne({
      _id: ObjectId(req.body.productId),
    });
    return res.status(200).json(getExclusiveAuctionProgress);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.home = async (req, res) => {
  return res.status(200).send("home");
};

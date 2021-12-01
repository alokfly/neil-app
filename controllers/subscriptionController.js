const Subscription = require("../models/Susbcription");
const Package = require("../models/Package");
const UserSubscription = require("../models/UserSubscription");
var ObjectId = require("mongodb").ObjectID;

module.exports.addSubscription = async (req, res) => {
  const { bidno, price } = req.body;
  try {
    const addSub = await Subscription.create({
      bidno,
      price,
    });
    return res.status(200).send({ msg: "Susbcription added successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.subscriptionDetail = async (req, res) => {
  try {
    const response = await Subscription.find();
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateSubscription = async (req, res) => {
  let { bidno, price } = req.body;
  try {
    const response = await Subscription.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        bidno,
        price,
      }
    );
    res.status(200).send({ msg: "Subscription successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteSubscription = async (req, res) => {
  try {
    const response = await Subscription.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Subscription deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addPackage = async (req, res) => {
  const { bidno, price, start_date, end_date } = req.body;
  try {
    const addSub = await Package.create({
      bidno,
      price,
      start_date,
      end_date,
    });
    return res.status(200).send({ msg: "Package added successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.packageDetail = async (req, res) => {
  try {
    const response = await Package.find();
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updatePackage = async (req, res) => {
  let { bidno, price, start_date, end_date } = req.body;
  try {
    const response = await Package.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        bidno,
        price,
        start_date,
        end_date,
      }
    );
    res.status(200).send({ msg: "Package successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deletePackage = async (req, res) => {
  try {
    const response = await Package.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Package deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addUserSubscription = async (req, res) => {
  const { subscriptionId, email, bidNumber, bidPrice } = req.body;
  try {
    const userSubs = await UserSubscription.create({
      subscriptionId,
      email,
      bidNumber,
      bidPrice,
    });
    res.status(200).json({ msg: "subscription successfully purchased" });
  } catch (error) {
    res.status(400).json(error);
  }
};

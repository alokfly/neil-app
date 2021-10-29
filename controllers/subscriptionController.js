const Subscription = require("../models/Susbcription");
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
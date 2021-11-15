const FreeAuction = require("../models/FreeAuction");
const ExclusiveAuction = require("../models/ExclusiveAuction");
var ObjectId = require("mongodb").ObjectID;

module.exports.addFreeAuction = async (req, res) => {
  const { points, day } = req.body;
  try {
    await FreeAuction.create({ points, day });
    res.status(200).json({ msg: "Free auction created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getFreeAuction = async (req, res) => {
  try {
    const response = await FreeAuction.find();
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateFreeAuction = async (req, res) => {
  let { points, day } = req.body;
  try {
    const response = await FreeAuction.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        points,
        day,
      }
    );
    res.status(200).send({ msg: "Free auction successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteFreeAuction = async (req, res) => {
  try {
    const response = await FreeAuction.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Free auction deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addExclusiveAuction = async (req, res) => {
  const { points, day } = req.body;
  try {
    await ExclusiveAuction.create({ points, day });
    res.status(200).json({ msg: "Exclusive auction created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getExclusiveAuction = async (req, res) => {
  try {
    const response = await ExclusiveAuction.find();
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateExclusiveAuction = async (req, res) => {
  let { points, day } = req.body;
  try {
    const response = await ExclusiveAuction.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        points,
        day,
      }
    );
    res.status(200).send({ msg: "Exclusive Auction successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteExclusiveAuction = async (req, res) => {
  try {
    const response = await ExclusiveAuction.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Exclusive Auction deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

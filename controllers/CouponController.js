const Coupon = require("../models/Coupon");
var ObjectId = require("mongodb").ObjectID;

module.exports.addCoupon = async (req, res) => {
  const { couponCode, bids } = req.body;
  try {
    const checkCoupon = await Coupon.findOne({ couponCode });
    if (!checkCoupon) {
      await Coupon.create({ couponCode, bids });
      res.status(200).json({ msg: "coupon created successfully" });
    } else {
      res.status(404).json({ msg: "coupon code already exist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getCoupon = async (req, res) => {
  try {
    const response = await Coupon.find();
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateCoupon = async (req, res) => {
  let { couponCode, bids } = req.body;
  try {
    const checkCoupon = await Coupon.findOne({ couponCode });
    if (!checkCoupon) {
      const response = await Coupon.findByIdAndUpdate(
        { _id: ObjectId(req.params.id) },
        {
          couponCode,
          bids,
        }
      );
      res.status(200).send({ msg: "coupon successfully updated" });
    } else {
      res.status(404).json({ msg: "coupon code already exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteCoupon = async (req, res) => {
  try {
    const response = await Coupon.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Coupon deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

const Coupon = require("../models/Coupon");
const User = require("../models/User");
var ObjectId = require("mongodb").ObjectID;

module.exports.addCoupon = async (req, res) => {
  const { couponCode, expiryDate, points, numberOfUserReedem } = req.body;
  try {
    const checkCoupon = await Coupon.findOne({ couponCode });
    if (!checkCoupon) {
      await Coupon.create({
        couponCode,
        expiryDate,
        points,
        numberOfUserReedem,
      });
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
  let { couponCode, expiryDate, points, numberOfUserReedem } = req.body;
  try {
    const checkCoupon = await Coupon.findOne({ couponCode });
    if (!checkCoupon) {
      const response = await Coupon.findByIdAndUpdate(
        { _id: ObjectId(req.params.id) },
        {
          couponCode,
          expiryDate,
          points,
          numberOfUserReedem,
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

module.exports.redeemCode = async (req, res) => {
  const { code, email } = req.body;
  try {
    const userApplyingCode = await User.findOne({ email });

    const checkCode = await User.findOne({ code });

    const findUserAlreayApplyCode = await User.findOne({
      userReedemCode: { $in: userApplyingCode._id },
    });
    console.log(findUserAlreayApplyCode);
    if (findUserAlreayApplyCode == null) {
      if (checkCode != null) {
        const totalPointsUpdated = 10 + checkCode.points;
        const updatePointsOwner = await User.findByIdAndUpdate(
          {
            _id: ObjectId(checkCode._id),
          },
          {
            $push: { userReedemCode: userApplyingCode._id },
            points: totalPointsUpdated,
          },
          {
            new: true,
          }
        );
        const totalPointsUpdatedUser = 10 + userApplyingCode.points;
        const updatePointsWhoApplyCoupon = await User.findByIdAndUpdate(
          {
            _id: ObjectId(userApplyingCode._id),
          },
          {
            points: totalPointsUpdatedUser,
          }
        );
        return res.status(201).json({ msg: "Code applied successfully" });
      } else {
        return res.status(400).json({ msg: "Code not found" });
      }
    } else {
      return res.status(404).json({ msg: "You already applied the code" });
    }
  } catch (error) {
    console.log(error);
  }
};

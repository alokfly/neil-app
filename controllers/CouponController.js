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
  const { code, email, couponCode } = req.body;
  try {
    const userApplyingCode = await User.findOne({ email });

    if (code) {
      const checkCode = await User.findOne({ code });
      const findUserAlreayApplyCode = await User.findOne({
        userReedemCode: { $in: userApplyingCode._id },
      });
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
    } else {
      const userId = userApplyingCode._id;
      const checkCouponCode = await Coupon.findOne({ couponCode });
      if (checkCouponCode) {
        const getExpiryDateofCoupon = checkCouponCode.expiryDate;
        var m = new Date();
        var todaysDate =
          m.getUTCFullYear() +
          "-" +
          (m.getUTCMonth() + 1) +
          "-" +
          m.getUTCDate();
        if (getExpiryDateofCoupon < todaysDate) {
          const findUserAlreayApplyCouponCode = await Coupon.findOne({
            _id: ObjectId(checkCouponCode._id),
            userReedemCoupon: { $in: userApplyingCode._id },
          });
          console.log();
          const totalRecord = await Coupon.aggregate([
            { $match: { _id: ObjectId(checkCouponCode._id) } },
            {
              $project: {
                item: 1,
                numberOfUser: {
                  $cond: {
                    if: { $isArray: "$userReedemCoupon" },
                    then: { $size: "$userReedemCoupon" },
                    else: "NA",
                  },
                },
              },
            },
          ]);
          console.log(totalRecord);
          totalRecord.forEach(async (element) => {
            if (element.numberOfUser < checkCouponCode.numberOfUserReedem) {
              if (!findUserAlreayApplyCouponCode) {
                await Coupon.findByIdAndUpdate(
                  { _id: ObjectId(checkCouponCode._id) },
                  {
                    $push: { userReedemCoupon: userApplyingCode._id },
                  },
                  {
                    new: true,
                  }
                ).exec((err, result) => {
                  if (err) {
                    console;
                    return res.status(422).json(err);
                  } else {
                    res.json({ msg: "Coupon Applied successfully", result });
                  }
                });
                const totalPoints =
                  checkCouponCode.points + userApplyingCode.points;
                const updatePoints = await User.findByIdAndUpdate(
                  {
                    _id: ObjectId(userApplyingCode._id),
                  },
                  { points: totalPoints }
                );
              } else {
                res
                  .status(400)
                  .json({ msg: "You already applied this coupon" });
              }
            } else {
              res.status(400).json({
                msg: "Sorry, You can not apply this coupon because limit is over",
              });
            }
          });
        } else {
          res.status(400).json({
            msg: "coupon is expired",
          });
        }
      } else {
        res.status(400).json({
          msg: "Coupon code not exist",
        });
        console.log("Coupon code not exist");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

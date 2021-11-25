const app = require("express");
const router = app.Router();
const {
  addCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  redeemCode,
} = require("../controllers/CouponController");

router.post("/addCoupon", addCoupon);
router.get("/getCoupon", getCoupon);
router.post("/updateCoupon/:id", updateCoupon);
router.get("/deleteCoupon/:id", deleteCoupon);

router.post("/redeemCode", redeemCode);
module.exports = router;

const app = require("express");
const router = app.Router();
const {
  addCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/CouponController");

router.post("/addCoupon", addCoupon);
router.get("/getCoupon", getCoupon);
router.post("/updateCoupon/:id", updateCoupon);
router.get("/deleteCoupon/:id", deleteCoupon);

module.exports = router;

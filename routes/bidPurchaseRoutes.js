const app = require("express");
const auth = require("../utils/auth");
const router = app.Router();
const { authenticateUser } = require("../controllers/userController");
const {
  bidPurchase,
  home,
  showBidPurchase,
} = require("../controllers/bidPurchaseController");
router.post("/bidPurchase", bidPurchase);
router.post("/showBidPurchase", showBidPurchase);
router.post("/home", authenticateUser, home);
module.exports = router;

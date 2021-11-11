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
router.get("/showBidPurchase", showBidPurchase);
router.post("/home", authenticateUser, home);
module.exports = router;

const app = require("express");
const auth = require("../utils/auth");
const router = app.Router();
const { authenticateUser } = require("../controllers/userController");
const {
  bidPurchase,
  home,
  showBidPurchase,
  showWinner,
  getWinner,
} = require("../controllers/bidPurchaseController");
router.post("/bidPurchase", bidPurchase);
router.get("/showBidPurchase", showBidPurchase);
router.post("/showWinner", showWinner);
router.get("/getWinner", getWinner);
router.post("/home", authenticateUser, home);
module.exports = router;

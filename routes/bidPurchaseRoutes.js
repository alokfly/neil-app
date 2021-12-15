const app = require("express");
const auth = require("../utils/auth");
const router = app.Router();
const { authenticateUser } = require("../controllers/userController");
const {
  bidPurchase,
  viewBidPurchaseUser,
  home,
  showBidPurchase,
  addWinner,
  getWinner,
} = require("../controllers/bidPurchaseController");
router.post("/bidPurchase", bidPurchase);
router.post("/viewBidPurchaseUser", viewBidPurchaseUser);
router.get("/showBidPurchase", showBidPurchase);
router.post("/addWinner", addWinner);
router.get("/getWinner", getWinner);
router.post("/home", authenticateUser, home);
module.exports = router;

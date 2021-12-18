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
  addRewardPoints,
  getRewardPoints,
  editRewardPoints,
  deleteRewardPoints,
  claimRewardPoints,
  totalUserBiding,
  totalUserBidingFreeAuction,
  totalUserBidingExclusiveAuction,
  getFreeAuctionProgress,
  getExclusiveAuctionProgress,
} = require("../controllers/bidPurchaseController");
router.post("/bidPurchase", bidPurchase);
router.post("/viewBidPurchaseUser", viewBidPurchaseUser);
router.get("/showBidPurchase", showBidPurchase);
router.post("/addWinner", addWinner);
router.get("/getWinner", getWinner);

router.post("/addRewardPoints", addRewardPoints);
router.get("/getRewardPoints", getRewardPoints);
router.patch("/editRewardPoints/:id", editRewardPoints);
router.get("/deleteRewardPoints/:id", deleteRewardPoints);

router.post("/claimRewardPoints", claimRewardPoints);

router.post("/home", authenticateUser, home);

router.post("/totalUserBidingFreeAuction", totalUserBidingFreeAuction);
router.post(
  "/totalUserBidingExclusiveAuction",
  totalUserBidingExclusiveAuction
);

router.post("/getFreeAuctionProgress", getFreeAuctionProgress);
router.post("/getExclusiveAuctionProgress", getExclusiveAuctionProgress);

module.exports = router;

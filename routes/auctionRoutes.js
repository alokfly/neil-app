const app = require("express");
const router = app.Router();
const {
  addFreeAuction,
  getFreeAuction,
  updateFreeAuction,
  deleteFreeAuction,
  addExclusiveAuction,
  getExclusiveAuction,
  updateExclusiveAuction,
  deleteExclusiveAuction,
} = require("../controllers/AuctionController");

router.post("/addFreeAuction", addFreeAuction);
router.get("/getFreeAuction", getFreeAuction);
router.post("/updateFreeAuction/:id", updateFreeAuction);
router.get("/deleteFreeAuction/:id", deleteFreeAuction);

router.post("/addExclusiveAuction", addExclusiveAuction);
router.get("/getExclusiveAuction", getExclusiveAuction);
router.post("/updateExclusiveAuction/:id", updateExclusiveAuction);
router.get("/deleteExclusiveAuction/:id", deleteExclusiveAuction);

module.exports = router;

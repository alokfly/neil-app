const app = require("express");
const router = app.Router();
const {
  register,
  login,
  emailSendAdmin,
  changePasswordAdmin,
  addBidAdmin,
  getBidDetail,
  updateBid,
  deleteBid,
} = require("../controllers/adminController");
router.post("/registerAdmin", register);
router.post("/loginAdmin", login);
router.post("/email-sendAdmin", emailSendAdmin);
router.post("/change-passwordAdmin", changePasswordAdmin);

router.post("/addBid", addBidAdmin);
router.get("/getBidDetail", getBidDetail);
router.post("/updateBid/:id", updateBid);
router.get("/deleteBid/:id", deleteBid);
module.exports = router;

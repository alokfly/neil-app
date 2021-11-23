const app = require("express");
const router = app.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

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

router.post("/addFreeAuction", upload.array("myField", 5), addFreeAuction);
router.get("/getFreeAuction", getFreeAuction);
router.post(
  "/updateFreeAuction/:id",
  upload.array("myField", 5),
  updateFreeAuction
);
router.get("/deleteFreeAuction/:id", deleteFreeAuction);

router.post(
  "/addExclusiveAuction",
  upload.array("myField", 5),
  addExclusiveAuction
);
router.get("/getExclusiveAuction", getExclusiveAuction);
router.post(
  "/updateExclusiveAuction/:id",
  upload.array("myField", 5),
  updateExclusiveAuction
);
router.get("/deleteExclusiveAuction/:id", deleteExclusiveAuction);

module.exports = router;

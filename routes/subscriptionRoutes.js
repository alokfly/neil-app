const app = require("express");
const router = app.Router();
const {
  addSubscription,
  subscriptionDetail,
  updateSubscription,
  deleteSubscription,
  addUserSubscription,
  addPackage,
  packageDetail,
  updatePackage,
  deletePackage,
} = require("../controllers/subscriptionController");

router.post("/addSubscription", addSubscription);
router.get("/subscriptionDetail", subscriptionDetail);
router.post("/updateSubscription/:id", updateSubscription);
router.get("/deleteSubscription/:id", deleteSubscription);

router.post("/addPackage", addPackage);
router.get("/packageDetail", packageDetail);
router.post("/updatePackage/:id", updatePackage);
router.get("/deletePackage/:id", deletePackage);

router.post("/addUserSubscription", addUserSubscription);

module.exports = router;

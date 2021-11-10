const app = require("express");
const router = app.Router();
const {
  addSubscription,
  subscriptionDetail,
  updateSubscription,
  deleteSubscription,
  addUserSubscription,
} = require("../controllers/subscriptionController");

router.post("/addSubscription", addSubscription);
router.get("/subscriptionDetail", subscriptionDetail);
router.post("/updateSubscription/:id", updateSubscription);
router.get("/deleteSubscription/:id", deleteSubscription);
router.post("/addUserSubscription", addUserSubscription);

module.exports = router;

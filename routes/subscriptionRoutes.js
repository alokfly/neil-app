const app = require("express");
const router = app.Router();
const {
  addSubscription,
  subscriptionDetail,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/subscriptionController");

router.post("/addSubscription", addSubscription);
router.get("/subscriptionDetail", subscriptionDetail);
router.post("/updateSubscription/:id", updateSubscription);
router.get("/deleteSubscription/:id", deleteSubscription);

module.exports = router;

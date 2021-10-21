const app = require("express");
const auth = require("../utils/auth");
const router = app.Router();
const { bidPurchase } = require("../controllers/bidPurchaseController");
router.post("/bidPurchase", auth, bidPurchase);
module.exports = router;

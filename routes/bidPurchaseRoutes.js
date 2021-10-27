const app = require("express");
const auth = require("../utils/auth");
const router = app.Router();
const { bidPurchase, home } = require("../controllers/bidPurchaseController");
router.post("/bidPurchase", auth, bidPurchase);
router.post("/home", auth, home);
module.exports = router;

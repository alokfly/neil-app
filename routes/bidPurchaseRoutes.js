const app = require("express");
const auth = require("../utils/auth");
const router = app.Router();
const { authenticateUser } = require("../controllers/userController");
const { bidPurchase, home } = require("../controllers/bidPurchaseController");
router.post("/bidPurchase", bidPurchase);
router.post("/home", authenticateUser, home);
module.exports = router;

const app = require("express");
const auth = require("../utils/auth");
const router = app.Router();
const { addProduct } = require("../controllers/productController");
router.post("/addProduct", auth, addProduct);
module.exports = router;

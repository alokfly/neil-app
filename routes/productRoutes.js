const app = require("express");
const auth = require("../utils/auth");
const router = app.Router();
const { addProduct, getProduct } = require("../controllers/productController");
router.post("/addProduct", auth, addProduct);
router.get("/getProduct", getProduct);
module.exports = router;

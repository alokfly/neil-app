const app = require("express");
const auth = require("../utils/auth");
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
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
router.post("/addProduct", upload.array("myField", 5), addProduct);
router.get("/getProduct", getProduct);
router.get("/deleteProduct/:id", deleteProduct);
router.post("/updateProduct/:id", updateProduct);
module.exports = router;

const app = require("express");
const auth = require("../utils/auth");
const router = app.Router();

const path = require("path");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, "product_" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

const {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  addShoeSize,
  getShoeSize,
  updateShoeSize,
  deleteShoeSize,
  likeProduct,
  getLikedProduct,
  addComment,
  viewComment,
} = require("../controllers/productController");
router.post("/addProduct", upload.array("myField", 5), addProduct);
router.get("/getProduct", getProduct);
router.get("/deleteProduct/:id", deleteProduct);
router.post("/updateProduct/:id", updateProduct);

router.post("/addShoeSize", addShoeSize);
router.get("/getShoeSize", getShoeSize);
router.post("/updateShoeSize/:id", updateShoeSize);
router.get("/deleteShoeSize/:id", deleteShoeSize);

router.post("/likeProduct", likeProduct);
router.post("/getLikedProduct", getLikedProduct);

router.post("/addComment", addComment);
router.post("/viewComment", viewComment);
module.exports = router;

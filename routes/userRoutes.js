const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");
const {
  register,
  registerValiations,
  loginValiations,
  login,
  updateUser,
  updateUserImage,
} = require("../controllers/userController");
router.post("/register", registerValiations, register);
router.post("/login", loginValiations, login);
router.post("/update-user/:id", auth, updateUser);
router.post("/update-user-image/:id", auth, updateUserImage);
module.exports = router;

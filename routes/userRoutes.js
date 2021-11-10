const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");
const {
  register,
  registerValiations,
  loginValiations,
  login,
  emailSend,
  changePassword,
  updateUser,
  updateUserImage,
  logout,
} = require("../controllers/userController");
router.post("/register", registerValiations, register);
router.post("/login", loginValiations, login);
router.post("/email-send", emailSend);
router.post("/change-password", changePassword);
router.get("/logout", logout);
router.post("/update-user/:id", auth, updateUser);
router.post("/update-user-image/:id", auth, updateUserImage);
module.exports = router;

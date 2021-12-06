const app = require("express");
const router = app.Router();
const {
  register,
  registerValiations,
  loginValiations,
  login,
  emailSend,
  changePassword,
  logout,
  getUser,
  getCity,
  getState,
  editUser,
  insertCity,
  getParticularUserData,
} = require("../controllers/userController");
router.post("/register", registerValiations, register);
router.post("/login", loginValiations, login);
router.post("/email-send", emailSend);
router.post("/change-password", changePassword);
router.get("/logout", logout);
router.post("/editUser", editUser);
router.get("/getCity/:name", getCity);
router.get("/getState", getState);
router.get("/getUser", getUser);
router.post("/insertCity", insertCity);
router.post("/getParticularUserData", getParticularUserData);

module.exports = router;

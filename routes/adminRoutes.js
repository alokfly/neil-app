const app = require("express");
const router = app.Router();
const {
  register,
  login,
  emailSendAdmin,
  changePasswordAdmin,
} = require("../controllers/adminController");
router.post("/registerAdmin", register);
router.post("/loginAdmin", login);
router.post("/email-sendAdmin", emailSendAdmin);
router.post("/change-passwordAdmin", changePasswordAdmin);
module.exports = router;

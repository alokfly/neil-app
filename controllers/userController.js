const { body, validationResult } = require("express-validator");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
let refreshTokens = [];
let accessTokens = [];
const User = require("../models/User");
const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, {
    expiresIn: "7d",
  });
};
module.exports.registerValiations = [
  body("full_name").not().isEmpty().trim().withMessage("Full Name is required"),
  body("username").not().isEmpty().trim().withMessage("Username is required"),
  body("gender").not().isEmpty().trim().withMessage("Gender is required"),
  body("shoe_size").not().isEmpty().trim().withMessage("Shoe Size is required"),
  body("city").not().isEmpty().trim().withMessage("City is required"),
  body("state").not().isEmpty().trim().withMessage("state is required"),
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("agree")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Please accept the agreement"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];
module.exports.register = async (req, res) => {
  const {
    full_name,
    username,
    email,
    password,
    gender,
    shoe_size,
    city,
    state,
    agree,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already taken" }] });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({
        full_name,
        username,
        email,
        password: hash,
        gender,
        shoe_size,
        city,
        state,
        agree,
      });
      const token = createToken(user);
      return res
        .status(200)
        .json({ msg: "Your account has been created", token });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
module.exports.loginValiations = [
  body("email").not().isEmpty().trim().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const accessToken = jwt.sign({ data: email }, JWT_AUTH_TOKEN, {
          expiresIn: "1y",
        });
        const refreshToken = jwt.sign({ data: email }, JWT_REFRESH_TOKEN, {
          expiresIn: "1y",
        });
        refreshTokens.push(refreshToken);
        accessTokens.push(accessToken);
        res
          .status(202)
          .cookie("accessToken", accessToken, {
            expires: new Date(new Date().getTime() + 31557600000),
            sameSite: "strict",
            httpOnly: true,
          })
          .cookie("refreshToken", refreshToken, {
            expires: new Date(new Date().getTime() + 31557600000),
            sameSite: "strict",
            httpOnly: true,
          })
          .cookie("authSession", true, {
            expires: new Date(new Date().getTime() + 31557600000),
            sameSite: "strict",
          })
          .cookie("refreshTokenID", true, {
            expires: new Date(new Date().getTime() + 31557600000),
            sameSite: "strict",
          })
          .send({ msg: "Login Successfull" });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "Password is not correct" }] });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "Email not found" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports.authenticateUser = async = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, email) => {
    if (email) {
      req.email = email;
      next();
    } else if (err.message === "TokenExpiredError") {
      return res.status(403).send({
        success: false,
        msg: "Access token expired",
      });
    } else {
      console.log(err);
      return res.status(403).send({ err, msg: "User not authenticated" });
    }
  });
};

module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const {
    full_name,
    username,
    password,
    newPassword,
    gender,
    shoe_size,
    city,
    state,
    agree,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    if (password) {
      const user = await User.findOne({ _id: id });
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Current password is wrong" }] });
      }
    }
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        const response = await User.findByIdAndUpdate(id, {
          full_name,
          username,
          password: hash,
          gender,
          shoe_size,
          city,
          state,
          agree,
        });
      } else {
        const response = await User.findByIdAndUpdate(id, {
          full_name,
          username,
          gender,
          shoe_size,
          city,
          state,
          agree,
        });
      }

      return res.status(200).json({ msg: "User been updated" });
    } catch (error) {
      return res.status(500).json({ errors });
    }
  }
};

module.exports.updateUserImage = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (errors, fields, files) => {
    const id = req.params.id;
    const imageErrors = [];
    if (Object.keys(files).length === 0) {
      imageErrors.push({ msg: "Please choose image" });
    } else {
      const { type } = files.image;
      const split = type.split("/");
      const extension = split[1].toLowerCase();
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        imageErrors.push({ msg: `${extension} is not a valid extension` });
      } else {
        files.image.name = uuidv4() + "." + extension;
      }
    }
    if (imageErrors.length !== 0) {
      return res.status(400).json({ errors: imageErrors });
    } else {
      const newPath = __dirname + `/../images/user/${files.image.name}`;
      fs.copyFile(files.image.path, newPath, async (error) => {
        if (!error) {
          try {
            const response = await User.findByIdAndUpdate(id, {
              image: files.image.name,
            });
            return res.status(200).json({ msg: "Your image has been updated" });
          } catch (error) {
            return res.status(500).json({ errors: error, msg: error.message });
          }
        }
      });
    }
  });
};

module.exports.logout = async = (req, res) => {
  res
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .clearCookie("authSession")
    .clearCookie("refreshTokenID")
    .send("logout");
};

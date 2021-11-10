const { body, validationResult } = require("express-validator");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Admin = require("../models/Admin");
const Otp = require("../models/Otp");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, {
    expiresIn: "7d",
  });
};

module.exports.register = async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    const checkUser = await Admin.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already taken" }] });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      const user = await Admin.create({
        name,
        email,
        password: hash,
        userType,
      });
      return res.status(200).json({ msg: "Your account has been created" });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const { _id } = user;
        updateSuccessCode = await Admin.findByIdAndUpdate(_id, {
          sucessCode: 1,
        });
        const upadtedUser = await Admin.findOne({ email });
        res.send({ msg: "Login Successfull", response: upadtedUser });
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

module.exports.emailSendAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const checkUser = await Admin.findOne({ email });
    if (checkUser) {
      let otpData = new Otp({
        email,
        code: Math.floor(100000 + Math.random() * 900000),
        expireIn: new Date().getTime() + 300 * 1000,
      });

      let optResponse = await otpData.save();
      mailer(email, otpData.code);
      return res.status(200).json({ msg: "OTP sended to your mail" });
    } else {
      return res.status(400).json({ errors: [{ msg: "Email not exist" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports.changePasswordAdmin = async (req, res) => {
  let data = await Otp.find({ email: req.body.mail, code: req.body.code });
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      return res.status(400).json({ errors: [{ msg: "Token expire" }] });
    } else {
      let user = await Admin.findOne({ email: req.body.email });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      user.password = hash;
      user.save();
      return res.status(200).json({ msg: "Password changes successfully" });
    }
  } else {
    return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
  }
};

const mailer = (email, otp) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "aloksaxena755@gmail.com",
      pass: "wvkgyirquxcwgqzb",
    },
  });
  var mailOptions = {
    from: "aloksaxena755@gmail.com",
    to: email,
    subject: "OTP mail",
    text: otp,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

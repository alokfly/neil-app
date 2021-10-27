const BidPurchase = require("../models/BidPurchase");
require("dotenv").config();

module.exports.bidPurchase = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split("Bearer ")[1];
    try {
      const decoded = jwt.verify(authorization, process.env.SECRET);
      console.log(decoded);
    } catch (e) {
      console.log(e);
      return res.status(401).send("unauthorized");
    }
  }
};

module.exports.home = async (req, res) => {
  return res.status(200).send("home");
};

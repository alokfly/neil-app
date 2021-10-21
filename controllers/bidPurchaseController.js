const BidPurchase = require("../models/BidPurchase");

module.exports.bidPurchase = async (req, res) => {
  const { subscription_price } = req.body;
  try {
    const bid = await BidPurchase.create({
      subscription_price,
    });
    return res.status(200).json({ msg: "You successfully subscribed" });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const bidPurchaseRoutes = require("./routes/bidPurchaseRoutes");
const adminRoutes = require("./routes/adminRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const couponRoutes = require("./routes/couponRoutes");
const stripeRoute = require("./routes/stripeRoute");

require("dotenv").config();
const app = express();

app.use(cookieParser());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

connect();
app.use(bodyParser.json());
app.use("/", router);
app.use("/", productRoutes);
app.use("/", bidPurchaseRoutes);
app.use("/", adminRoutes);
app.use("/", subscriptionRoutes);
app.use("/", auctionRoutes);
app.use("/", couponRoutes);
app.use("/", stripeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Your app is running");
});

const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/db");
const cors = require("cors");
const router = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const bidPurchaseRoutes = require("./routes/bidPurchaseRoutes");

require("dotenv").config();
const app = express();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Your app is running");
});

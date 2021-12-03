const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
var ObjectId = require("mongodb").ObjectID;
const Product = require("../models/Product");
const ShoeSize = require("../models/ShoeSize");
const User = require("../models/User");

module.exports.addProduct = async (req, res) => {
  let profile = req.files;
  try {
    let { productName, size, description, time, date } = req.body;
    const response = await Product.create({
      productName,
      size,
      description,
      time,
      date,
      image: profile,
    });
    res.status(200).send({ msg: "Product successfully added", response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const response = await Product.find();
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  let { productName, size, description, time, date } = req.body;
  try {
    const response = await Product.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        productName,
        size,
        description,
        time,
        date,
      }
    );
    res.status(200).send({ msg: "product successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Product.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addShoeSize = async (req, res) => {
  try {
    let { shoe_size } = req.body;
    const response = await ShoeSize.create({
      shoe_size,
    });
    res.status(200).send({ msg: "shoe size successfully added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getShoeSize = async (req, res) => {
  try {
    const response = await ShoeSize.find();
    res.status(200).send({ data: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateShoeSize = async (req, res) => {
  const { shoe_size } = req.body;
  try {
    const response = await ShoeSize.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        shoe_size,
      }
    );
    res.status(200).send({ msg: "shoe size successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteShoeSize = async (req, res) => {
  try {
    const response = await ShoeSize.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "shoe size deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.likeProduct = async (req, res) => {
  const { email, productId } = req.body;
  const userDetail = await User.findOne({ email });
  await Product.findByIdAndUpdate(
    { _id: ObjectId(productId) },
    {
      $push: { like: userDetail._id },
      likeStatus: true,
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      console;
      return res.status(422).json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports.getLikedProduct = async (req, res) => {
  const { email } = req.body;
  const userDetail = await User.findOne({ email });
  console.log(userDetail);
  try {
    const getProduct = await Product.find({
      like: { $in: userDetail._id },
    });
    return res.status(201).json(getProduct);
  } catch (error) {
    console.log(error);
  }
};

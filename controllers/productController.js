const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const Product = require("../models/Product");

module.exports.addProduct = async (req, res) => {
  let profile = req.files;
  try {
    let { productName, size, description, time } = req.body;
    const response = await Product.create({
      productName,
      size,
      description,
      time,
      image: profile,
    });
    res.status(200).send({ msg: "Product successfully added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const response = await Product.find();
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  let { productName, size, description, time } = req.body;
  try {
    const response = await Product.findByIdAndUpdate(
      { _id: id },
      {
        productName,
        size,
        description,
        time,
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
    const response = await Product.findByIdAndDelete(id);
    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

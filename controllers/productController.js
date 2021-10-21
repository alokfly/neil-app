const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const Product = require("../models/Product");

module.exports.addProduct = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fields, files) => {
    const { product_name, time, shoe_size, like, reminder } = fields;
    const errors = [];
    if (product_name === "") {
      errors.push({ msg: "Product is required" });
    }
    if (shoe_size === "") {
      errors.push({ msg: "size is required" });
    }
    if (time === "") {
      errors.push({ msg: "time is required" });
    }
    if (shoe_size === "") {
      errors.push({ msg: "Shoe size is required" });
    }
    if (Object.keys(files).length === 0) {
      errors.push({ msg: "Image is required" });
    } else {
      const { type } = files.image;
      const split = type.split("/");
      const extension = split[1].toLowerCase();
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        errors.push({ msg: `${extension} is not a valid extension` });
      } else {
        files.image.name = uuidv4() + "." + extension;
      }
    }
    if (errors.length !== 0) {
      return res.status(400).json({ errors, files });
    } else {
      const newPath = __dirname + `/../images/${files.image.name}`;
      fs.copyFile(files.image.path, newPath, async (error) => {
        if (!error) {
          try {
            const response = await Product.create({
              product_name,
              time,
              shoe_size,
              like,
              reminder,
              image: files.image.name,
            });
            return res.status(200).json({
              msg: "Your Product has been created successfully",
              response,
            });
          } catch (error) {
            return res.status(500).json({ errors: error, msg: error.message });
          }
        }
      });
    }
  });
};

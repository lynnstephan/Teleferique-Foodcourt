var express = require("express");
const Product = require("../models/product");
const Category = require("../models/category");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Teleferique Food Court Backend" });
});

router.get("/menu", function (req, res, next) {
  Category.find({}, (err, categories) => {
    if (err) res.send({ success: false, message: "An error occurred" });

    Product.find({}, (err, data) => {
      if (err) res.send({ success: false, message: "An error occurred" });
      res.send({ success: true, data: data, categories: categories });
    });
  });
});

router.post("/menu", function (req, res, next) {
  var product = new Product({
    title_AR: req.body.title_AR,
    title_EN: req.body.title_EN,
    body: req.body.body,
    price: req.body.price,
    category: req.body.category,
  });
  product.save((err, data) => {
    if (err) {
      res.send({
        success: false,
        error: err,
      });
    } else {
      res.send({
        success: true,
        data: data,
      });
    }
  });
});

router.post("/category", function (req, res, next) {
  var category = new Category({
    name: req.body.name,
  });
  category.save((err, data) => {
    if (err) {
      res.send({
        success: false,
        error: err,
      });
    } else {
      res.send({
        success: true,
        data: data,
      });
    }
  });
});

router.delete("/category", function (req, res, next) {
  Category.findByIdAndDelete(req.body.cid, (err, data) => {
    if (err) res.send({ success: false, message: "An error occurred" });
    res.send({ success: true, data: data });
  });
});

router.get("/category", function (req, res, next) {
  Category.find({}, (err, data) => {
    if (err) res.send({ success: false, message: "An error occurred" });
    res.send({ success: true, data: data });
  });
});
module.exports = router;

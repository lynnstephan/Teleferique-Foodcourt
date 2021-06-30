var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  title_EN: String,
  title_AR:String,
  body: String,
//   image: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: Number,
});
var Product = mongoose.model("Product", productSchema);

module.exports = Product;

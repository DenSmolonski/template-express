const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productOption = new Schema({
  size: {
    type: Schema.Types.ObjectId,
    ref: "sezes",
  },
  colour: {
    type: Schema.Types.ObjectId,
    ref: "colours",
  },
  count: {
    type: Number,
    required: true,
  },
});

const productsSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  options: {
    type: [productOption],
    default: [],
  },
});

const Products = mongoose.model("products", productsSchema);
module.exports = Products;

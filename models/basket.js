const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productInfo = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "producs",
  },
  colour: {
    type: Schema.Types.ObjectId,
    ref: "colours",
  },
  size: {
    type: Schema.Types.ObjectId,
    ref: "sizes",
  },
  count: {
    type: Number,
    required: true,
  },
});

const basketSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  products: {
    type: [productInfo],
  },
});

const Baskets = mongoose.model("baskets", basketSchema);
module.exports = Baskets;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const sizesSchema = new Schema({
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
});

const Sizes = mongoose.model("sizes", sizesSchema);
module.exports = Sizes;

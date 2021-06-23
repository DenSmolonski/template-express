const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const colorsSchema = new Schema({
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

const Colors = mongoose.model('colors', colorsSchema);
module.exports = Colors;

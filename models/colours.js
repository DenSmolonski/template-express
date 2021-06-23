const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const coloursSchema = new Schema({
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

const Colours = mongoose.model("colours", coloursSchema);
module.exports = Colours;

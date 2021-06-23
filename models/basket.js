const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productInfo = {
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
  },
  color: {
    type: Schema.Types.ObjectId,
    ref: 'colors',
  },
  size: {
    type: Schema.Types.ObjectId,
    ref: 'sizes',
  },
  count: {
    type: Number,
    required: true,
  },
};

const basketSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  products: {
    type: [productInfo],
  },
});

const Baskets = mongoose.model('baskets', basketSchema);
module.exports = Baskets;

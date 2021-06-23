const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
  variants: {
    type: [
      {
        color: {
          type: Schema.Types.ObjectId,
          ref: 'colors',
        },
        sizes: {
          type: [
            {
              size: {
                type: Schema.Types.ObjectId,
                ref: 'sizes',
              },
              quantity: {
                type: Number,
                required: true,
              },
            },
          ],
          required: true,
        },
      },
    ],
    default: [],
  },
});

const Products = mongoose.model('products', productsSchema);
module.exports = Products;

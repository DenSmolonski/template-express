const Basket = require('./../models/basket');
const User = require('./../models/users');
const Products = require('./../models/products');
const Sizes = require('./../models/sizes');
const Colors = require('./../models/colours');

module.exports.add = async function (req, res, next) {
  try {
    const { product, color, size, quantity } = req.body;
    const user = await User.findOne({ username: req.user.username });
    const basket = await Basket.findOne({ user })
      .populate({
        path: 'user',
        select: ['id', 'username'],
      })
      .populate({
        path: 'products',
        populate: {
          path: 'product',
        },
      })
      .populate({
        path: 'products',
        populate: {
          path: 'color',
        },
      })
      .populate({
        path: 'products',
        populate: {
          path: 'size',
        },
      })
      .exec();

    const selectedProduct = basket.products.find(
      (item) =>
        item.product.id === product &&
        item.color.id === color &&
        item.size.id === size
    );

    if (selectedProduct) {
      selectedProduct.quantity = quantity;
    } else {
      const newProd = await Products.findOne({ id: product });
      const newColor = await Colors.findOne({ id: color });
      const newSize = await Sizes.findOne({ id: size });
      basket.products.push({
        product: newProd,
        color: newColor,
        size: newSize,
        quantity,
      });
    }

    await basket.save();
    res.status(200).json(basket);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.delete = async function (req, res, next) {
  try {
    const { product, color, size, quantity } = req.body;
    const user = await User.findOne({ username: req.user.username });
    const basket = await Basket.findOne({ user })
      .populate({
        path: 'user',
        select: ['id', 'username'],
      })
      .populate({
        path: 'products',
        populate: {
          path: 'product',
        },
      })
      .populate({
        path: 'products',
        populate: {
          path: 'color',
        },
      })
      .populate({
        path: 'products',
        populate: {
          path: 'size',
        },
      })
      .exec();

    const arrayNewProducts = basket.products.filter(
      (item) =>
        item.product.id !== product &&
        item.color.id !== color &&
        item.size.id !== size
    );
    basket.products = arrayNewProducts;
    await basket.save();
    res.status(200).json(basket);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.get = async function (req, res, next) {
  try {
    const user = await User.findOne({ username: req.user.username });
    const basket = await Basket.findOne({ user })
      .populate({
        path: 'user',
        select: ['id', 'username'],
      })
      .populate({
        path: 'products',
        populate: {
          path: 'product',
        },
      })
      .populate({
        path: 'products',
        populate: {
          path: 'color',
        },
      })
      .populate({
        path: 'products',
        populate: {
          path: 'size',
        },
      })
      .exec();
    res.status(200).json(basket);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

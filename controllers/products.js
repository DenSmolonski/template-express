const Products = require('./../models/products');

module.exports.getAll = async function (req, res, next) {
  try {
    const products = await Products.find()
      .populate({
        path: 'variants',
        populate: {
          path: 'color',
        },
      })
      .populate({
        path: 'variants',
        populate: {
          path: 'sizes',
          populate: {
            path: 'size',
          },
        },
      })
      .exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.getProduct = async function (req, res, next) {
  try {
    const { id } = req.params;
    const products = await Products.findOne({ id })
      .populate({
        path: 'variants',
        populate: {
          path: 'color',
        },
      })
      .populate({
        path: 'variants',
        populate: {
          path: 'sizes',
          populate: {
            path: 'size',
          },
        },
      })
      .exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.updateProductCount = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { color, size, quantity } = req.body;

    const products = await Products.findOne({ id })
      .populate({
        path: 'variants',
        populate: {
          path: 'color',
        },
      })
      .populate({
        path: 'variants',
        populate: {
          path: 'sizes',
          populate: {
            path: 'size',
          },
        },
      })
      .exec();
    products.variants.forEach((variant) => {
      if (variant.color.id === color) {
        const selectedSize = variant.sizes.find(
          (item) => item.size.id === size
        );
        selectedSize.quantity = quantity;
      }
    });
    await products.save();
    res.status(200).json(products);
  } catch (error) {
    console.log('/////////////////', error);
    res.status(500).json({ message: error });
  }
};

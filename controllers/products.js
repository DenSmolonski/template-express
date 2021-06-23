const Products = require("./../models/products");

module.exports.getAll = async function (req, res, next) {
  try {
    const products = await Products.find().populate(
      "options.size",
      "options.colour"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.getProduct = async function (req, res, next) {
  try {
    const { id } = req.params;
    const products = await Products.findOne({ id }).populate(
      "options.size",
      "options.colour"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.add = async function (req, res, next) {
  res.status(200).send();
};

module.exports.updateProduct = async function (req, res, next) {
  try {
    const { id } = req.params;
    
    const products = await Products.findOne({ id }).populate(
      "options.size",
      "options.colour"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.updateProductCount = async function (req, res, next) {
  res.status(200).send();
};

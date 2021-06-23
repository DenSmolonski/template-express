const Colors = require('./../models/colours');
const Sizes = require('./../models/sizes');
const Products = require('./../models/products');

module.exports = async () => {
  const isExist = await Colors.exists({ id: '1' });

  if (isExist) {
    return;
  }

  await Colors.insertMany([
    { id: '1', name: 'red' },
    { id: '2', name: 'black' },
    { id: '3', name: 'yellow' },
  ]);
  await Sizes.insertMany([
    { id: '1', name: 's' },
    { id: '2', name: 'l' },
    { id: '3', name: 'm' },
  ]);

  const colors = await Colors.find({});
  const sizes = await Sizes.find({});

  const getProduct = (i) => {
    return {
      id: `${i}`,
      name: 'product-name' + i,
      price: Math.floor(Math.random() * 10000),
      available: true,
      variants: [
        {
          color: colors[0],
          sizes: [
            {
              size: sizes[0],
              quantity: Math.floor(Math.random() * 20),
            },
            {
              size: sizes[1],
              quantity: Math.floor(Math.random() * 20),
            },
            {
              size: sizes[2],
              quantity: Math.floor(Math.random() * 20),
            },
          ],
        },
        {
          color: colors[1],
          sizes: [
            {
              size: sizes[0],
              quantity: Math.floor(Math.random() * 20),
            },
          ],
        },
        {
          color: colors[2],
          sizes: [
            {
              size: sizes[0],
              quantity: Math.floor(Math.random() * 20),
            },
            {
              size: sizes[2],
              quantity: Math.floor(Math.random() * 20),
            },
          ],
        },
      ],
    };
  };

  let products = [];
  products.push(getProduct(1));
  products.push(getProduct(2));
  products.push(getProduct(3));
  products.push(getProduct(4));

  await Products.insertMany(products);
};

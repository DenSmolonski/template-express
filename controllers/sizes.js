const Sizes = require("./../models/sizes");
const { v4: uuid4 } = require("uuid");

module.exports.add = async function (req, res, next) {
  try {
    const { name } = req.body;
    const isExist = await Sizes.exists({ name });

    if (isExist) {
      return res.status(409).json({ message: "Size exist" });
    }

    await new Sizes({
      id: uuid4(),
      name,
    }).save();

    res.status(201).send();
  } catch (e) {
    res.status(500).json(e);
  }
};

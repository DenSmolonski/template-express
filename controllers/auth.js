module.exports.register = async function (req, res) {
  // const user = await UserAdmin.findOne({ trxAddress: req.body.trxAddress })
  // try {
  //   if (user) {
  //     res.status(409).json({
  //       message: 'USER ALREDY REGISTRED, TRY REGISTER WITH ANOTHER TRXADDRESS',
  //     })
  //     return
  //   }

  //   const newUser = new UserAdmin({
  //     trxAddress: req.body.trxAddress,
  //     accountType: 'Admin',
  //     password: req.body.signKey,
  //   })
  //   await newUser.save()
  res.status(201).send();
  // } catch (error) {
  //   errorHandler(res, error)
  // }
};

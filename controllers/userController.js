const { User } = require("../models/model");
//Controller function to find user in db
const findUserByEmailAndPassword = async (email, password) => {
  return await User.findOne({ where: { email, password } });
};

module.exports = { findUserByEmailAndPassword };

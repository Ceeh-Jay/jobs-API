const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
    const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};

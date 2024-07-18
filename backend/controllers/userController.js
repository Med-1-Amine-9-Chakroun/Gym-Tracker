const User = require("../models/userModel");

// login user
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// signin user
const signupUser = async (req, res) => {
  res.json({ mssg: "signun user" });
};

// EXPORT methods
module.exports = {
  loginUser,
  signupUser,
};

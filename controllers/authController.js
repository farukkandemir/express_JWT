const users = require("../model/users.json");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({msg: "Username and Password is required"});
  }

  const foundUser = users.find((user) => user.username === username);

  if (!foundUser) {
    return res.status(400).json({msg: "There is no account with this username"});
  }

  const pwdMatch = await bcrypt.compare(password, foundUser.password);

  if (pwdMatch) {
    const accessToken = jwt.sign(
      {username: foundUser.username},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "59s"}
    );

    res.json(accessToken);
  } else {
    return res.status(400).json({msg: "Wrong Password"});
  }
};

module.exports = handleLogin;

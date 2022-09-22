const users = require("../model/users.json");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");

const handleRegister = async (req, res) => {
  const {username, email, password} = req.body;

  const duplicate = users.find(
    (user) => user.username === username || user.email === email
  );

  if (duplicate) return res.status(409).json({msg: "Username or Password is taken"});

  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({errors: error.array()});
  }
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length < 1 ? 1 : users.length + 1,
      username: username,
      email: email,
      password: hashedPwd,
      status: "active",
    };

    users.push(newUser);

    res.status(201).json({success: `New user ${username} is created `, users});
  } catch (error) {
    res.json(error);
  }
};

module.exports = handleRegister;

const users = require("../model/users.json");
const {validationResult} = require("express-validator");

const getAllUsers = (req, res) => {
  res.json(users);
};

const getSingleUser = (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.status(400).json({msg: `Provide a id`});
  }

  const foundUser = users.find((person) => person.id === parseInt(id));

  if (!foundUser) return res.json({msg: `There is no user with the id of ${id}`});

  res.json(foundUser);
};

const updateUser = (req, res) => {
  const {id} = req.params;

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) return res.status(400).json({msg: `There is no user with the id of ${id}`});

  const updatedUser = req.body;

  if (!updatedUser)
    return res.status(400).json({msg: `Please provide an info for update`});

  user.username = updatedUser.username ? updatedUser.username : user.username;
  user.email = updatedUser.email ? updatedUser.email : user.email;

  res.json({msg: "User is updated", user});
};

const deleteUser = (req, res) => {
  const {id} = req.params;

  const filteredUsers = users.filter((user) => user.id !== parseInt(id));

  res.json({msg: "Users database is updated", filteredUsers});
};

module.exports = {getAllUsers, getSingleUser, updateUser, deleteUser};

const { response, request } = require("express");
const User = require("../models/user.model");
const { hashPassword } = require("../helpers/passwordGenerator");

const getUsers = async (req = request, res = response) => {
  const { skip = 0, limit = 5 } = req.query;
  const query = { state: true };

  const [users, total] = await Promise.all([
    User.find(query).limit(limit).skip(skip),
    User.countDocuments(query),
  ]);

  return res.status(200).json({
    msg: "get API - getUsers",
    users,
    total,
  });
};

const postUser = async (req = request, res = response) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({
      name,
      email,
      password,
      role,
    });

    //Hash password
    user.password = hashPassword(password);

    await user.save();

    return res.status(201).json({
      msg: "post API - postUser",
      user,
    });
  } catch (e) {
    console.log(e);
    throw Error("Error in postUser from user.controller");
  }
};

const putUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password, google, email, ...user } = req.body;

    if (password) {
      user.password = hashPassword(password);
    }

    const userDb = await User.findOneAndUpdate(id, user);

    res.status(200).json({
      msg: "put API - putUser",
      userDb,
    });
  } catch (e) {
    console.log(e);
    throw new Error("Error in putUser from user.controller");
  }
};

const patchUser = (req, res = response) => {
  res.json({
    msg: "patch API - patchUser",
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const userDeleted = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: "delete API - deleteUser",
    userDeleted,
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser,
};

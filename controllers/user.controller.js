const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

const getUsers = (req = request, res = response) => {
  const { q, api_key = "no api_key", page = 1, limit = 10 } = req.query;

  res.json({
    msg: "get API - getUsers",
    q,
    api_key,
    page,
    limit,
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

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        msg: "Email already exists",
      });
    }

    //Hash password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

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

const putUser = (req = request, res = response) => {
  const { id } = req.params;

  res.status(500).json({
    msg: "put API - putUser",
    data: id,
  });
};

const patchUser = (req, res = response) => {
  res.json({
    msg: "patch API - patchUser",
  });
};

const deleteUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "delete API - deleteUser",
    data: id,
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser,
};

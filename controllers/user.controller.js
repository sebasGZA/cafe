const { response, request } = require("express");
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

const postUser = async (req, res = response) => {
  try {
    const body = req.body;

    const user = new User(body);

    await user.save();

    res.status(201).json({
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

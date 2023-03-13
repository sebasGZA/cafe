const { response, request } = require("express");

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

const postUser = (req, res = response) => {
  const body = req.body;

  res.status(201).json({
    msg: "post API - postUser",
    data: body,
  });
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

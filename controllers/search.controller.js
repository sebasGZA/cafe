const { request, response } = require("express");
const { Types } = require("mongoose");

const { User } = require("../models");
const collections = ["roles", "users", "categories", "products"];

const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!collections.includes(collection)) {
    return res.status(400).json({
      msg: "Collection is not valid",
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      break;
    case "products":
      break;
    default:
      res.status(500).json({
        msg: "Forget to add this collection",
      });
      break;
  }
};

const searchUsers = async (term = "", res = response) => {
  const isMongoId = Types.ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      msg: "searchUsers",
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
  return res.json({
    msg: "searchUsers",
    results: users,
  });
};

module.exports = {
  search,
};

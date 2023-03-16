const { request, response } = require("express");
const { Types } = require("mongoose");

//Models
const { User, Category, Product } = require("../models");
const collections = ["roles", "users", "categories", "products"];

//Methdos
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
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
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

const searchCategories = async (term = "", res = response) => {
  const isMongoId = Types.ObjectId.isValid(term);

  if (isMongoId) {
    const category = await Category.findById(term).populate("user", "name");
    return res.json({
      msg: "searchCategories",
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const categories = await Category.find({ state: true, name: regex }).populate(
    "user",
    "name"
  );
  return res.json({
    msg: "searchCategories",
    results: categories,
  });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoId = Types.ObjectId.isValid(term);

  if (isMongoId) {
    const product = await Product.findById(term)
      .populate("category", "name")
      .populate("user", "name");
    return res.json({
      msg: "searchProducts",
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const products = await Product.find({ state: true, name: regex })
    .populate("category", "name")
    .populate("user", "name");

  return res.json({
    msg: "searchProducts",
    results: products,
  });
};

module.exports = {
  search,
};

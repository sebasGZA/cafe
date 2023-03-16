const { request, response } = require("express");
const Category = require("../models/category.model");

const getCategories = async (req = request, res = response) => {
  const categories = await Category.find();
  res.json({
    msg: "getCategories",
    categories,
  });
};

const getCategoryById = async (req = request, res = response) => {
  res.json({
    msg: "getCategoryById",
  });
};

const postCategory = async (req = request, res = response) => {
  res.json({
    msg: "postCategory",
  });
};

const putCategory = async (req = request, res = response) => {
  res.json({
    msg: "putCategory",
  });
};

const deleteCategory = async (req = request, res = response) => {
  res.json({
    msg: "deleteCategory",
  });
};

module.exports = {
  getCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
};

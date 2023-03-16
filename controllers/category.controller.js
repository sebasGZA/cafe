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
  try {
    const name = req.body.name.toUpperCase();

    const categoryDb = await Category.findOne({ name });
    if (categoryDb) {
      return res.status(400).json({
        msg: `Category ${name} already exists`,
      });
    }

    const data = {
      name,
      user: req.user._id,
    };

    const category = new Category(data);
    await category.save();

    res.status(201).json({
      msg: "postCategory",
      category,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in postCategory form category.controller",
    });
  }
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

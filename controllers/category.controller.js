const { request, response } = require("express");
const Category = require("../models/category.model");

const getCategories = async (req = request, res = response) => {
  const { skip = 0, limit = 10 } = req.query;
  const query = { state: true };

  const [categories, total] = await Promise.all([
    Category.find(query).skip(skip).limit(limit).populate("user", "name"),
    Category.countDocuments(query),
  ]);

  res.json({
    msg: "getCategories",
    categories,
    total,
  });
};

const getCategoryById = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id).populate("user", "name");
    res.json({
      msg: "getCategoryById",
      category,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in getCategoryById from category.controller",
    });
  }
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
  try {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.user = req.user._id;
    data.name = data.name.toUpperCase();

    const categoryDb = await Category.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("user", "name");

    res.json({
      msg: "putCategory",
      categoryDb,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in putCategory from category.controller",
    });
  }
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { uid } = req.user._id;

  const category = await Category.findByIdAndUpdate(
    id,
    {
      state: false,
      user: uid,
    },
    { new: true }
  ).populate("user", "name");

  res.json({
    msg: "deleteCategory",
    category,
  });
};

module.exports = {
  getCategories,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
};

const { response, request } = require("express");

//Models
const { Product } = require("../models");

//Methods
const getProducts = async (req = request, res = response) => {
  const { skip = 0, limit = 5 } = req.query;
  const query = { state: true };

  const [products, total] = await Promise.all([
    Product.find(query)
      .skip(skip)
      .limit(limit)
      .populate("user", "name")
      .populate("category", "name"),
    Product.countDocuments(query),
  ]);

  res.json({
    msg: "getProducts",
    products,
    total,
  });
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("category", "name")
    .populate("user", "name");

  res.json({
    msg: "getProductById",
    product,
  });
};

const postProduct = async (req = request, res = response) => {
  try {
    const { name, state, user, ...data } = req.body;
    const uid = req.user._id;

    data.name = name.toUpperCase();
    data.user = uid;

    const product = new Product(data);
    await product.save();

    res.status(201).json({
      msg: "getProductById",
      product,
    });
  } catch (e) {
    console.log(e);
    res.json({
      msg: "Error in postProduct from product.controller",
    });
  }
};

const putProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const uid = req.user._id;
    const { name, state, ...data } = req.body;

    if (name) {
      data.name = name.toUpperCase();
    }
    data.user = uid;

    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate("category", "name")
      .populate("user", "name");

    res.json({
      msg: "putProduct",
      product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in putProduct from product.controller",
    });
  }
};

const deleteProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const uid = req.user._id;

    const product = await Product.findByIdAndUpdate(
      id,
      { state: false, user: uid },
      { new: true }
    )
      .populate("category", "name")
      .populate("user", "name");

    res.json({
      msg: "deleteProduct",
      product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in deleteProduct from product.controlller",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};

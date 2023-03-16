const { Router } = require("express");
const { check } = require("express-validator");
const {
  getCategories,
  postCategory,
  getCategoryById,
  putCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.post("/", postCategory);

router.put("/:id", putCategory);

router.delete("/:id", deleteCategory);

module.exports = router;

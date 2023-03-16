const { Router } = require("express");
const { check } = require("express-validator");
const { JWTValidator, fieldsValidator } = require("../middlewares");
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

router.post(
  "/",
  [
    JWTValidator,
    check("name", "Name is required").not().isEmpty(),
    fieldsValidator,
  ],
  postCategory
);

router.put("/:id", putCategory);

router.delete("/:id", deleteCategory);

module.exports = router;

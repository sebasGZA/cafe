const { Router } = require("express");
const { check } = require("express-validator");

//Middlewares
const {
  JWTValidator,
  fieldsValidator,
  isAdminRole,
} = require("../middlewares");

//Controller
const {
  getCategories,
  postCategory,
  getCategoryById,
  putCategory,
  deleteCategory,
} = require("../controllers");

//Helpers
const { categoryByIdValidator, categoryValidator } = require("../helpers");

const router = Router();

//Methods
router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "id is not valid").isMongoId(),
    check("id").custom(categoryByIdValidator),
    fieldsValidator,
  ],
  getCategoryById
);

router.post(
  "/",
  [
    JWTValidator,
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(categoryValidator),
    fieldsValidator,
  ],
  postCategory
);

router.put(
  "/:id",
  [
    JWTValidator,
    check("id", "id is not valid").isMongoId(),
    check("id").custom(categoryByIdValidator),
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(categoryValidator),
    fieldsValidator,
  ],
  putCategory
);

router.delete(
  "/:id",
  [
    JWTValidator,
    isAdminRole,
    check("id", "id is not valid").isMongoId(),
    check("id").custom(categoryByIdValidator),
    fieldsValidator,
  ],
  deleteCategory
);

module.exports = router;

const { Router } = require("express");
const { check } = require("express-validator");

//Controller
const {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const {
  productByIdValidator,
  productValidator,
  categoryByIdValidator,
} = require("../helpers/dbValidators");
const {
  fieldsValidator,
  JWTValidator,
  isAdminRole,
} = require("../middlewares");

const router = Router();

//Methods
router.get("/", getProducts);

router.get(
  "/:id",
  [
    check("id", "id is not valid").isMongoId(),
    check("id").custom(productByIdValidator),
    fieldsValidator,
  ],
  getProductById
);

router.post(
  "/",
  [
    JWTValidator,
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(productValidator),
    check("category", "Category is required").not().isEmpty(),
    check("category", "Category is not valid").isMongoId(),
    check("category").custom(categoryByIdValidator),
    fieldsValidator,
  ],
  postProduct
);

router.put(
  "/:id",
  [
    JWTValidator,
    check("id", "id is not valid").isMongoId(),
    check("id").custom(productByIdValidator),
    check("name").custom(productValidator),
    fieldsValidator,
  ],
  putProduct
);

router.delete(
  "/:id",
  [
    JWTValidator,
    isAdminRole,
    check("id", "id is not valid").isMongoId(),
    check("id").custom(productByIdValidator),
    fieldsValidator,
  ],
  deleteProduct
);

module.exports = router;

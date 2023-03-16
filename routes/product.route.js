const { Router } = require("express");
const { check } = require("express-validator");

//Middlewares
const {
  fieldsValidator,
  JWTValidator,
  isAdminRole,
} = require("../middlewares");

//Controller
const {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controllers");

//Helpers
const {
  productByIdValidator,
  productValidator,
  categoryByIdValidator,
} = require("../helpers");

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

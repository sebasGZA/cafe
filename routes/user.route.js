const { Router } = require("express");
const { check } = require("express-validator");

//Middelwares
const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { JWTValidator } = require("../middlewares/JWTValidator");

const {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  roleValidator,
  emailValidator,
  userValidatorById,
} = require("../helpers/dbValidators");
const { isAdminRole, hasRole } = require("../middlewares/RolesValidator");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(emailValidator),
    check("password", "Password must have 6 letters").not().isEmpty(),
    // check("role", "Role is required").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(roleValidator),

    fieldsValidator,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "id is not valid").isMongoId(),
    check("id").custom(userValidatorById),
    check("password", "Password must have 6 letters").not().isEmpty(),
    check("role").custom(roleValidator),
    fieldsValidator,
  ],
  putUser
);

router.patch("/:id", patchUser);

router.delete(
  "/:id",
  [
    JWTValidator,
    // isAdminRole,
    hasRole("ADMIN_ROLE", "SALES_ROLES"),
    check("id", "id is not valid").isMongoId(),
    check("id").custom(userValidatorById),
    fieldsValidator,
  ],
  deleteUser
);

module.exports = router;

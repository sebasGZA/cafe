const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require("../controllers/user.controller");
const { fieldsValidator } = require("../middlewares/fieldsValidator");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password must have 6 letters").not().isEmpty(),
    check("role", "Role is required").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    fieldsValidator,
  ],
  postUser
);

router.put("/:id", putUser);

router.patch("/:id", patchUser);

router.delete("/:id", deleteUser);

module.exports = router;

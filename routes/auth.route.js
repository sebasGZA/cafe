const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { fieldsValidator } = require("../middlewares/fieldsValidator");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    fieldsValidator,
  ],
  login
);

module.exports = router;

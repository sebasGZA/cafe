const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth.controller");
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

router.post("/google", [
  check("id_token", "id_token is required").not().isEmpty(),
  fieldsValidator,
  googleSignIn,
]);

module.exports = router;

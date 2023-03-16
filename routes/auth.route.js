const { Router } = require("express");
const { check } = require("express-validator");

//Controller
const { login, googleSignIn } = require("../controllers");

//Middlewares
const { fieldsValidator } = require("../middlewares");

const router = Router();

//Methods
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

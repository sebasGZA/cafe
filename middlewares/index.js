const fieldsValidator = require("../middlewares/fieldsValidator");
const JWTValidator = require("../middlewares/JWTValidator");
const rolesValidator = require("../middlewares/RolesValidator");

module.exports = {
  ...fieldsValidator,
  ...JWTValidator,
  ...rolesValidator,
};

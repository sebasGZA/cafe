const dbValidators = require("./dbValidators");
const googleValidator = require("./googleValidator");
const JWT = require("./JWT");
const passwordGenerator = require("./passwordGenerator");

module.exports = {
  ...dbValidators,
  ...googleValidator,
  ...JWT,
  ...passwordGenerator,
};

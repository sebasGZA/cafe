const bcryptjs = require("bcryptjs");

//Methods
const hashPassword = (password = "") => {
  const salt = bcryptjs.genSaltSync();
  password = bcryptjs.hashSync(password, salt);
  return password;
};

module.exports = {
  hashPassword,
};

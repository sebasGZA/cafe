const Role = require("../models/role.model");
const User = require("../models/user.model");

const roleValidator = async (role = "") => {
  const roleDb = await Role.findOne({ role });
  if (!roleDb) {
    throw new Error("Role is not valid");
  }
};

const emailValidator = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`Email ${email} already exists`);
  }
};

module.exports = {
  roleValidator,
  emailValidator,
};

const Role = require("../models/role.model");

const roleValidator = async (role = "") => {
  const roleDb = await Role.findOne({ role });
  if (!roleDb) {
    throw new Error("Role is not valid");
  }
};

module.exports = {
  roleValidator,
};

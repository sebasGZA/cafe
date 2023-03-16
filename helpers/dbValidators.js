const { Role, User, Category } = require("../models");

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

const userValidatorById = async (id = "") => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`User id ${id} is not valid`);
  }
};

const categoryByIdValidator = async (id = "") => {
  const existCategory = await Category.findById(id);
  if (!existCategory) {
    throw new Error(`Category id ${id} is not valid`);
  }
};

const categoryValidator = async (name = "") => {
  const existCategory = await Category.findOne({ name });
  if (existCategory) {
    throw new Error(`Category ${name} already exists`);
  }
};

module.exports = {
  roleValidator,
  emailValidator,
  userValidatorById,
  categoryByIdValidator,
  categoryValidator,
};

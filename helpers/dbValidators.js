//Models
const { Role, User, Category, Product } = require("../models");

//Methods
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
  const existCategory = await Category.findOne({ name: name.toUpperCase() });
  if (existCategory) {
    throw new Error(`Category ${name} already exists`);
  }
};

const productByIdValidator = async (id = "") => {
  const existProduct = await Product.findById(id);
  if (!existProduct) {
    throw new Error(`Product id ${id} is not valid`);
  }
};

const productValidator = async (name = undefined) => {
  if (name) {
    const existProduct = await Product.findOne({ name: name.toUpperCase() });
    if (existProduct) {
      throw new Error(`Product ${name} already exists`);
    }
  }
};

module.exports = {
  roleValidator,
  emailValidator,
  userValidatorById,
  categoryByIdValidator,
  categoryValidator,
  productByIdValidator,
  productValidator,
};

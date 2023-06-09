const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "NAme is required"],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, state, ...product } = this.toObject();
  return product;
};

module.exports = model("Product", ProductSchema);

const { response, request } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs/dist/bcrypt");

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User or password are not valid - email",
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "User or password are not valid - state: false",
      });
    }

    const validatePassword = bcrypt.compareSync(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({
        msg: "User or password are not valid - password",
      });
    }

    //generate jwt

    res.status(200).json({
      msg: "post API - login",
      user: {
        email,
        password,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in login from auth.controller",
    });
  }
};

module.exports = {
  login,
};

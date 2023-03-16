const { response, request } = require("express");
const bcrypt = require("bcryptjs/dist/bcrypt");

//Models
const { User } = require("../models");

//Helpers
const { JWTGenerator } = require("../helpers/JWT");
const { googleVerify } = require("../helpers/GoogleValidator");

//Methods
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
    const token = await JWTGenerator(user.id);

    res.status(200).json({
      msg: "login",
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in login from auth.controller",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  try {
    const { id_token } = req.body;

    const { name, picture, email } = await googleVerify(id_token);
    let user = await User.findOne({ email });
    if (!user) {
      //Create user
      const data = {
        name,
        email,
        password: ":p",
        picture,
        google: true,
        role: "USER_ROLE",
      };

      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "User unauthorized - report to admin",
      });
    }

    const token = await JWTGenerator(user.uid);

    res.json({
      msg: "Google Sign-in",
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in googleSignIn from auth.controller",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};

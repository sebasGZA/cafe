const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWTValidator = async (req = request, res = response, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(400).json({
        msg: "Token not sent",
      });
    }

    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;

    //Get user that did the request
    req.user = await User.findById(uid);

    if (!req.user) {
      return res.status(401).json({
        msg: "Token invalid - user does not exist",
      });
    }

    if (!req.user.state) {
      return res.status(401).json({
        msg: "Token invalid - user with state:false",
      });
    }

    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      msg: "Token invalid",
    });
  }
};

module.exports = {
  JWTValidator,
};

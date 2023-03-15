const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const JWTValidator = (req = request, res = response, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(400).json({
        msg: "Token not sent",
      });
    }

    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;
    
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

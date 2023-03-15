const { response, request } = require("express");

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    return res.status(201).json({
      msg: "post API - login",
    });
  } catch (e) {
    console.log(e);
    throw Error("Error in login from auth.controller");
  }
};

module.exports = {
  login,
};

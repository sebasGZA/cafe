const { request, response } = require("express");
const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Token invalid - must validate token first",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `User ${name} unauthorized`,
    });
  }

  next();
};

module.exports = {
  isAdminRole,
};

const jwt = require("jsonwebtoken");

const JWTGenerator = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.JWT_KEY || "",
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("JWtGenerator error");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  JWTGenerator,
};

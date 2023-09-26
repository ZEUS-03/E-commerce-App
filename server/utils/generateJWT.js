const jwt = require("jsonwebtoken");

const generateWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "3d" });
};

module.exports = generateWebToken;

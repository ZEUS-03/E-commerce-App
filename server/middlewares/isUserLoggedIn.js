const getTokensFromHeader = require("../utils/getTokensFromHeader");
const verifyToken = require("../utils/verifyToken");

const isUserLoggedIn = (req, res, next) => {
  // Saving the token from header
  const token = getTokensFromHeader(req);
  // Verify token
  const verified = verifyToken(token);
  if (!verified) {
    throw new Error("Invalid/Expired token. Please log in again.");
  } else {
    req.userAuthId = verified?.id;
    next();
  }
};

module.exports = isUserLoggedIn;

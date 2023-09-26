const tokenFromHeader = (req) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (token === undefined) {
    return "Token is missing";
  } else {
    return token;
  }
};
module.exports = tokenFromHeader;

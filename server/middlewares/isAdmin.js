const User = require("../model/User");

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userAuthId);

  if (user?.isAdmin) {
    next();
  } else {
    next(new Error("Access only allowed to Admin users."));
  }
};

module.exports = isAdmin;

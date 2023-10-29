const User = require("../model/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generateWebToken = require("../utils/generateJWT");
const tokenFromHeader = require("../utils/getTokensFromHeader");
const verifyToken = require("../utils/verifyToken");

const registeredUserCtrl = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // check if user is already registered
    const userExists = await User?.findOne({ email });
    if (userExists) {
      throw new Error("User already registered!");
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // create a new user
    const userData = await User.create({
      fullname: fullname,
      email: email,
      password: passwordHash,
    });

    res.status(201).json({
      status: "success",
      msg: "User created successfully!",
      data: userData,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User?.findOne({ email });

    if (userFound && (await bcrypt.compare(password, userFound?.password))) {
      res.status(201).json({
        msg: "Logged in successfully",
        status: "success",
        userFound,
        token: generateWebToken(userFound?._id),
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw new Error("Internal Server Error: " + error);
  }
});

// @desc  Get user profile
// @route GET /api/v1/users/profile
// @access Private

const getUserProfileCtrl = asyncHandler(async (req, res) => {
  let token = tokenFromHeader(req);

  const verified = verifyToken(token);
  console.log(verified);

  res.json({
    msg: "Welcome to user profile page.",
  });
});

// @desc  update address
// @route GET /api/v1/users/update/shipping
// @access Private

const updateShippingAddressCtrl = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    city,
    phone,
    postalCode,
    province,
    Country,
  } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        phone,
        postalCode,
        province,
        Country,
      },
      hasShippingAddress: true,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "Address added successfully",
    user,
  });
});

module.exports = {
  registeredUserCtrl,
  loginUserCtrl,
  getUserProfileCtrl,
  updateShippingAddressCtrl,
};

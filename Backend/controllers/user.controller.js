const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

// ✅ REGISTER USER
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    res.status(201).json({ token, user: safeUser });
  } catch (error) {
    next(error);
  }
};

// ✅ LOGIN USER
module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    console.log("✅ Login successful for:", email);
    res.status(200).json({ token, user: safeUser });
  } catch (error) {
    console.error("🔥 Login failed due to:", error.message);
    next(error);
  }
};

// ✅ GET USER PROFILE
module.exports.getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

// ✅ LOGOUT USER
module.exports.logoutUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

    await blacklistTokenModel.create({ token });

    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullname: { firstname, lastname },
      vehicle: { color, plate, capacity, vehicleType },

      email,
      password,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !color ||
      !plate ||
      !capacity ||
      !vehicleType
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if captain already exists
    const existingUser = await captainModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    // Hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    // Create the captain
    const captain = await captainService.createCaptain({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      color,
      plate,
      capacity,
      vehicleType,
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, user: captain });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await captainModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (token) {
      await blacklistTokenModel.create({ token });
    }

    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

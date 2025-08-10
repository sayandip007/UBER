const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require('../middlewares/auth.middleware');

router.
  post(
    "/create",
    authMiddleware.authUser,
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage(
        "Pickup location must be a string with at least 3 characters"
      ),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Destination must be a string with at least 3 characters"),
    body("vehicleType")
      .isIn(["auto", "car", "motorcycle"])
      .withMessage("Vehicle type must be one of: auto, car, moto"),
      rideController.createRide
  );

module.exports = router;

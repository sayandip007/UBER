const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller'); // ✅ FIXED
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('fullname.firstname')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long'),

  body('fullname.lastname')
    .notEmpty()
    .withMessage('Last name is required'),

  body('vehicle.color')
    .notEmpty()
    .withMessage('Vehicle color is required'),

  body('vehicle.plate')
    .notEmpty()
    .withMessage('Vehicle plate is required'),

  body('vehicle.capacity')
    .isInt({ min: 1 })
    .withMessage('Vehicle capacity must be a number'),

  body('vehicle.vehicleType')
    .notEmpty()
    .withMessage('Vehicle type is required'),
], captainController.registerUser);


router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
], captainController.loginUser); // ✅ FIXED

router.get('/profile', authMiddleware.authCaptain, captainController.getUserProfile); // ✅ FIXED

router.get('/logout', authMiddleware.authCaptain, captainController.logoutUser); // ✅ FIXED

module.exports = router;

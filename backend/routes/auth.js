const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET || "DigipadSecret";
const CREATE_USER_ROUTE = "/createuser";
const LOGIN_ROUTE = "/login";
const GET_USER_ROUTE = "/getuser";

router.use(express.json());

// Route 1: Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  CREATE_USER_ROUTE,
  [
    body("name", "Name should be valid!").isLength({ min: 3 }),
    body("email", "Email should be valid!").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success: false,
          error: "Email already taken, enter another email",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      const authToken = jwt.sign({ id: user.id }, JWT_SECRET);
      res.json({ success: true, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// Route 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  LOGIN_ROUTE,
  [
    body("email", "Enter correct email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "Use correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success: false, error: "Use correct credentials" });
      }

      const authToken = jwt.sign({ id: user.id }, JWT_SECRET);
      res.json({ success: true, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// Route 3: Get logged-in User Details using: POST "/api/auth/getuser". Login required
router.post(GET_USER_ROUTE, fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;

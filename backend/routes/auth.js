const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "DigipadSecret";

// Route 1: Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Name should be valid!").isLength({ min: 3 }),
    body("email", "Email should be valid!").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Email already taken, enter another email" });
      }

      const salt = await bcrypt.genSalt(10);
      const Password = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: Password,
      });
      jwt.sign({ id: user.id }, JWT_SECRET, (err, authtoken) => {
        if (err) {
          throw err;
        }
        res.json({ authtoken });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;

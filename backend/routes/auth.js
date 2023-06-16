const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = User(req.body);
  await user.save();
  res.send(req.body);
});

module.exports = router;

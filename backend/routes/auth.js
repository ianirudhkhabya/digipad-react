const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    a: "this is a",
    b: "this is b",
  };
  res.json(obj);
});

module.exports = router;

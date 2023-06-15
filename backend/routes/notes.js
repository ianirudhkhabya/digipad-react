const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    c: "this is c",
    d: "this is d",
  };
  res.json(obj);
});

module.exports = router;

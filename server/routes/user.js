// Importing dependencies
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("USER routes go here");
});

module.exports = router;

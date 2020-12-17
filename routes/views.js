const express = require("express");
const Entry = require("./../models/entry");
const router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var Utils = require("./routUtils")

router.get("/showIndex", async (req, res) => {
  res.sendFile("_show_index.html",{ root: __dirname });
});

module.exports = router;
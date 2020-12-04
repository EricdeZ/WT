const express = require("express");
const Entry = require("./../models/entry");
const router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

module.exports = {
  createEntry: async function (req) {
    let entry = new Entry();
    entry.title = req.body.title;
    entry.description = req.body.description;
    entry.markdown = req.body.markdown;
    try {
      await entry.save();
      return entry;
    } catch (e) {
      console.log(e);
    }
  },
  bar: function () {
    // whatever
  }
};
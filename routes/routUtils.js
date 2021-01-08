const express = require("express");
const Entry = require("./../models/entry");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

module.exports = {
  createEntry: async function (req) {
    const img = fs.readFileSync(req.file.path);
    const encode_image = img.toString('base64');
    const image_file = {
      contentType: req.file.mimetype,
      path: req.file.path,
      image: new Buffer(encode_image,'base64')
    };
    let entry = new Entry();
    entry.title = req.body.title;
    entry.description = req.body.description;
    entry.markdown = req.body.markdown;
    entry.isPublic = true;
    entry.image = image_file;
    try {
      //TODO
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
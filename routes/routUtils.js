const express = require("express");
const Entry = require("./../models/entry");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

module.exports = {
  createEntry: async function (req) {
    let entry = new Entry();
    entry.title = req.body.title;
    entry.description = req.body.description;
    entry.markdown = req.body.markdown;
    entry.isPublic = true;


    const images = req.files;
    const imageList = [];
    images.forEach(image => {
      const img = fs.readFileSync(image.path);
      const encode_image = img.toString('base64');
      const image_file = {
        contentType: image.mimetype,
        originalName: image.originalname,
        path: image.path,
        data: "data:" + image.mimetype + ";base64," + encode_image
      };
      imageList.push(image_file)
    })




    entry.images = imageList;
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
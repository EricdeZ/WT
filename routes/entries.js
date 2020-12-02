const express = require("express");
const Entry = require("./../models/entry");
const router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

router.get("/", async (req, res) => {
  res.render("../views/entries/index");
});

router.get("/:slug", async (req, res) => {
  const entry = await Entry.findOne({ slug: req.params.slug });
  res.json(entry);
});

router.post("/", upload.none(), async (req, res, next) => {
    let entry = new Entry();
    entry.title = req.body.title;
    entry.description = req.body.description;
    entry.markdown = req.body.markdown;
    try {
      entry = await entry.save();
    } catch (e) {
      console.log(e);
    }
  }
);


module.exports = router;

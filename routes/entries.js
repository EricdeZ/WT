const express = require("express");
const Entry = require("./../models/entry");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const Utils = require("./routUtils")

router.get("/", async (req, res) => {
  res.render("../views/entries/index");
});

router.get("/getEntries", async (req, res) => {
    const entries = await Entry.find({});
    res.json(entries);
});

router.get("/:slug", async (req, res) => {
  const entry = await Entry.findOne({slug: req.params.slug});
  res.json(entry);
});

router.post("/edit/:slug", upload.none(), async (req, res, next) => {
  const oldEntry = await Entry.findOne({slug: req.params.slug});
  if (oldEntry) {
    Entry.deleteOne({slug: req.params.slug}, async function (err) {
      if (err) {
        res.status(400);
      } else {
        const newEntry = await Utils.createEntry(req);
        res.json(newEntry);
        return;
      }
    });
  } else {
    return res.status(400);
  }
});

router.post("/", upload.none(), async (req, res, next) => {
  const newEntry = await Utils.createEntry(req);
  res.json(newEntry);
  return;
});

router.delete("/:slug", async (req, res) => {
  let entry = await Entry.findOne({slug: req.params.slug});
  if (entry) {
    Entry.deleteOne({slug: req.params.slug}, async function(err) {
      if (err) {
        res.status(400);
      }
    });
    res.json(entry)
  } else {
    res.status(400);
  }

});

module.exports = router;

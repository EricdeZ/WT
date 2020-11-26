const express = require("express");
const Entry = require("./../models/entry");
const router = express.Router();

router.get("/addEntry", (req, res) => {
  const entry = new Entry({
    title: "Title",
    description: "Description",
    markdown: "Markdown",
  });
  res.render("entries/addEntry", { entry: entry });
});

router.get("/", async (req, res) => {
  res.render("../views/entries/index");
});

router.get("/addEntry", async (req, res) => {
  res.render("../views/entries/addEntry");
});

router.post(
  "/",
  async (req, res, next) => {
    req.entry = new Entry();
    next();
  },
  saveEntryAndRedirect("addEntry")
);

function saveEntryAndRedirect(path) {
  return async (req, res) => {
    let entry = req.entry;
    entry.title = req.body.title;
    entry.description = req.body.description;
    entry.markdown = req.body.markdown;

    try {
      entry = await entry.save();
      //res.redirect(`/entries/${article.slug}`);
      res.render(`entries/${path}`, { entry: entry });
    } catch (e) {
      console.log(e);
      res.render(`entries/${path}`, { entry: entry });
    }
  };
}

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const entriesRouter = require("./routes/entries");
const viewsRouter = require("./routes/views");
const Entry = require("./models/entry");
const methodOverride = require("method-override");
const multer = require('multer');
const path = require('path');

const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Successfully connected to DataBase!");
});

const storage = multer.diskStorage({
  destination:function (req,file,cb){
    cb(null,'uploads')
  },
  filename:function(req,file,cb){
    cb(null, Date.now() + '_' + path.extname(file.originalname));
  }
})

const upload = multer({
  storage:storage
})

app.get("/", async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: "desc" });
  res.render("entries/index", { entries: entries });
});

app.get("/documentation", async (req, res) => {
  res.render("documentation");
});

app.use("/entries", entriesRouter);
app.use("/views", viewsRouter);

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

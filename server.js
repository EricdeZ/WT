const express = require("express");
const mongoose = require("mongoose");
const entriesRouter = require("./routes/entries");
const viewsRouter = require("./routes/views");
const Entry = require("./models/entry");
const WebSocket = require('ws');
const methodOverride = require("method-override");

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

app.get("/", async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: "desc" });
  res.render("entries/index", { entries: entries });
});

app.use("/entries", entriesRouter);
app.use("/views", viewsRouter);

const port = 5000;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})


const express = require("express");
const app = express();
const dbConnect = require("./Models/dbConnect.js");
const http = require("http").createServer(app);
const User = require("./Models/Models");
const routes = require("./routes.js");
const mongo = require("mongodb").MongoClient;
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    cors: true,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Server"],
    credentials: true,
  },
});
const cors = require("cors"); //require("./cors.js")
// const { route } = require('./routes.js');

app.get("/", (req, res) => {
  res.send("<h1>This wokrs just fine!</h1>");
});

dbConnect(app);
// app.use(morgan('dev'));
app.use(cors);

app.use(routes);
mongo.connect(
  "mongodb+srv://admin:admin@cluster0.dme67.mongodb.net/Chat-server?retryWrites=true&w=majority",
  function (err, db) {
    let database = db.db("Chat-server");
    io.on("connection", socket => {
      let chat = database.collection("users");
      socket.on("message", ({ name, message }) => {
        socket.emit("message", { name, message });
      });
      chat
    
        .find()
        .limit(100)
        .sort({ _id: 1 })
        .toArray(function (err, res) {
          if (err) {
            throw err;
          }

          // Emit the messages
          socket.emit("output", res);
        });
    });
  }
);

http.listen(4000, function () {
  console.log("listening on port 4000");
});

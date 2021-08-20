const express = require('express');
const app = express();
const dbConnect = require("./Models/dbConnect.js")
const http = require('http').createServer(app);
const User = require("./Models/Models")
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    cors: true,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Server"],
    credentials: true
  }
});
app.get("/", (req,res)=>{
res.send("<h1>This wokrs just fine!</h1>")
})
dbConnect(app)
// app.use(morgan('dev'));

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})


http.listen(4000, function() {
  console.log('listening on port 4000')
})

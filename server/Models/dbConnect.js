const mongoose = require("mongoose");
function dbConnect() {
  //mongoose.connect('mongodb://localhost/express', {
  mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.dme67.mongodb.net/Chat-server?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("CONNECTED");
  });
}

module.exports = dbConnect;

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");
var constants = require("./constants");
var router = require("./src/routes");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", router);

io.on("connection", () => {
  console.log("a user is connected");
});

mongoose.connect(constants.DB_URL, { useMongoClient: true }, (err) => {
  console.log("mongodb connected", err);
});

var server = http.listen(3000, () => {
  console.log("server is running on port", server.address().port);
});

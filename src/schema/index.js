var mongoose = require("mongoose");

var Message = mongoose.model("Message", {
    name: String,
    message: String,
    time: { type: Date, default: Date.now },
  });

module.exports = {
    Message,
}
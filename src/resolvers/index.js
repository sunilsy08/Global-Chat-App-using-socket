var config = require("../../constants");
var { Message } = require("../../src/schema");

const getMessages = (req, res) => {
  Message.find()
    .sort({ date: -1 })
    .find({}, (err, messages) => {
      res.send(messages.slice(-config.MAX_MESSAGES));
    });
};

const deleteMessages = (req, res) => {
  Message.remove({}, () => {});
};

const getUserMessages = (req, res) => {
  var user = req.params.user;
  Message.find()
    .sort({ date: -1 })
    .find({ name: user }, (err, messages) => {
      res.send(messages.slice(-config.MAX_MESSAGES));
    });
};

const addMessage = async (req, res) => {
  try {
    var user = req.body.user;
    var recentMessages = await Message.find().find({
      name: user,
      time: {
        $lte:
          new Date().getTime() - config.CONSECUTIVE_MESSAGE_TIME_LIMIT * 1000,
      },
    });
    if (recentMessages.length < 2) {
      var message = new Message(req.body);

      await message.save();
      io.emit("message", req.body);
    }
    res.sendStatus(config.RESPONSE_CODES.REQUEST_OK);
  } catch (error) {
    res.sendStatus(config.RESPONSE_CODES.INTERNAL_SERVER_ERROR);
    return console.log("error", error);
  }
};

module.exports = {
  getMessages,
  deleteMessages,
  getUserMessages,
  addMessage,
};

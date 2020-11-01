var {
  getMessages,
  deleteMessages,
  getUserMessages,
  addMessage,
} = require("../../resolvers");

var routes = (router) => {
  router.route("/messages").get(getMessages);
  router.route("/delete").delete(deleteMessages);
  router.route("/messages/:user").get(getUserMessages);
  router.route("/messages").post(addMessage);
};

module.exports = routes;

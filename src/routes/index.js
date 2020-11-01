var express = require('express');

var router = express.Router();

require('./endpoints')(router);

module.exports = router;
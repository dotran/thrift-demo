var db = require('../db');

module.exports =  function (status, message, res, shouldDisconnect) {
  res.status(status).end(message);
}

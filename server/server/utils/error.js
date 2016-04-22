var db = require('../db');

module.exports =  function (status, message, res, shouldDisconnect) {
  if (shouldDisconnect)
    db.disconnect();

  res.status(status).end(message);
}

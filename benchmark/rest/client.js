var restify = require('restify');

var client = restify.createJsonClient({
  url: 'http://localhost:8080',
  version: '*',
  accept: 'application/json'

});

module.exports = function (callback) {
  client.get('/test', callback);
}

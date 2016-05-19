var restify = require('restify');
var params = require('./params');
var one = require('./params-one');

var client = restify.createJsonClient({
  url: 'http://localhost:8080',
  version: '*',
  accept: 'application/json'

});



module.exports = {
  get: function (callback) {
    client.get('/test', function (err, req, res) {
      callback(err, JSON.parse(res.body));
    });
  },
  send: function (callback) {
    client.post('/test',params, function (err, req, res) {
      callback(err, null);
    });
  },
  both: function (callback) {
    client.put('/test', params, function (err, req, res) {
      callback(err, JSON.parse(res.body));
    });
  },
  getOne: function (callback) {
    client.get('/one', function (err, req, res) {
      callback(err, JSON.parse(res.body));
    });
  },
  sendOne: function (callback) {
    client.post('/one', one, function (err, req, res) {
      callback(err, null);
    });
  },
  bothOne: function (callback) {
    client.put('/one', one, function (err, req, res) {
      callback(err, JSON.parse(res.body));
    });
  }
}

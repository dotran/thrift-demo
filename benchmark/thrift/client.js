var thrift = require('thrift');
var TestService = require('./gen-nodejs/TestService');
var ttypes = require('./gen-nodejs/test_types');

var jsonParams = require('../rest/params');
var cachedParams = [];
var one;
for (var i = 0; i < jsonParams.length; i++) {
  if (!one) {
    one = new ttypes.Test(jsonParams[i]);
  }
  cachedParams.push(new ttypes.Test(jsonParams[i]));
}

function TestClient (transport, protocol) {
  var connection, client, transport = transport, protocol = protocol;


  return {
    connect: function () {
      connection = thrift.createConnection("localhost", 9090, {
        transport : transport,
        protocol : protocol
      });

      connection.on('error', function(err) {
        assert(false, err);
      });

      client = thrift.createClient(TestService, connection)
    },
    test: function (callback) {
      client.test(callback);
    },
    send: function (callback) {
      client.send(cachedParams, callback);
    },
    sendReceive: function (callback) {
      client.sendReceive(cachedParams, callback);
    },
    getOne: function (callback) {
      client.getOne(callback);
    },
    sendOne: function (callback) {
      client.sendOne(one, callback);
    },
    sendReceiveOne: function (callback) {
      client.sendReceiveOne(one, callback);
    },
    close: function () {
      connection.end();
    }

  }

}

module.exports = TestClient

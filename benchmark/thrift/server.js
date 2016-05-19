var thrift = require("thrift");
var TestService = require("./gen-nodejs/TestService");
var ttypes = require("./gen-nodejs/test_types");

var data = {};

var jsonParams = require('../rest/params');
var cachedParams = [];
var one;

for (var i = 0; i < jsonParams.length; i++) {
  if (!one) {
    one = new ttypes.Test(jsonParams[i]);
  }
  cachedParams.push(new ttypes.Test(jsonParams[i]));
}



var server = thrift.createServer(TestService, {
  test: function(result) {
    result(null, cachedParams);
  },
  send: function (tests, result) {
    result(null);
  },
  sendReceive: function (tests, result) {
    result(null, tests);
  },
  getOne: function (result) {
    result(null, one);
  },
  sendOne: function (test, result) {
    result(null);
  },
  sendReceiveOne: function (test, result) {
    result(null, test);
  }
});

console.log('Running Thrift server at 9090');
server.listen(9090);

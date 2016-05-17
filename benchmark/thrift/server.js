var thrift = require("thrift");
var TestService = require("./gen-nodejs/TestService");
var ttypes = require("./gen-nodejs/test_types");

var data = {};

var jsonParams = require('../rest/params');
var cachedParams = [];

for (var i = 0; i < jsonParams.length; i++) {
  cachedParams.push(new ttypes.Test(jsonParams[i]));
}
console.log(cachedParams.length);


var server = thrift.createServer(TestService, {
  test: function(result) {
    // console.log("ping()");
    result(cachedParams);
  }

});

console.log('Running Thrift server at 9090');
server.listen(9090);

var thrift = require("thrift");
var ttypes = require("./gen-nodejs/test_types");

var jsonParams = require('../rest/params');
var cachedParams = [];

for (var i = 0; i < jsonParams.length; i++) {
  cachedParams.push(new ttypes.Test(jsonParams[i]));
}

exports.module = cachedParams;

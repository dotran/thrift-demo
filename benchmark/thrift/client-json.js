var thrift = require('thrift');
var TestClient = require('./client');

transport = thrift.TBufferedTransport()
protocol = thrift.TJSONProtocol()

module.exports = new TestClient(transport, protocol);

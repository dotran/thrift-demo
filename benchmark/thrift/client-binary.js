var thrift = require('thrift');
var TestClient = require('./client');

transport = thrift.TBufferedTransport()
protocol = thrift.TBinaryProtocol()

module.exports = new TestClient(transport, protocol);

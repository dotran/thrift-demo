var thrift = require('thrift');
// console.log(thrift);
// var ThriftTransports = require('thrift/transport');
// var ThriftProtocols = require('thrift/protocol');
var TestService = require('./gen-nodejs/TestService');
var ttypes = require('./gen-nodejs/test_types');

transport = thrift.TBufferedTransport()
protocol = thrift.TBinaryProtocol()

// var


function TestClient () {
  var connection, client;

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
      // assert.ok(client);
      // assert.ok(connection);
      client.test(callback);
    },
    close: function () {
      connection.end();
    }

  }

}

module.exports = TestClient

// client.ping(function(err, response) {
//   console.log('ping()');
// });
//
//
// client.add(1,1, function(err, response) {
//   console.log("1+1=" + response);
// });
//
//
// work = new ttypes.Work();
// work.op = ttypes.Operation.DIVIDE;
// work.num1 = 1;
// work.num2 = 0;
//
// client.calculate(1, work, function(err, message) {
//   if (err) {
//     console.log("InvalidOperation " + err);
//   } else {
//     console.log('Whoa? You know how to divide by zero?');
//   }
// });
//
// work.op = ttypes.Operation.SUBTRACT;
// work.num1 = 15;
// work.num2 = 10;
//
// client.calculate(1, work, function(err, message) {
//   console.log('15-10=' + message);
//
//   client.getStruct(1, function(err, message){
//     console.log('Check log: ' + message.value);
//
//     //close the connection once we're done
//     connection.end();
//   });
// });

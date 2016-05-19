var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var rest = require('./rest/client');
var thrift = require('./thrift/client-binary');

var thriftJson = require('./thrift/client-json');

thrift.connect();
thriftJson.connect();

//Adding test suites
suite.add('Rest#Send', function(deferred) {
  rest.send(function (err, res) {
    deferred.resolve();
  });

}, {defer: true})

.add('Thrift#Send', function(deferred) {
  thrift.send(function (err, res) {
    deferred.resolve();
  });

}, {defer: true})

.add('ThriftJSON#Send', function(deferred) {
  thriftJson.send(function (err, res) {
    deferred.resolve();
  });

}, {defer: true})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
  thrift.close();
  thriftJson.close();
  process.exit();
})
// run async
.run({ 'async': true });

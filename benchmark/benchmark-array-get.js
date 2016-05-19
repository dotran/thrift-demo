var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var rest = require('./rest/client');
var thrift = require('./thrift/client-binary');
var thriftJson = require('./thrift/client-json');

thrift.connect();
thriftJson.connect();

//Adding test suites
suite.add('Rest', function(deferred) {
  rest.get(function (err, res) {
    deferred.resolve();
  });

}, {defer: true})



.add('Thrift', function(deferred) {
  thrift.test(function (err, res) {
    deferred.resolve();
  });

}, {defer: true})

.add('ThriftJSON', function(deferred) {
  thriftJson.test(function (err, res) {
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

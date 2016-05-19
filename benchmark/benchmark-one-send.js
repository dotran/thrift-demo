var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var rest = require('./rest/client');
var thrift = require('./thrift/client-binary');
var thriftJson = require('./thrift/client-json');

thrift.connect();
thriftJson.connect();

//Adding test suites
suite.add('Rest#One#Send', function(deferred) {
  rest.sendOne(function (err, res) {
    deferred.resolve();
  });

}, {defer: true})



.add('Thrift#One#Send', function(deferred) {
  thrift.sendOne(function (err, res) {
    deferred.resolve();
  });

}, {defer: true})

.add('ThriftJSON#One#Send', function(deferred) {
  thriftJson.sendOne(function (err, res) {
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

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf


// var bench  = new Benchmark('foo', function (deferred))

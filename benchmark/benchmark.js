var Benchmark = require('benchmark');

//
//
var suite = new Benchmark.Suite;

var rest = require('./rest/client');
var ThriftClient = require('./thrift/client');
var thrift = new ThriftClient();
console.log(thrift);

thrift.connect();
//
// // add tests
suite.add('Rest', function(deferred) {
  rest(function (err, res) {
    deferred.resolve();
  });

}, {defer: true})



.add('Thrift', function(deferred) {
  // /o/.test('Hello World!');
  // console.log(deferred);
  thrift.test(function () {
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
})
// run async
.run({ 'async': true });

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf


// var bench  = new Benchmark('foo', function (deferred))

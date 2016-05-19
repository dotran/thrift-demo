var restify = require('restify');

var response = require('./params');
var oneResponse = require('./params-one');
function respond(req, res, next) {
  res.json(response);
  next();
}

function returnArray(req, res, next) {
  res.json(req.body);
  next();
}

function respondOne(req, res, next) {
  res.json(oneResponse);
  next();
}

function returnsOne(req, res, next) {
  res.json(req.body);
  next();
}

var server = restify.createServer();

server.use(restify.bodyParser());

server.get('/test', respond);
server.post('/test', function (req, res, next) {
  res.end('');
  next();
});
server.put('/test', returnArray);

server.get('/one', respondOne);
server.post('/one', function (req, res, next) {
  res.end('');
  next();
});
server.put('/one', returnsOne);

// server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

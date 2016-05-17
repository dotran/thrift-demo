var restify = require('restify');

var response = require('./params');
function respond(req, res, next) {
  res.json(response);
  next();
}

var server = restify.createServer();

server.use(restify.bodyParser());

server.get('/test', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

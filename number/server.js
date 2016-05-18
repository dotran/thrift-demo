var restify = require('restify');


function healthyServer(req, res, next) {
  res.status(200)
  res.send('OK');
  next();
}

var number = Math.floor(Math.random() * (1000 - 1 + 1) + 1);

function getNumber(req, res, next) {
  res.json({number: number});
  next();
}

var server = restify.createServer();

server.use(restify.bodyParser());

server.get('/health', healthyServer);
server.get('/number', getNumber);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

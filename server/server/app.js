var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//configuration
var port = require('./config').webserverConfig().port;

//Parsing JSON for requests
app.use(bodyParser.json());

//Adding static content from client folder
app.use(express.static('client'));

//Adding routes
require("./routes")(app);

app.listen(port, function () {
  console.log('Listening on port %s!',port);
});

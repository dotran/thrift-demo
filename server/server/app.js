var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Parsing JSON
app.use(bodyParser.json());

//Adding static content from client folder
app.use(express.static('client'));

//Adding routes
require("./routes")(app);

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

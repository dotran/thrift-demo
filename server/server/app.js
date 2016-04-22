var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Parsing JSON
app.use(bodyParser.json());
//Adding static content from client folder
app.use(express.static('client'));

require("./routes")(app);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

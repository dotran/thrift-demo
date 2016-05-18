//Client factory
var config = require('./config');
var http = require('http');

// Required files
var hostname = config.numberConfig().host; // Arbitrary host
var hostport = config.numberConfig().port; // Arbitrary port


module.exports = {
  addRoutes: function (App) {
    //GET A NUMBER
    App.get("/number", function (req, res, next) {

      http.get(
        {host: hostname, port: hostport, path: '/number'},
        function (response) {
          var str = '';

          response.on('data', function (chunk) {
            str += chunk;
          });

          response.on('end', function () {
            res.json(str);
            next();
          });
        }
      );
    });
  }
}

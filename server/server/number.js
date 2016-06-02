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

      console.log("Got number request");
      console.log("trying at %s:%s",hostname,hostport);
      // res.json({number: 1});
      // next();
      http.get(
        {host: hostname, port: hostport, path: '/number'},
        function (response) {
          var str = '';
          console.log('callback');

          response.on('data', function (chunk) {
            str += chunk;
            console.log('got chunk %s',chunk);
          });

          response.on('end', function () {
            console.log('ended %s', str);
            res.json(str);
            next();
          });
        }
      );
    });
  }
}

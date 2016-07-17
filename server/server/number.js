//Client factory
var config = require('./config');
var http = require('http');
var Q = require('q'),
    Client = require('node-rest-client').Client;

var client = new Client();
// Required files
var hostname = config.numberConfig().host; // Arbitrary host
var hostport = config.numberConfig().port; // Arbitrary port

var numberUrl = "http://"+hostname+":"+hostport;

module.exports = {
  addRoutes: function (App) {
    //GET A NUMBER
    App.get("/number", function (req, res, next) {

      console.log("Got number request");
      console.log("trying at %s:%s",hostname,hostport);

      client.get(numberUrl+"/number", {
          requestConfig: {
              timeout:1000
          }
      }, function (data) {
          res.json(data);
          next();
      }).on('error', function (error) {
          next(error);
      });
      // return dfd.promise;
      // http.get(
      //   {host: hostname, port: hostport, path: '/number'},
      //   function (response) {
      //     var str = '';
      //     console.log('callback');
      //
      //     response.on('data', function (chunk) {
      //       str += chunk;
      //       console.log('got chunk %s',chunk);
      //     });
      //
      //     response.on('end', function () {
      //       console.log('ended %s', str);
      //       res.json(str);
      //       next();
      //     });
      //   }
      // );
    });
  }
}

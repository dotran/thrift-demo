//Client factory
var factory = require("thrift-client-factory");

// Required files
var TasksService = require("./gen-nodejs/Tasks");

var hostname = "127.0.0.1"; // Arbitrary host
var hostport = 6000;        // Arbitrary port

function onError(error) {
  console.log(error);
}

// var TasksClient = factory.create(TasksService, hostname, hostport, onError);
// var client = TasksClient.client;


function Task (userId, body) {
  this.userId = userId;
  this.name = body.name;
  this.done = body.done || false;
  this.createdOn = body.createdOn || new Date().toISOString();
}

module.exports = {
  addRoutes: function (App) {

    function destroyFactory (client) {
      factory.destroy(client);
    }

      var auth = require("./authentication");

      //Make the route completes only if authenticated
      App.get("/tasks", auth.requiresAuth);
      App.get("/tasks", function (req, res, next) {
        //
        // console.log(req.token);
        // console.log(req.userId);
        var TasksClient = factory.create(TasksService, hostname, hostport,
          function (error) {
            console.error("Some bad shit happened");
            destroyFactory(TasksClient);
            res.status(400).end("Unknown Error");
          });
        console.log(typeof req.userId.toString());
        console.log("%s, %s ===== going to call the thrift method now",req.token,req.userId);

        TasksClient.client.all(req.userId.toString(), function (err, response) {
          console.log("got response for all method");

          console.log(err);
          console.log(response);

          destroyFactory(TasksClient);
          res.json(response);
          // res.json([
          //   {
          //     id:1,
          //     name:"test"
          //   }
          // ]);

        })
      });

      //ADD POST
      App.post("/tasks", auth.requiresAuth);
      App.post("/tasks", function (req, res, next) {
        console.log(req.body);
        var task = new Task(req.userId.toString(), req.body);

        console.log(task);

        var TasksClient = factory.create(TasksService, hostname, hostport,
          function (error) {
            console.error("Some bad shit happened");
            // factory.destroy(TasksClient);
            destroyFactory(TasksClient);
            res.status(400).end("Unknown Error");
          });
        // var client = TasksClient.client;

        TasksClient.client.add(task.userId, task.name, function (err, response) {
          console.log("got response for add method");

          console.log(err);
          console.log(response);
          destroyFactory(TasksClient);
          res.json(response);
        });

      });


      // App.put()
  }
}

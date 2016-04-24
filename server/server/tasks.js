//Client factory
var factory = require("thrift-client-factory");
var validation = require('./utils/validation');
var config = require('./config');

// Required files
var TasksService = require("./gen-nodejs/Tasks");
var TaskTypes = require("./gen-nodejs/tasks_types");

var hostname = config.taskConfig().host; // Arbitrary host
var hostport = config.taskConfig().port; // Arbitrary port

function Task (userId, body) {
  this.userId = userId;
  this.name = body.name || null;
  this.createdOn = body.createdOn || new Date().toISOString();
  this.id = body.id || null;

  if (validation.isBoolean(body.done)) {
    this.done = body.done;
  }
  else {
    this.done = null;
  }
}

Task.prototype.validateAdd = function () {
  if (!this.name || typeof this.name !== 'string' || !this.name.trim().length) {
    throw new Error("Please input a name");
  }
}

Task.prototype.isIdValid = function () {
  return !(validation.isNullOrUndefined(this.id));
}

Task.prototype.isNameValid = function () {
  return !(validation.isNullOrUndefined(this.name));
}

Task.prototype.isDoneValid = function () {
  return !(validation.isNullOrUndefined(this.done));
}

Task.prototype.validateUpdate = function () {
  if (!this.isIdValid()) {
    throw new Error("Please input the Task ID");
  }
  if (!this.isNameValid() && !this.isDoneValid()) {
    throw new Error("Please update a name or completed state");
  }

}

module.exports = {
  addRoutes: function (App) {

    function destroyFactory (client) {
      factory.destroy(client);
    }

      var auth = require("./authentication");

      //GET ALL TASKS
      App.get("/tasks", auth.requiresAuth);
      App.get("/tasks", function (req, res, next) {

        var TasksClient = factory.create(TasksService, hostname, hostport,
          function (error) {
            destroyFactory(TasksClient);
            res.status(400).end("Unknown Error");
          });

        TasksClient.client.all(req.userId.toString(), function (err, response) {
          destroyFactory(TasksClient);
          res.json(response);
        })
      });

      //ADD POST
      App.post("/tasks", auth.requiresAuth);
      App.post("/tasks", function (req, res, next) {

        var task = new Task(req.userId.toString(), req.body);

        try {
          task.validateAdd();
        }
        catch (exc) {
          res.status(400).end(exc.message);
        }

        var TasksClient = factory.create(TasksService, hostname, hostport,
          function (error) {
            destroyFactory(TasksClient);
            res.status(400).end("Unknown Error");
          });

        TasksClient.client.add(task.userId, task.name, function (err, response) {
          destroyFactory(TasksClient);
          res.json(response);
        });

      });

      //ADD POST
      App.put("/tasks", auth.requiresAuth);
      App.put("/tasks", function (req, res, next) {
        var task = new Task(req.userId.toString(), req.body);

        try {
          task.validateUpdate();
        }
        catch (exc) {
          res.status(400).end(exc.message);
          return;
        }

        var tTask = new TaskTypes.Task(task);

        var TasksClient = factory.create(TasksService, hostname, hostport,
          function (error) {
            destroyFactory(TasksClient);
            res.status(400).end("Unknown Error");
          });

        TasksClient.client.upsert(tTask, function (err, response) {
          destroyFactory(TasksClient);
          if (err) {
            res.status(err.code).end(err.message);
          }
          else {
            res.json(response);
          }

        });

      });
  }
}

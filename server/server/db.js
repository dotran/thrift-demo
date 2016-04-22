//Basic configuration
var baseUrl = "mongodb://localhost/";
var dbName = "demo-tasks";

//MongoDB Driver
var mongoose = require('mongoose');

module.exports = {
  idType: mongoose.Schema.Types.ObjectId,
  connect: function () {
    mongoose.connect(baseUrl+dbName);
  },
  createSchema: function (name, schema) {
    mongoose.model(name,
      new mongoose.Schema(schema)
    );
  },
  getModel: function (name) {
    return mongoose.model(name);
  },
  disconnect: function () {
    mongoose.disconnect();
  }
};

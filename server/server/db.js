//Basic configuration
var baseUrl = "mongodb://localhost/";
var dbName = "demo-tasks";

//MongoDB Driver
var mongoose = require('mongoose');

var connectionStatus = false;

mongoose.connect(baseUrl+dbName);

process.on('exit', function (){
  mogoose.disconnect();
})

module.exports = {
  idType: mongoose.Schema.Types.ObjectId,
  createSchema: function (name, schema) {
    mongoose.model(name,
      new mongoose.Schema(schema)
    );
  },
  getModel: function (name) {
    return mongoose.model(name);
  }
};

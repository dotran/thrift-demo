var config = require('./config');

//Basic configuration
var baseUrl = config.mongoUrl();
var dbName = config.mongoConfig().db;

//MongoDB Driver
var mongoose = require('mongoose');

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

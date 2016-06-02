var fs = require('fs');

//Running using Zookeeper and smartstack
var environment = process.env.NODE_ENV;
var configFile = __dirname+'/../config.dev.json';

if (environment == 'production') {
  configFile = __dirname+'/../config.json';
}


var configJson = fs.readFileSync(configFile, 'utf-8');

if (configJson) {
  configJson = JSON.parse(configJson);
}

//User DB
configJson.userdb = {
  host: process.env.MONGO_HOST || process.env.MONGO_PORT_27017_TCP_ADDR || configJson.userdb.host,
  port: process.env.MONGO_PORT || process.env.MONGO_PORT_27017_TCP_PORT || configJson.userdb.port,
  db: process.env.MONGO_DB || configJson.userdb.db
};

module.exports = {
  webserverConfig: function () {
    return configJson.webserver;
  },
  taskConfig: function () {
    return configJson.taskservice;
  },
  mongoConfig: function () {
    return configJson.userdb;
  },
  mongoUrl: function () {
    var mongo = this.mongoConfig();
    return 'mongodb://' + mongo.host + ':' + mongo.port + '/'
  },
  numberConfig: function () {
    return configJson.numberservice;
  }
}

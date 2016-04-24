var fs = require('fs');
//Reading configuration file
var configJson = fs.readFileSync(__dirname+'/../../config.json', 'utf-8');

if (configJson) {
  configJson = JSON.parse(configJson);
}

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
  }
}

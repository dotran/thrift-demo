module.exports = function (App) {

  //USER
  var User = require("./user");
  User.addRoutes(App);

  //TASKS
  var Tasks = require("./tasks");
  Tasks.addRoutes(App);
}

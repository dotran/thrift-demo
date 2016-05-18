module.exports = function (App) {

  //Enable CORS
  App.use(require('./utils/cors'));

  //USER
  var User = require('./user');
  User.addRoutes(App);

  //TASKS
  var Tasks = require('./tasks');
  Tasks.addRoutes(App);

  //NUMBER
  var Numbers = require('./number')
  Numbers.addRoutes(App);
}

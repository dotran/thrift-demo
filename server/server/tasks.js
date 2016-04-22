module.exports = {
  addRoutes: function (App) {

      var auth = require("./authentication");

      //Make the route completes only if authenticated
      App.get("/tasks", auth.requiresAuth);
      App.get("/tasks", function (req, res, next) {

        console.log(req.token);
        console.log(req.userId);
        //NOTE:For testing purpose only
        res.json([
          {
            id:1,
            name:"test"
          }
        ]);
      })
  }
}

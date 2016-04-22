var modelName = 'User';
var CryptoJS = require("crypto-js");
var db = require('./db');
var accessToken = require('./accesstoken');
var errorResponse = require('./utils/error');
var baseUrl = "users";

//Creating database schema
db.createSchema(modelName, {
  username: String,
  password: String,
  name: String,
  createdOn: {type: Date, default: new Date()}
});

var userDb = db.getModel(modelName);

//Class constructor
function User (name, username, password) {

  var self = this;
  function buildPass (password) {
    return CryptoJS.HmacSHA1(self.username+password, self.username).toString();
  }

  this.name = name;
  this.username = username;
  this.password = buildPass(password);
  this.createdOn = new Date();

  return this;
}

User.prototype.isPasswordValid = function (password) {
  return this.password === password;
}

User.prototype.isValidSignupInstance = function () {
  return (this.name && this.name.trim() && this.username && this.username.trim() && this.password);
}

User.prototype.isValidInstance = function () {
  return (this.username && this.password);
}

User.prototype.createToken = function (cb) {
  accessToken.create(this._id, cb);
}

// function errorResponse(status, message, res, shouldDisconnect) {
//   res.status(status).end(message);
// }

//Login function
function login (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var userObj = new User(null, username, password);

  if (!userObj.isValidInstance()) {
    return errorResponse(401, "Invalid instance for login", res);
  }

  userDb.findOne({username: userObj.username},  function (error, user) {
    if (error) {
      return errorResponse(401, error.toString(), res, true);
    }

    //Not found
    if (!user) {
      return errorResponse(401, "Username/Password invalid", res, true);
    }

    //Invalid password
    if (!userObj.isPasswordValid(user.password)) {
      return errorResponse(401, "Username/Password invalid", res, true);
    }

    userObj._id = user._id;

    //Generate Token
    userObj.createToken(function (error, at) {

      if (error) {
        return errorResponse(400, "unknown error", res, true);
      }

      res.json(at);
    });
  });

}


//Signup function
function signup (req, res, next) {

  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;

  var userObj = new User(name, username, password);

  if (!userObj.isValidSignupInstance()) {
    return errorResponse(401, "Invalid parameters", res);
  }

  var instance = new userDb(userObj);

  userDb.count({username: userObj.username}, function(error, count) {
    if (error) {
      return errorResponse(400, "Unkown error", res, true);
    }

    if (count) {
      return errorResponse(403, "User already exists", res, true);
    }

    instance.save(function (error, obj) {
      if (error || !obj) {
        return errorResponse(400, "Unkown error", res, true);
      }

      userObj._id = obj._id;

      userObj.createToken(function (error, at) {
        if (error) {
          return errorResponse(400, "Unkown error", res, true);
        }

        res.json(at);
      });
    });
  });
}

var auth = require('./authentication');

//Logout
function logout (req, res, next) {
  var tokenString = auth.getAccessToken(req);

  accessToken.remove(tokenString, function (error) {
    if (error) {
      console.error(error);
      return errorResponse(400, "Unknown Error", res, true);
    }

    res.end("ok");
  })
}

module.exports = {
  addRoutes: function (App) {
      // console.log("USER IS ADDING ITS OWN ROUTES");

      //Login route
      App.post("/"+baseUrl+"/login", login);

      //Signup route
      App.post("/"+baseUrl+"/signup", signup);

      //Logout route
      App.post("/"+baseUrl+"/logout", auth.requiresAuth);
      App.post("/"+baseUrl+"/logout", logout);

      // var auth = require('./authentication');
  }
}

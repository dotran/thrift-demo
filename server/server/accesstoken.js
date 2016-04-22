var uuid = require("node-uuid");
var db = require('./db');

//weeks * days * hours * minutes * seconds
var defaultTTL = 2 * 7 * 24 * 60 * 60;

var modelName = "AccessToken";

//Creating database schema
db.createSchema(modelName, {
  token: String,
  ttl: {type: Number, default: defaultTTL},
  createdOn: {type: Date, default: new Date()},
  userId: {type: db.idType, ref: 'User'}
});

var accessTokenDb = db.getModel(modelName);


//Util function to encapsulate token generation
function generateNew () {
  return uuid.v4();
}

//Class constructor
function AccessToken (userId) {
  return {
    token: generateNew(),
    userId: userId,
    ttl: defaultTTL,
    createdOn: new Date()
  };
}

function AccessTokenReturn (tokenInstance) {
  if (!tokenInstance) {
    return null;
  }
  return {
    token: tokenInstance.token,
    userId: tokenInstance.userId,
    ttl: tokenInstance.ttl,
    createdOn: tokenInstance.createdOn
  }
}

module.exports = {
  isValid: function (token, cb) {
    db.connect();
    accessTokenDb.findOne({token: token}, function (error, result) {
      db.disconnect();

      if (error) {
      	return cb(error, false);
      }

      if (!result) {
        return cb(null, false);
      }

      var expiration = result.createdOn.valueOf() + (result.ttl * 1000);

      return cb(null, (new Date().valueOf() <= expiration));
    });
  },
  create: function (userId, cb) {
    var instance = new accessTokenDb(new AccessToken(userId));
    instance.save(function (error, instance) {
      cb(error, new AccessTokenReturn(instance));
    });
  },
  remove: function (tokenString, cb) {
    accessTokenDb.remove({token: tokenString}, cb);
  }
}

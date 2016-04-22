function AuthorizationError (res) {
  res.status(403)
  .end(
    "Authorization Error"
  );
}

var authorizationKey = "authorization";

var AccessToken = require("./accesstoken");

var errorResponse = require('./utils/error');

function getAccessToken (req) {
  if (!req || !req.headers) {
    return null;
  }
  return req.headers[authorizationKey];
}

module.exports = {
  requiresAuth: function (req, res, next) {
    var tokenString = getAccessToken(req);

    if (!tokenString) {
      return AuthorizationError(res);
    }

    AccessToken.isValid(tokenString, function (error, isValid) {
      if (error) {
        return errorResponse(400, 'Unknown Error', res);
      }

      if (isValid) {
        req.token = tokenString;
        req.userId = isValid.userId;
        next();
      }
      else {
        return AuthorizationError(res);
      }

    });
  },
  getAccessToken: getAccessToken
}

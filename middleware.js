const jwt = require('jsonwebtoken');
const config = require('./config.js');
const cookieParser = require('cookie-parser')

const parseCookies = (request) => {
  var list = {},
      rc = request.headers.cookie;

  rc && rc.split(';').forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
}

const checkToken = (req, res, next) => {
  const token = parseCookies(req).userToken;

  if (token) {
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
      if (err) {
        return res.redirect('/login');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.redirect('/login');
  }
};

module.exports = {
  checkToken: checkToken
}
let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove `Bearer` from string
    token = token.slice(7, token.length);
  }

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
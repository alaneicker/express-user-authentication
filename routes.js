const routes = require('express').Router();
const passwordHash = require('bcrypt-password-hash')
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const db = require('sqlite');
const middleware = require('./middleware');
const config = require('./config');

//passwordHash.hash('Qawsed44!', {saltRounds: 14}).then(hash => console.log(hash));

Promise.resolve()
  .then(() => db.open('./database.sqlite', { Promise }))
  .then(() => db.migrate({ force: 'last' }))
  .catch((err) => console.error(err.stack));

// Authenticate user
routes.post('/user/authenticate', async (req, res) => {
  const { username, password } = req.body;
  const data = await db.get('SELECT password FROM Users WHERE username = ?', username);
  const isValid = await passwordHash.compare(password, data.password);
  
  if (isValid) {
    const token = jwt.sign({ username }, config.jwt_secret, {
      expiresIn: 3600, // expires in 1 hour
    });
  
    res.send({ auth: true, token });
  }
})

routes.get('/account/dashboard', middleware.checkToken, (req, res) => {
  res.send('Route loaded for /account/dashboard');
});

module.exports = routes;

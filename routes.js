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
  const reqBody = { username: 'alaneicker', password: 'Qawsed44!' };
  const data = await db.get('SELECT password FROM Users WHERE username = ?', reqBody.username);
  const isValid = await passwordHash.compare(reqBody.password, data.password);
  
  if (isValid) {
    const token = jwt.sign({ username: reqBody.username }, config.jwt_secret, {
      expiresIn: 3600, // expires in 1 hour
    });
  
    res.send({ auth: true, token });
  }
})

routes.get('/account/dashboard', middleware.checkToken, (req, res) => {
  console.log(`All good! Looks like you've been authenticated!`);
});

module.exports = routes;
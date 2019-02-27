const routes = require('express').Router();
const passwordHash = require('bcrypt-password-hash')
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const db = require('sqlite');
const middleware = require('./middleware');
const config = require('./config');

Promise.resolve()
  .then(() => db.open('./database.sqlite', { Promise }))
  .then(() => db.migrate({ force: 'last' }))
  .catch((err) => console.error(err.stack));

routes.post('/user/authenticate', async (req, res) => {
  const { username, password } = req.body;
  const data = await db.get('SELECT password FROM Users WHERE username = ?', username);
  
  if (data === undefined) {
    res.status(200).send({ auth: false });
  } else {
    const isValid = await passwordHash.compare(password, data.password);
    
    if (isValid) {
      const token = jwt.sign({ username }, config.jwt_secret, {
        expiresIn: 1800, // expires in 30 minutes
      });

      res.status(200).send({ auth: true, token });
    }

    res.status(200).send({ auth: false });
  }
})

routes.get('/login', (req, res) => {
  res.render('login');
});

routes.get('/account/dashboard', middleware.checkToken, (req, res) => {
  res.render('dashboard');
});

routes.get('/account/add-user', middleware.checkToken, (req, res) => {
  res.render('add-user');
});

routes.get('/account/my-profile', middleware.checkToken, (req, res) => {
  res.render('my-profile');
});

module.exports = routes;

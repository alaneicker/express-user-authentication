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
  const isValid = await passwordHash.compare(password, data.password);
  
  if (isValid) {
    const token = jwt.sign({ username }, config.jwt_secret, {
      expiresIn: 3600, // expires in 1 hour
    });
    
    const now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);

    res.cookie('userToken', `${token}`).status(200).send({ auth: true });
  }
})

routes.get('/login', (req, res) => {
  res.render('login');
});

routes.get('/account/dashboard', middleware.checkToken, (req, res) => {
  res.render('dashboard');
});

module.exports = routes;

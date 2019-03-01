const routes = require('express').Router();
const passwordHash = require('bcrypt-password-hash')
const jwt = require('jsonwebtoken');
const db = require('sqlite');
const routeguard = require('./route-guard');
const config = require('./config');

const tokenSignature = require('./server').tokenSignature;
console.log(tokenSignature); 
routes.post('/user/authenticate', async (req, res) => {
  const { username, password } = req.body;
  const data = await db.get('SELECT password FROM Users WHERE username = ?', username);
  
  if (data === undefined) {
    res.status(200).send({ auth: false });
  } else {
    const isValid = await passwordHash.compare(password, data.password);
    
    if (isValid) {
      const token = jwt.sign({ username }, config.jwtSignature, {
        expiresIn: 1800, // expires in 30 minutes
      });

      const now = new Date();
      now.setTime(now.getTime() + 1 * 3600 * 1000);

      return res
        .header('Set-Cookie', `userToken=${token}; expires=${now.toUTCString()}; path=/; HttpOnly`)
        .status(200)
        .send({ auth: true });
    }

    return res.status(200).send({ auth: false });
  }
})

routes.get('/', (req, res) => {
  return res.render('login');
});

routes.get('/logout', (req, res) => {
  const d = new Date();
  d.setTime(d.getTime() + (30 * 1000));

  return res
    .header('Set-Cookie', `userToken=; expires=${d.toGMTString()}; path=/; HttpOnly`)
    .redirect('/login');
});

routes.get('/login', (req, res) => {
  return res.render('login');
});

routes.get('/account/dashboard', routeguard.validateToken, async (req, res) => {
  const users = await db.all('SELECT * FROM Users');
  const currentUser = req.decoded.username;

  return res.render('dashboard', { users, currentUser });
});

routes.get('/user/edit/:id?', async (req, res) => {
  const user = await db.get('SELECT * FROM Users WHERE id = ?', req.params.id);
  return res.render('user-form', { 
    user, 
    updateUser: true, 
    pageTitle: 'Edit User' 
  });
});

routes.get('*', function(req, res){
  res.status(404).render('page-not-found');
});

module.exports = routes;

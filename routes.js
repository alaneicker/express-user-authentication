const routes = require('express').Router();
const passwordHash = require('bcrypt-password-hash')
const jwt = require('jsonwebtoken');
const db = require('sqlite');
const routeguard = require('./route-guard');
const config = require('./config');

// UNPROTECTED ROUTES
// ---------------------------------------------

// Index
routes.get('/', (req, res) => {
  return res.render('login');
});

// Login
routes.get('/login', (req, res) => {
  return res.render('login');
});

// Logout
routes.get('/logout', (req, res) => {
  const d = new Date();
  d.setTime(d.getTime() + (30 * 1000));

  return res
    .header('Set-Cookie', `userToken=; expires=${d.toGMTString()}; path=/; HttpOnly`)
    .redirect('/login');
});

// PROTECTED ROUTES
// ---------------------------------------------

// Dashboard
routes.get('/account/dashboard', routeguard.validateToken, async (req, res) => {
  const users = await db.all('SELECT * FROM Users');
  const currentUser = req.decoded.username;

  return res.render('dashboard', { users, currentUser });
});

// Add user
routes.get('/user/add', routeguard.validateToken, async (req, res) => {
  return res.render('user-form', { pageTitle: 'Add User'  });
});

// Edit user
routes.get('/user/edit/:id?', routeguard.validateToken, async (req, res) => {
  const user = await db.get('SELECT * FROM Users WHERE id = ?', req.params.id);

  return res.render('user-form', { 
    user, 
    updateUser: true, 
    pageTitle: 'Edit User' 
  });
});

// API ENDPOINTS
// ---------------------------------------------

// Authenticate user
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

// Create user
routes.post('/user/create', async (req, res) => {
  const query = 'INSERT INTO Users (name, email, username, password) VALUES (?,?,?,?)';
  const reqBody = Object.assign(req.body, { password: await passwordHash.hash(req.body.password, {saltRounds: 14}) });
  const response = await db.run(query, Object.values(reqBody));
  
  return res.send(response);
});

// Delete user
routes.delete('/user/delete/:id', async (req, res) => {
  const query = 'DELETE FROM Users WHERE id = ?';
  const response = await db.run(query, req.params.id);
  
  return res.send(response.stmt);
});

// Update user
routes.put('/user/update/:id', async (req, res) => {
  let reqBody = req.body;

  if (reqBody.password === '') {
    delete reqBody.password;
  } else {
    reqBody = Object.assign(reqBody, { password: await passwordHash.hash(reqBody.password, {saltRounds: 14}) });
  }

  const query = `
    UPDATE Users 
    SET ${Object.keys(reqBody).map(field => `${field} = ?`).join(', ')} 
    WHERE ID = ?
  `;
  
  const response = await db.run(query, Object.values(reqBody).concat(req.params.id));
  
  return res.send(response);
});

// ERRORS
// ---------------------------------------------

// 404
routes.get('*', function(req, res){
  res.status(404).render('page-not-found');
});

module.exports = routes;
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 8080;

app.use('/', routes);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Node server listening on port ${port}`)
})
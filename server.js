const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars');
const app = express();
const port = process.env.PORT || 9000;

app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));

app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/src/views`);

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Node server listening on port ${port}`)
})
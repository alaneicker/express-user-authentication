const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars');
const hbHelpers = require('./handlebars-helpers');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 9000;
const app = express();

app.engine('handlebars', exphbs({ 
  defaultLayout: 'layout',
  helpers: hbHelpers,
}));

app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/src/views`);

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Node server listening on port ${port}`)
})
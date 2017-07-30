const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mst', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');

app.get('/', (request,response) => {
  // response.send('John we are doing it')
  response.render('home');
});

app.listen(3000, () => {
  console.log('Listen up port 3000!');
});

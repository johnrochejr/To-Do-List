const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

// create data

let todos = {
  completed: [
    { id: 0, task: "Drink coffee" },
    { id: 1, task: "Read the news" },
    { id: 2, task: "Get some exercise"}
  ],
  pending: [
    { id: 3, task: "Work on TIY stuff" },
    { id: 4, task: "Dinner with sis @ 7p" }
  ]
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: false}));

app.engine('mst', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');

// app.post('/newTodo', (request, response) => {
//
// })

app.get('/', (request,response) => {
  response.render('home', todos);
});

app.listen(3000, () => {
  console.log('Listen up port 3000!');
});

const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

// create data

let todos = {
  completed: [
    "Drink coffee",
    "Read the news",
    "Get some exercise"
  ],
  pending: [
    "Work on TIY stuff",
    "Dinner with sis @ 7p"
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

app.post('/newTodo', (request, response) => {
  let newTask = request.body.todo;
  todos.pending.push(newTask);
  response.redirect('/');
});

app.post('/completedTasks/:completeTask', (request, response) => {
  let completeTask = request.params.completeTask
})

app.listen(3000, () => {
  console.log('Listen up port 3000!');
});

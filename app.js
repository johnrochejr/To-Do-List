const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const expressSession = require('express-session');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: false}));

app.engine('mst', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');

app.use(
  expressSession({
    secret: 'tame impala',
    resave: false,
    saveUnitialized: true
  })
);

app.get('/', (request,response) => {
  const todoList = request.session.todoList || [];

  const todos = {
    pending: todoList.filter(todo => !todo.completed),
    completed: todoList.filter(todo => todo.completed)
  };
  response.render('home', todos);
});

app.post('/addTodo', (request, response) => {
  const todoList = request.session.todoList || [];
  const description = request.body.description;

  todoList.push({ id: todoList.length + 1, completed: false,
  description: description });

  request.session.todoList = todoList;
  response.redirect('/');
});

app.post('/complete', (request, response) => {
  const todoList = request.session.todoList || [];
  const id = parseInt(request.body.id);
  const todo = todoList.find(todo => todo.id === id);

  if (todo) {
    todo.completed = true;
    request.session.todoList;
  }
  response.redirect('/');
});

app.listen(3000, () => {
  console.log('Listen up port 3000!');
});

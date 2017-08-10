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

app.use(expressValidator());

app.use(
  expressSession({
    secret: 'tame impala',
    resave: false,
    saveUnitialized: true
  })
);

// let todos = {
//   todos: [
//     { id: 0, item: 'Drink coffee', status: 'completed' },
//     { id: 1, item: 'Read the news', status: 'pending' },
//     { id: 2, item: 'Get some exercise', status: 'pending' },
//     { id: 3, item: 'Work on TIY stuff', status: 'pending'}
//   ]
// };

app.get('/', (request,response) => {
  const todoList = request.session.todoList || [];

  const todos = {
    pending: todoList.filter(todo => !todo.completed),
    completed: todoList.filter(todo => todo.completed)
  };
  response.render('home', todos);
});

app.get('/todos', (request, response) => {
  let finishedTasks = todos.todos.filter(todo => todo.status === 'completed');
  let unfinishedTasks = todos.todos.filter(todo => todo.status === 'pending')

  let completionList = {
    completed: [],
    pending: []
  }

  completionList.completed = finishedTasks;
  completionList.pending = unfinishedTasks;

  console.log(todos);
  console.log(completionList);

  response.render('home', completionList);

})

app.post('/newTodo', (request, response) => {

  let newTask = request.body.todo;
  let id = todos.todos.length;
  todos.todos[id] = { id: id, item: newTask, status: 'pending' };
  response.redirect('/todos');
});

app.post('/completedTasks/:id', (request, response) => {
  let id = request.params.id;
  todos.todos[id].status = 'completed';
  response.redirect('/todos');
});

app.post('/notDone/:id', (request, response) => {
  let id = request.params.id;
  todos.todos[id].status = 'pending'
  response.redirect('/todos');
});

app.listen(3000, () => {
  console.log('Listen up port 3000!');
});

const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');

const app = express();

app.use(express.static('public'));

let todos2 = {
  todos2: [
    { id: 0, item: 'Drink coffee', status: 'completed' },
    { id: 1, item: 'Read the news', status: 'pending' },
    { id: 2, item: 'Get some exercise', status: 'pending' },
    { id: 3, item: 'Work on TIY stuff', status: 'pending'}
  ]
};

let todos = {
  completed: [
    'Drink coffee',
    'Read the news',
    'Get some exercise'
  ],
  pending: [
    'Work on TIY stuff',
    'Dinner with sis @ 7p'
  ]
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: false}));

app.engine('mst', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');


app.get('/', (request,response) => {
  response.render('home', todos);
});

app.get('/todos2', (request, response) => {
  let finishedTasks = todos2.todos2.filter(todo => todo.status === 'completed');
  let unfinishedTasks = todos2.todos2.filter(todo => todo.status === 'pending')

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
  let id = todos2.todos2.length;
  todos2.todos2[id] = { id: id, item: newTask, status: 'pending' };
  response.redirect('/todos2');
});

app.post('/completedTasks/:id', (request, response) => {
  let id = request.params.id;
  todos2.todos2[id].status = 'completed';
  response.redirect('/todos2');
});

app.post('/notDone/:id', (request, response) => {
  let id = request.params.id;
  todos2.todos2[id].status = 'pending'
  response.redirect('/todos2');
});

app.listen(3000, () => {
  console.log('Listen up port 3000!');
});

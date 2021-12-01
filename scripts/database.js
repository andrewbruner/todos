const Database = function () {
  this.getTodos = getTodos;
  this.addTodo = addTodo;
  this.toggleTodo = toggleTodo;
  this.deleteTodo = deleteTodo;

  let database;
  if (window.localStorage.getItem('todos') === null) {
    window.localStorage.setItem('todos', '[]');
  }
  database = window.localStorage;

  function getTodos() {
    let todos = database.getItem('todos');
    todos = JSON.parse(todos);
    return todos;
  }

  function addTodo(todoText) {
    let todos = database.getItem('todos');
    todos = JSON.parse(todos);
    let todo = {
      todoText: todoText,
      isCompeted: false,
    };
    todos.push(todo);
    todos = JSON.stringify(todos);
    database.setItem('todos', todos);
  }

  function toggleTodo(index) {
    let todos = database.getItem('todos');
    todos = JSON.parse(todos);
    let todo = todos[index];
    if (todo.isCompleted) {
      todo.isCompleted = false;
    } else {
      todo.isCompleted = true;
    }
    todos = JSON.stringify(todos);
    database.setItem('todos', todos);
  }

  function deleteTodo(index) {
    let todos = database.getItem('todos');
    todos = JSON.parse(todos);
    let deleteCount = 1;
    todos.splice(index, deleteCount);
    todos = JSON.stringify(todos);
    database.setItem('todos', todos);
  }
};

const database = new Database();
export default database;

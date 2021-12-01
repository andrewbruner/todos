import database from './database.js';

const View = function () {
  this.initialize = initialize;
  this.getTodos = getTodos;
  this.addTodo = addTodo;
  this.toggleTodo = toggleTodo;
  this.deleteTodo = deleteTodo;

  function initialize() {
    let appDiv = document.querySelector('#app');
    let todoInput = document.createElement('input');
    todoInput.type = 'text';
    todoInput.placeholder = 'What needs to be done?';
    appDiv.append(todoInput);
    let todoUl = document.createElement('ul');
    appDiv.append(todoUl);
    getTodos();
  }

  function getTodos() {
    let todos = database.getTodos();
    todos.map((todo) => {
      let todoUl = document.querySelector('ul');
      let todoLi = document.createElement('li');
      let todoCheckbox = document.createElement('input');
      todoCheckbox.type = 'checkbox';
      if (todo.isCompleted) {
        todoCheckbox.checked = true;
      }
      todoLi.append(todoCheckbox);
      let todoLabel = document.createElement('label');
      todoLabel.textContent = todo.todoText;
      if (todo.isCompleted) {
        todoLabel.classList.add('isCompleted');
      }
      todoLi.append(todoLabel);
      let todoDeleteButton = document.createElement('button');
      todoDeleteButton.textContent = 'x';
      todoLi.append(todoDeleteButton);
      todoUl.append(todoLi);
    });
  }

  function addTodo() {
    let todos = database.getTodos();
    let todo = todos[todos.length - 1];
    let todoUl = document.querySelector('ul');
    let todoLi = document.createElement('li');
    let todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    todoLi.append(todoCheckbox);
    let todoLabel = document.createElement('label');
    todoLabel.textContent = todo.todoText;
    todoLi.append(todoLabel);
    let todoDeleteButton = document.createElement('button');
    todoDeleteButton.textContent = 'x';
    todoLi.append(todoDeleteButton);
    todoUl.append(todoLi);
  }

  function toggleTodo(index) {
    let todoUl = document.querySelector('ul');
    let todoLi = todoUl.querySelectorAll('li')[index];
    let todoLabel = todoLi.querySelector('label');
    todoLabel.classList.toggle('isCompleted');
  }

  function deleteTodo(index) {
    let todoUl = document.querySelector('ul');
    let todoLi = todoUl.querySelectorAll('li')[index];
    todoLi.remove();
  }
};

const view = new View();
export default view;

import database from './database.js';
import app from './app.js';

const View = function () {
  this.viewTodos = viewTodos;
  this.addTodo = addTodo;
  this.toggleTodo = toggleTodo;
  this.deleteTodo = deleteTodo;

  function createTodo(todo, todoUl) {
    let todoLi = document.createElement('li');
    todoLi.draggable = true;
    todoLi.classList.add('todo');
    todoLi.addEventListener('dragstart', app.dragStartTodo);
    todoLi.addEventListener('drag', app.dragTodo);
    todoLi.addEventListener('dragenter', app.dragEnterTodo);
    todoLi.addEventListener('dragend', app.dragEndTodo);
    let todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    if (todo.isCompleted) {
      todoCheckbox.checked = true;
    }
    todoCheckbox.classList.add('todoCheckbox');
    todoLi.append(todoCheckbox);
    let todoLabel = document.createElement('label');
    todoLabel.textContent = todo.todoText;
    if (todo.isCompleted) {
      todoLabel.classList.add('isCompleted');
    }
    todoLabel.classList.add('todoLabel');
    todoLi.append(todoLabel);
    let todoDeleteButton = document.createElement('button');
    todoDeleteButton.textContent = 'x';
    todoDeleteButton.classList.add('todoDeleteButton');
    todoLi.append(todoDeleteButton);
    todoUl.append(todoLi);
  }

  function viewTodos() {
    document.addEventListener('dragover', app.dragOverTodo);
    let appDiv = document.querySelector('#app');
    let toggleAllCheckbox = document.createElement('input');
    toggleAllCheckbox.type = 'checkbox';
    toggleAllCheckbox.id = 'toggleAllCheckbox';
    toggleAllCheckbox.addEventListener('change', app.toggleAll);
    appDiv.append(toggleAllCheckbox);
    let todoInput = document.createElement('input');
    todoInput.type = 'text';
    todoInput.placeholder = 'What needs to be done?';
    todoInput.id = 'todoInput';
    todoInput.addEventListener('keydown', app.addTodo);
    appDiv.append(todoInput);
    let todoUl = document.createElement('ul');
    todoUl.id = 'todoUl';
    todoUl.addEventListener('change', app.toggleTodo);
    todoUl.addEventListener('click', app.deleteTodo);
    appDiv.append(todoUl);

    let todos = database.getTodos();
    todos.map(todo => {
      createTodo(todo, todoUl);
    });
    updateToggleAllCheckbox();
  }

  function addTodo() {
    let todos = database.getTodos();
    let todo = todos[todos.length - 1];
    let todoUl = document.querySelector('#todoUl');
    createTodo(todo, todoUl);
    updateToggleAllCheckbox();
  }

  function toggleTodo(index) {
    let todoLis = document.querySelectorAll('.todo');
    todoLis = Array.from(todoLis);
    let todoLi = todoLis[index];
    let todoLabel = todoLi.querySelector('.todoLabel');
    todoLabel.classList.toggle('isCompleted');
    updateToggleAllCheckbox();
  }

  function updateToggleAllCheckbox() {
    let toggleAllCheckbox = document.querySelector('#toggleAllCheckbox');
    let todos = database.getTodos();
    if (todos.length) {
      let allTodosAreCompleted = true;
      todos.map(todo => {
        if (!todo.isCompleted) {
          allTodosAreCompleted = false;
        }
      });
      if (allTodosAreCompleted) {
        toggleAllCheckbox.checked = true;
      } else {
        toggleAllCheckbox.checked = false;
      }
    } else {
      toggleAllCheckbox.checked = false;
    }
  }

  function deleteTodo(index) {
    let todoLis = document.querySelectorAll('.todo');
    todoLis = Array.from(todoLis);
    let todoLi = todoLis[index];
    todoLi.remove();
    updateToggleAllCheckbox();
  }
};

const view = new View();
export default view;

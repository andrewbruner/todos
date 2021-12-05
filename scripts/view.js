import database from './database.js';
import handlers from './app.js';

const View = function () {
  this.viewTodos = viewTodos;
  this.addTodo = addTodo;
  this.toggleTodo = toggleTodo;
  this.updateToggleAllCheckbox = updateToggleAllCheckbox;
  this.deleteTodo = deleteTodo;

  function viewTodos() {
    let appDiv = document.querySelector('#app');
    let toggleAllCheckbox = document.createElement('input');
    toggleAllCheckbox.type = 'checkbox';
    toggleAllCheckbox.id = 'toggleAllCheckbox';
    appDiv.append(toggleAllCheckbox);
    let todoInput = document.createElement('input');
    todoInput.type = 'text';
    todoInput.placeholder = 'What needs to be done?';
    todoInput.id = 'todoInput';
    appDiv.append(todoInput);
    let todoUl = document.createElement('ul');
    todoUl.id = 'todoUl';
    appDiv.append(todoUl);
    let todos = database.getTodos();
    todos.map(todo => {
      let todoLi = document.createElement('li');
      todoLi.draggable = true;
      todoLi.classList.add('todo');
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
    });
    updateToggleAllCheckbox();
  }

  function addTodo() {
    let todos = database.getTodos();
    let todo = todos[todos.length - 1];
    let todoUl = document.querySelector('.todoUl');
    let todoLi = document.createElement('li');
    todoLi.draggable = true;
    todoLi.classList.add('todo');
    todoLi.addEventListener('dragstart', handlers.handleDragStartTodo);
    todoLi.addEventListener('drag', handlers.handleDragTodo);
    todoLi.addEventListener('dragenter', handlers.handleDragEnterTodo);
    todoLi.addEventListener('dragend', handlers.handleDragEndTodo);
    let todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    todoCheckbox.classList.add('todoCheckbox');
    todoLi.append(todoCheckbox);
    let todoLabel = document.createElement('label');
    todoLabel.textContent = todo.todoText;
    todoLabel.classList.add('todoLabel');
    todoLi.append(todoLabel);
    let todoDeleteButton = document.createElement('button');
    todoDeleteButton.textContent = 'x';
    todoDeleteButton.classList.add('todoDeleteButton');
    todoLi.append(todoDeleteButton);
    todoUl.append(todoLi);
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

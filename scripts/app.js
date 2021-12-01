import database from './database.js';
import view from './view.js';

view.initialize();

function handleAddTodo(event) {
  if (document.activeElement === todoInput) {
    if (event.key === 'Enter') {
      let todoText = document.activeElement.value;
      document.activeElement.value = '';
      database.addTodo(todoText);
      view.addTodo();
    }
  }
}

function handleToggleTodo(event) {
  let todoLi = event.target.parentElement;
  let todoLis = Array.from(todoUl.children);
  let index = todoLis.indexOf(todoLi);
  database.toggleTodo(index);
  view.toggleTodo(index);
}

function handleDeleteTodo(event) {
  if (event.target.tagName === 'BUTTON') {
    let todoLi = event.target.parentElement;
    let todoLis = Array.from(todoUl.children);
    let index = todoLis.indexOf(todoLi);
    database.deleteTodo(index);
    view.deleteTodo(index);
  }
}

let todoInput = document.querySelector('input');
todoInput.addEventListener('keydown', handleAddTodo);
let todoUl = document.querySelector('ul');
todoUl.addEventListener('change', handleToggleTodo);
todoUl.addEventListener('click', handleDeleteTodo);

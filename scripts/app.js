import database from './database.js';
import view from './view.js';

const App = function() {

  this.addTodo = addTodo;
  this.dragStartTodo = dragStartTodo;
  this.dragTodo = dragTodo;
  this.dragEnterTodo = dragEnterTodo;
  this.dragOverTodo = dragOverTodo;
  this.dragEndTodo = dragEndTodo;
  this.toggleTodo = toggleTodo;
  this.toggleAll = toggleAll;
  this.deleteTodo = deleteTodo;

  function addTodo(event) {
    let todoInput = document.querySelector('#todoInput');
    if (document.activeElement === todoInput) {
      if (event.key === 'Enter') {
        let todoText = document.activeElement.value;
        todoInput.value = '';
        database.addTodo(todoText);
        view.addTodo();
      }
    }
  }
  
  function dragStartTodo(event) {
    let draggedTodo = event.target;
    draggedTodo.classList.toggle('isDragging');
  }

  function dragTodo() {
    let draggedTodo = document.querySelector('.isDragging');
    draggedTodo.style.opacity = '0';
  }

  function dragEnterTodo(event) {
    let todoLis = document.querySelectorAll('.todo');
    todoLis = Array.from(todoLis);
    let draggedTodo = document.querySelector('.isDragging');
    let draggedOverTodo = event.currentTarget;
    let draggedTodoIndex = todoLis.indexOf(draggedTodo);
    let draggedOverTodoIndex = todoLis.indexOf(draggedOverTodo);
    if (draggedTodoIndex < draggedOverTodoIndex) {
      console.log('down');
      draggedTodo.insertAdjacentElement('beforebegin', draggedOverTodo);
      database.moveTodo(draggedTodoIndex, 'down');
    } else if (draggedTodoIndex > draggedOverTodoIndex) {
      draggedTodo.insertAdjacentElement('afterend', draggedOverTodo);
      database.moveTodo(draggedTodoIndex, 'up');
    }
  }

  function dragOverTodo(event) {
    event.preventDefault();
  }

  function dragEndTodo() {
    let draggedTodo = document.querySelector('.isDragging');
    draggedTodo.classList.toggle('isDragging');
    draggedTodo.style.opacity = '1';
  }

  function toggleTodo(event) {
    let todoLi = event.target.parentElement;
    let todoLis = document.querySelectorAll('.todo');
    todoLis = Array.from(todoLis);
    let index = todoLis.indexOf(todoLi);
    database.toggleTodo(index);
    view.toggleTodo(index);
  }

  function toggleAll() {
    let toggleAllCheckbox = document.querySelector('#toggleAllCheckbox');
    let todoLis = document.querySelectorAll('.todo');
    todoLis = Array.from(todoLis);
    if (toggleAllCheckbox.checked) {
      todoLis.map(todoLi => {
        let todoCheckbox = todoLi.querySelector('.todoCheckbox');
        if (!todoCheckbox.checked) {
          todoCheckbox.checked = true;
          let index = todoLis.indexOf(todoLi);
          database.toggleTodo(index);
          view.toggleTodo(index);        
        }
      });
    } else if (!toggleAllCheckbox.checked) {
      todoLis.map(todoLi => {
        let todoCheckbox = todoLi.querySelector('.todoCheckbox');
        if (todoCheckbox.checked) {
          todoCheckbox.checked = false;
          let index = todoLis.indexOf(todoLi);
          database.toggleTodo(index);
          view.toggleTodo(index);
        }
      });
    }
  }

  function deleteTodo(event) {
    if (event.target.tagName === 'BUTTON') {
      let todoLi = event.target.parentElement;
      let todoLis = document.querySelectorAll('.todo');
      todoLis = Array.from(todoUl.children);
      let index = todoLis.indexOf(todoLi);
      database.deleteTodo(index);
      view.deleteTodo(index);
    }
  }
}

const app = new App();
export default app;

view.viewTodos();

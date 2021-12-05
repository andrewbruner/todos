import database from './database.js';
import view from './view.js';

view.viewTodos();

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

let draggedTodo;
function handleDragStartTodo(event) {
  draggedTodo = event.currentTarget;
  draggedTodo.classList.toggle('isDragging');
}

function handleDragTodo(event) {
  event.currentTarget.style.opacity = '0';
}

function handleDragEnterTodo(event) {
  let todoLis = document.querySelectorAll('li');
  todoLis = Array.from(todoLis);
  let draggedOverTodo = event.currentTarget;
  let draggedTodoIndex = todoLis.indexOf(draggedTodo);
  let draggedOverTodoIndex = todoLis.indexOf(draggedOverTodo);
  if (draggedTodoIndex < draggedOverTodoIndex) {
    draggedTodo.insertAdjacentElement('beforebegin', draggedOverTodo);
    database.dragTodo(draggedTodoIndex, 'down');
  } else if (draggedTodoIndex > draggedOverTodoIndex) {
    draggedTodo.insertAdjacentElement('afterend', draggedOverTodo);
    database.dragTodo(draggedTodoIndex, 'up');
  }
}

function handleDragOverTodo(event) {
  event.preventDefault();
}

function handleDragEndTodo(event) {
  draggedTodo.classList.toggle('isDragging');
  event.currentTarget.style.opacity = '1';
}

function handleToggleTodo(event) {
  let todoLi = event.target.parentElement;
  let todoLis = Array.from(todoUl.children);
  let index = todoLis.indexOf(todoLi);
  database.toggleTodo(index);
  view.toggleTodo(index);
}

// Todo: clear ToggleAllCheckbox when adding new todo or unchecking single todo or deleting all current todos
// aka when all todos are completed, the checkbox should be checked and vice versa
function handleToggleAll(event) {
  let toggleAllCheckbox = event.target;
  let todoLis = Array.from(todoUl.children);
  if (toggleAllCheckbox.checked) {
    todoLis.map(todoLi => {
      if (!todoLi.querySelector('input').checked) {
        todoLi.querySelector('input').checked = true;
        let index = todoLis.indexOf(todoLi);
        database.toggleTodo(index);
        view.toggleTodo(index);        
      }
    });
  } else if (!toggleAllCheckbox.checked) {
    todoLis.map(todoLi => {
      if (todoLi.querySelector('input').checked) {
        todoLi.querySelector('input').checked = false;
        let index = todoLis.indexOf(todoLi);
        database.toggleTodo(index);
        view.toggleTodo(index);
      }
    });
  }
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

let todoInput = document.querySelector('input[type="text"]');
todoInput.addEventListener('keydown', handleAddTodo);
let toggleAllCheckbox = document.querySelector('input[type="checkbox"]');
toggleAllCheckbox.addEventListener('change', handleToggleAll);
let todoUl = document.querySelector('ul');
todoUl.addEventListener('change', handleToggleTodo);
todoUl.addEventListener('click', handleDeleteTodo);
let todoLis = document.querySelectorAll('li');
todoLis = Array.from(todoLis);
todoLis.map((todoLi) => {
  todoLi.addEventListener('dragstart', handleDragStartTodo);
  todoLi.addEventListener('drag', handleDragTodo);
  todoLi.addEventListener('dragenter', handleDragEnterTodo);
  todoLi.addEventListener('dragend', handleDragEndTodo);
});
document.addEventListener('dragover', handleDragOverTodo);

const handlers = {
  handleDragStartTodo: handleDragStartTodo,
  handleDragTodo: handleDragTodo,
  handleDragEnterTodo: handleDragEnterTodo,
  handleDragEndTodo: handleDragEndTodo
};
export default handlers;

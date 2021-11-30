const database = window.localStorage;
const appDiv = document.querySelector('#app');
const todoInput = document.createElement('input');
const todoUl = document.createElement('ul');

function initialize() {
  // set up initial page
  todoInput.type = 'text';
  todoInput.placeholder = 'What needs to be done?';
  appDiv.append(todoInput);
  appDiv.append(todoUl);
  // set up initial database
  if (!database.getItem('todos')) {
    database.setItem('todos', '[]');
  }
}

function updateView(action, index) {
  // access database
  const todoArr = JSON.parse(database.getItem('todos'));
  // initial view
  if (action === undefined) {
    todoArr.map((todoObj) => {
      const todoLi = document.createElement('li');
      const todoSpan = document.createElement('span');
      const todoCheckbox = document.createElement('input');
      todoCheckbox.type = 'checkbox';
      if (todoObj.isCompleted) todoCheckbox.checked = true;
      todoSpan.append(todoCheckbox);
      const todoLabel = document.createElement('label');
      todoLabel.textContent = todoObj.todoText;
      if (todoObj.isCompleted) todoLabel.classList.add('isCompleted');
      todoSpan.appendChild(todoLabel);
      todoLi.append(todoSpan);
      const todoDeleteButton = document.createElement('button');
      todoDeleteButton.textContent = 'x';
      todoLi.append(todoDeleteButton);
      todoUl.append(todoLi);
    });
    // after adding todo
  } else if (action === 'add') {
    const todoObj = todoArr[todoArr.length - 1];
    const todoLi = document.createElement('li');
    const todoSpan = document.createElement('span');
    const todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    todoSpan.append(todoCheckbox);
    const todoLabel = document.createElement('label');
    todoLabel.textContent = todoObj.todoText;
    todoSpan.appendChild(todoLabel);
    todoLi.append(todoSpan);
    const todoDeleteButton = document.createElement('button');
    todoDeleteButton.textContent = 'x';
    todoLi.append(todoDeleteButton);
    todoUl.append(todoLi);
    // after toggling todo
  } else if (action === 'toggle') {
    const todoLi = todoUl.querySelectorAll('li')[index];
    const todoLabel = todoLi.firstChild.lastChild;
    todoLabel.classList.toggle('isCompleted');
    // after deleting todo
  } else if (action === 'delete') {
    const todoLi = todoUl.querySelectorAll('li')[index];
    todoLi.remove();
  }
}

function addEventListeners() {
  // todo input
  document.addEventListener('keyup', (event) => {
    if (document.activeElement === todoInput) {
      if (event.key === 'Enter') {
        const todoText = document.activeElement.value;
        document.activeElement.value = '';
        addTodo(todoText);
        updateView('add');
      }
    }
  });
  // checkboxes
  todoUl.addEventListener('change', (event) => {
    const todoLi = event.target.parentNode.parentNode;
    const todoLiArr = Array.from(todoUl.children);
    const index = todoLiArr.indexOf(todoLi);
    toggleTodo(index);
    updateView('toggle', index);
  });
  // delete buttons
  todoUl.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const todoLi = event.target.parentNode;
      const todoLiArr = Array.from(todoUl.children);
      const index = todoLiArr.indexOf(todoLi);
      deleteTodo(index);
      updateView('delete', index);
    }
  });
}

// CRUD functions
function addTodo(todoText) {
  const todoArr = JSON.parse(database.getItem('todos'));
  todoArr.push({ todoText, isCompeted: false });
  database.setItem('todos', JSON.stringify(todoArr));
}
function toggleTodo(index) {
  const todoArr = JSON.parse(database.getItem('todos'));
  const todoObj = todoArr[index];
  if (todoObj.isCompleted) todoObj.isCompleted = false;
  else todoObj.isCompleted = true;
  database.setItem('todos', JSON.stringify(todoArr));
}
function deleteTodo(index) {
  const todoArr = JSON.parse(database.getItem('todos'));
  todoArr.splice(index, 1);
  database.setItem('todos', JSON.stringify(todoArr));
}

initialize();
updateView();
addEventListeners();

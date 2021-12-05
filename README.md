# Todos

**Todos** is a simple todo app.

## Features

- Store database of todos on user's browser localStorage
- Read current or create new database of todos
- Add new todo
- Toggle todo as done
- Delete todo
- Reorganize todos via drag-and-drop (before browser refresh)
- Allow drag-and-drop to update database
- Toggle all todos at once

### Upcoming Features

- Toggle view of all active or completed todos
- Display current number of todos left to be done

## Architecture
app.js
- todoInput - keydown, 'Enter'
- toggleAllCheckbox, change
- todoCheckbox - change
- todoDeleteButton - click
- todoLi - dragStart, drag, dragEnter, dragOver, dragEnd

database.js
- addTodo(todoText)
- toggleTodo(index)
- deleteTodo(index)
- moveTodo(movedTodo, direction)

view.js
- getTodos()
- addTodo(todo)
- toggleTodo(index)
- updateToggleAllCheckbox()
- deleteTodo(index)
- moveTodo(movedTodo, direction)

_Todos is a personal project of [Andrew Bruner](https://github.com/andrewbruner)._

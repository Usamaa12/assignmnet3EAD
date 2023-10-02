const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
      <button onclick="completeTodo(${index})">Complete</button>
      <button onclick="removeTodo(${index})">Remove</button>
    `;
    todoList.appendChild(li);
  });
}

function addTodo(event) {
  event.preventDefault();
  const todoText = todoInput.value;
  if (todoText) {
    const newTodo = { text: todoText, completed: false };
    todos.push(newTodo);
    saveToLocalStorage();
    renderTodos();
    todoInput.value = '';
  }
}

function completeTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveToLocalStorage();
  renderTodos();
}

function removeTodo(index) {
  todos.splice(index, 1);
  saveToLocalStorage();
  renderTodos();
}

todoForm.addEventListener('submit', addTodo);
renderTodos();

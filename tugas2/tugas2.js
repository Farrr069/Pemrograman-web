let todos = [];

function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const todoText = todoInput.value;

  if (todoText === '') {
    alert('Please enter a task!');
    return;
  }

  const todo = {
    id: Date.now(),
    text: todoText,
    isEditing: false,
  };

  todos.push(todo);
  todoInput.value = '';
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

function editTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      todo.isEditing = !todo.isEditing;
    }
    return todo;
  });
  renderTodos();
}

function updateTodoText(id, newText) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      todo.text = newText;
      todo.isEditing = false;
    }
    return todo;
  });
  renderTodos();
}

function renderTodos() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    const todoText = document.createElement('span');

    if (todo.isEditing) {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = todo.text;
      input.addEventListener('blur', () => updateTodoText(todo.id, input.value));
      todoText.appendChild(input);
    } else {
      todoText.textContent = todo.text;
      todoText.classList.add('todo-text');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTodo(todo.id);

    const editBtn = document.createElement('button');
    editBtn.textContent = todo.isEditing ? 'Save' : 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.onclick = () => editTodo(todo.id);

    li.appendChild(todoText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

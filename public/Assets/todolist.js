document.addEventListener('DOMContentLoaded', entireTodoList);

function entireTodoList() {
    const newItemInput = document.getElementById('new-item');
    const addButton = document.getElementById('add-button');
    const searchBar = document.getElementById('search-bar');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos(filteredTodos = todos) {
        todoList.innerHTML = '';
        filteredTodos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.className = `todo-item${todo.done ? ' done' : ''}`;
            listItem.dataset.index = index;
            listItem.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <div class="todo-buttons">
                    <button class="edit-button">
                        <img src="Svg-icons/edit.svg" alt="Edit" />
                    </button>
                    <button class="delete-button">
                        <img src="Svg-icons/delete.svg" alt="Delete" />
                    </button>
                    <button class="up-button">
                        <img src="Svg-icons/up-arrow.svg" alt="Move Up" />
                    </button>
                    <button class="down-button">
                        <img src="Svg-icons/down-arrow.svg" alt="Move Down" />
                    </button>
                    <button class="done-button">
                        <img src="Svg-icons/${todo.done ? 'done' : 'done'}.svg" alt="${todo.done ? 'Undo' : 'Done'}" />
                    </button>
                </div>
            `;
            todoList.appendChild(listItem);
        });
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodo(text) {
        todos.push({ text, done: false });
        saveTodos();
        renderTodos();
    }

    function editTodo(index, newText) {
        todos[index].text = newText;
        saveTodos();
        renderTodos();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    function toggleDone(index) {
        todos[index].done = !todos[index].done;
        saveTodos();
        renderTodos();
    }

    function moveItem(index, direction) {
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < todos.length) {
            const [movedItem] = todos.splice(index, 1);
            todos.splice(newIndex, 0, movedItem);
            saveTodos();
            renderTodos();
        }
    }

    function filterTodos(query) {
        const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(query.toLowerCase()));
        renderTodos(filteredTodos);
    }

    todoList.addEventListener('click', function (event) {
        const index = Number(event.target.closest('.todo-item').dataset.index);
        if (event.target.closest('.edit-button')) {
            const newText = prompt('Edit the task:', todos[index].text);
            if (newText) editTodo(index, newText);
        } else if (event.target.closest('.delete-button')) {
            deleteTodo(index);
        } else if (event.target.closest('.done-button')) {
            toggleDone(index);
        } else if (event.target.closest('.up-button')) {
            moveItem(index, -1);
        } else if (event.target.closest('.down-button')) {
            moveItem(index, 1);
        }
    });

    addButton.addEventListener('click', function () {
        const text = newItemInput.value.trim();
        if (text) {
            addTodo(text);
            newItemInput.value = '';
        }
    });

    searchBar.addEventListener('input', function () {
        const query = searchBar.value.trim();
        filterTodos(query);
    });

    renderTodos();
}








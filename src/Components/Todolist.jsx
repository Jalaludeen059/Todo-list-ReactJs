import React, { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import AddItemsList from './AddItemsList';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  });

  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { text, done: false }]);
  };

  const editTodo = (index, newText) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: newText } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleDone = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newTodos);
  };

  const moveTodo = (index, direction) => {
    const newTodos = [...todos];
    const targetIndex = index + direction;

    if (targetIndex >= 0 && targetIndex < newTodos.length) {
      const [movedTodo] = newTodos.splice(index, 1);
      newTodos.splice(targetIndex, 0, movedTodo);
      setTodos(newTodos);
    }
  };

  const filteredTodos = todos.filter(todo => 
    todo.text && todo.text.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='todo-list-all'>
      <header>
        <h1>Todo-List</h1>
      </header>
      <AddItem addTodo={addTodo} />
      <SearchItem query={query} setQuery={setQuery} />
      <AddItemsList
        todos={filteredTodos}
        onEdit={editTodo}
        onDelete={deleteTodo}
        onToggleDone={toggleDone}
        onMove={moveTodo}
      />
    </div>
  );
};

export default TodoList;

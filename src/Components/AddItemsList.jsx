import React from 'react';

const AddItemsList = ({ todos, onEdit, onDelete, onToggleDone, onMove }) => {
  if (!todos || !Array.isArray(todos)) {
    return <p>No todos available</p>;
  }

  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th>Task</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index} className="todo-row">
            <td className={`todo-text ${todo.done ? 'done' : ''}`}>{todo.text}</td>
            <td className="todo-buttons">
              <button className="edit-button" onClick={() => onEdit(index)}>
                <img src="Assets/edit.svg" alt="Edit" />
              </button>
              <button className="delete-button" onClick={() => onDelete(index)}>
                <img src="Assets/delete.svg" alt="Delete" />
              </button>
              <button className="up-button" onClick={() => onMove(index, -1)}>
                <img src="Assets/up-arrow.svg" alt="Move Up" />
              </button>
              <button className="down-button" onClick={() => onMove(index, 1)}>
                <img src="Assets/down-arrow.svg" alt="Move Down" />
              </button>
              <button className="done-button" onClick={() => onToggleDone(index)}>
                <img src={`Assets/${todo.done ? 'done' : 'not-done'}.svg`} alt={todo.done ? 'Undo' : 'Done'} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AddItemsList;

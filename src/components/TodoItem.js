import React, { useState } from 'react';

const TodoItem = ({ todo, removeHandler, updateTodo }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [completed, setCompleted] = useState(todo.completed);
  const today = new Date().toISOString().slice(0, 10);

  // Check if the due date is today or in the past
  const overdue = dueDate <= today ? true : false;

  // Set style for the finish date based on whether it's on or before the due date
  const finishDateStyle = completed
    ? new Date(todo.finishDate) <= new Date(dueDate)
      ? { color: 'green' }
      : { color: 'red' }
    : {};

  function handleSave(e) {
    e.preventDefault();
    setEditing(false);
    updateTodo({
      ...todo,
      title,
      dueDate,
    });
  }

  return (
    <div className={`todo-item ${overdue ? 'overdue' : ''}`}>
      <div className="todo-item-title">
        {!editing ? (
          <>
            <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
            <span
              className={`title-text ${completed ? 'completed' : ''}`}
            >
              {title}
            </span>
            {!completed && (
              <span className="due-date" style={{ color: overdue ? 'red' : 'black' }}>
                {dueDate}
              </span>
            )}
            {completed && (
              <span className="finish-date" style={finishDateStyle}>
                {todo.finishDate}
              </span>
            )}
            <button onClick={() => setEditing(true)}>Edit</button>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <button type="submit">Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </form>
        )}
      </div>
      <div className="todo-item-delete">
        <button onClick={() => removeHandler(todo.id)}>X</button>
      </div>
    </div>
  );
};

export default TodoItem;

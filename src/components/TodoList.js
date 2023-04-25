import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, removeHandler, updateTodo, toggleCompleted }) => {
return (
<div className="todo-list">
{todos.map((t) => (
<TodoItem key={t.id} todo={t} removeHandler={removeHandler} updateTodo={updateTodo} toggleCompleted={toggleCompleted} />
))}
</div>
);
};

export default TodoList;


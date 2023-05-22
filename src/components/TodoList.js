import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }) => {
  function removeHandler(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function updateTodo(updatedTodo) {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeHandler={removeHandler}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;

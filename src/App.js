import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) =>
        setTodos(
          data.map((d) => ({
            id: d.id,
            title: d.title,
            completed: d.completed,
            dueDate: '',
            finishDate: '',
          }))
        )
      )
      .finally(() => setLoading(false));
  }, []);

  function addTodo() {
    const newId = todos.length + 1;
    setTodos([...todos, { id: newId, title: newTodoTitle, completed: false }]);
    setNewTodoTitle('');
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="Enter todo item"
      />
      <button onClick={addTodo}>Add new todo</button>
      {!loading ? (
        <TodoList todos={todos} setTodos={setTodos} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

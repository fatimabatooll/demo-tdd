import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import './App.css';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [saving, setSaving] = useState(false);

  function onChange(e) {
    const value = e.target.value;
    setNewTodo(value);
  }

  function removeTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function updateTodo(updatedTodo) {
    setLoading(true);
    const newList = todos.map((todoItem) => {
      if (todoItem.id === updatedTodo.id) {
        return updatedTodo;
      }
      return todoItem;
    });
    setTodos(newList);
    setLoading(false);
  }

  function toggleCompleted(id) {
    setLoading(true);
    const newList = todos.map((todoItem) => {
      if (todoItem.id === id) {
        return {
          ...todoItem,
          completed: !todoItem.completed,
          finishDate: !todoItem.completed ? new Date().toISOString().slice(0, 10) : '',
        };
      }
      return todoItem;
    });
    setTodos(newList);
    setLoading(false);
  }

  function addTodo() {
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTodo,
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10), // Today's date by default
      finishDate: '',
    };

    setSaving(true);
    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTodos(todos.concat({ ...result, id: value.id }));
        setSaving(false);
      });
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(process.env.REACT_APP_API_URL).then((response) => response.json());
      setTodos(result.slice(0, 5));
      setLoading(false);
    }
    fetchData();
  }, []);

  // Sort todos by due date
  todos.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));

  return (
    <div className="App">
      <h1 className="header">My todo list</h1>
      {loading ? (
        'Loading'
      ) : (
        <TodoList
          todos={todos}
          removeHandler={removeTodo}
          updateTodo={updateTodo}
          toggleCompleted={toggleCompleted}
        />
      )}

      <div className="add-todo-form">
        {saving ? (
          'Saving'
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            addTodo();
            setNewTodo('');
          }}>
            <input type="text" value={newTodo} onChange={onChange} data-testid="new-todo-input" />
            <button type="submit" data-testid="add-todo-btn">Add new todo</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // تحميل المهام من localStorage عند تحميل الصفحة
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedCompleted = localStorage.getItem("completed");

    // التأكد من أن البيانات في localStorage موجودة وصحيحة
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error("Error parsing todos from localStorage", error);
        setTodos([]);
      }
    }

    if (storedCompleted) {
      try {
        setCompleted(JSON.parse(storedCompleted));
      } catch (error) {
        console.error("Error parsing completed tasks from localStorage", error);
        setCompleted([]);
      }
    }
  }, []);

  // حفظ المهام و الوضع في localStorage عند التحديث
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    if (completed.length > 0) {
      localStorage.setItem("completed", JSON.stringify(completed));
    }
  }, [todos, completed]);

  // حفظ الوضع في localStorage عند تغييره
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim() && !todos.some((t) => t === task)) {
      setTodos((prevTodos) => [...prevTodos, task]);
      setTask("");
    } else {
      alert("Please enter a unique task.");
    }
  };

  const handleCompleteTask = (task) => {
    setTodos(todos.filter((t) => t !== task));
    setCompleted((prevCompleted) => [...prevCompleted, task]);
  };

  const handleUndoTask = (task) => {
    setCompleted(completed.filter((t) => t !== task));
    setTodos((prevTodos) => [...prevTodos, task]);
  };

  const handleClearCompleted = () => {
    setCompleted([]);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`todo-app ${theme}`}>
      <div className="theme-overlay">
        <h1 className="header-title">Todo App</h1>
        <form className="form" onSubmit={handleAddTask}>
          <input
            className="input"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button className="button" type="submit">
            Add
          </button>
        </form>
        <div className="list-section">
          <div className="list">
            <h2>Pending Tasks</h2>
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  {todo}
                  <button
                    className="button"
                    onClick={() => handleCompleteTask(todo)}
                  >
                    Complete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="list">
            <h2>Completed Tasks</h2>
            <ul>
              {completed.map((todo, index) => (
                <li key={index}>
                  {todo}
                  <button
                    className="button"
                    onClick={() => handleUndoTask(todo)}
                  >
                    Undo
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {completed.length > 0 && (
          <button className="clear-button" onClick={handleClearCompleted}>
            Clear Completed
          </button>
        )}
        <button className="toggle-button" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

export default App;

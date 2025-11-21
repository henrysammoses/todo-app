import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      setLoggedIn(true);
    } else {
      alert("Invalid login details!");
    }
  };

  const addTask = () => {
    if (task.trim() === "") return;

    if (editIndex > -1) {
      const updated = tasks.map((t, i) => (i === editIndex ? task : t));
      setTasks(updated);
      setEditIndex(-1);
      setTask("");
      return;
    }

    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div>
      {/* LOGIN PAGE */}
      {!loggedIn && (
        <div className="loginContainer">
          <h1 className="loginTitle">Login</h1>

          <input
            className="loginInput"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="loginInput"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="loginButton" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}

      {/* TO-DO LIST PAGE */}
      {loggedIn && (
        <div className="container">
          <h1>To-Do List</h1>

          <div className="inputTag">
            <input
              className="input"
              type="text"
              placeholder="Enter task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />

            <button className="addButton" onClick={addTask}>
              {editIndex > -1 ? "Update" : "Add"}
            </button>
          </div>

          <ul className="taskList">
            {tasks.map((t, index) => (
              <li key={index}>
                {t}

                <div>
                  <button className="editButton" onClick={() => editTask(index)}>
                    Edit
                  </button>

                  <button
                    className="deleteButton"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
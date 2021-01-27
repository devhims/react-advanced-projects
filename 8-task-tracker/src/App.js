import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

const url = 'http://localhost:5000/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const getTasks = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data) {
      setTasks(data);
    } else {
      setTasks([]);
    }
  };

  const getTask = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getTasks(url);
  }, []);

  const deleteTask = async (idToRemove) => {
    await fetch(`${url}/${idToRemove}`, {
      method: 'DELETE',
    });

    getTasks(url);

    // const newTask = tasks.filter((task) => {
    //   return task.id !== idToRemove;
    // });
    // setTasks(newTask);
  };

  const toggleReminder = async (id) => {
    const task = await getTask(`${url}/${id}`);
    const updatedTask = { ...task, reminder: !task.reminder };

    await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    getTasks(url);
    // const newTasks = tasks.map((task) =>
    //   task.id === id ? { ...task, reminder: !task.reminder } : task
    // );

    // setTasks(newTasks);
  };

  const addTask = async (task) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    getTasks(url);

    // const id = tasks.length + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          onTap={() => setShowForm(!showForm)}
          showForm={showForm}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showForm && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks Available'
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;

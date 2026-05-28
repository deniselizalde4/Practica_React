import { Item } from './js/Item';
import { Button } from './js/Button';
import './App.css';
import React from 'react';
import { TodoList } from './js/TodoList';
import { Header } from './js/Header';
import { Search } from './js/Search';

function App() {
  
  const API_URL = 'http://localhost/ReactServices/Service.php';

  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');

  const loadTasks = async () => {
    try {
      const response = await fetch(API_URL, {
        credentials: 'include'
      });

      const data = await response.json();

      const fixedTasks = data.map((task) => ({
        ...task,
        completed:
          task.completed === true ||
          task.completed === 1 ||
          task.completed === '1' ||
          task.completed === 'true'
      }));

      setTasks(fixedTasks);
    } catch (error) {
      console.error('Error al consumir el servicio:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadTasks();
  }, []);

  const numberTaskCompleted = tasks.filter((task) => task.completed).length;

  const totalTask = tasks.length;

  const searchTodos = tasks.filter((task) => {
    return task.text.toLowerCase().includes(searchValue.toLowerCase());
  });

  const completedTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        };
      }

      return task;
    });

    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const addTask = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      const newTask = await response.json();

      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  return (
    <React.Fragment>
      <Header completed={numberTaskCompleted} total={totalTask} />

      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {loading && <p>Cargando tareas...</p>}

      <TodoList>
        {searchTodos.map((task) => (
          <Item
            key={task.id}
            text={task.text}
            completed={task.completed}
            onCompleted={() => completedTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </TodoList>

      <Button addTask={addTask} />
    </React.Fragment>
  );
}

export default App;
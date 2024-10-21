import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import TaskForm from './components/TaskForm';
import { Task } from './types/Task';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <TaskForm addTask={addTask} />
      <KanbanBoard tasks={tasks} setTasks={setTasks} deleteTask={deleteTask} />
    </div>
  );
};

export default App;

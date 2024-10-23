import React, { useState, useEffect } from 'react';
import KanbanBoard from '../../components/KanbanBoard';
import TaskForm from '../../components/TaskForm';
import Login from '../Login/Login'; 
import { Task } from '../../types/Task';

import './Home.css';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home">
      <h1>Kanban Board</h1>
      <TaskForm addTask={addTask} />
      <KanbanBoard tasks={tasks} setTasks={setTasks} deleteTask={deleteTask} />

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

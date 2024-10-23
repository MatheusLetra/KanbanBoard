import React from 'react';
import { Task } from '../types/Task';
import Card from './Card';

interface ColumnProps {
  status: Task['status'];
  tasks: Task[];
  updateTaskStatus: (id: number, newStatus: Task['status']) => void;
  deleteTask: (id: number) => void;
}

const Column: React.FC<ColumnProps> = ({ status, tasks, updateTaskStatus, deleteTask }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      updateTaskStatus(parseInt(taskId), status);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="column" onDrop={handleDrop} onDragOver={handleDragOver}>
      <h2>{status}</h2>
      {tasks.map((task) => (
        <Card
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          onDragStart={() => {}}
        />
      ))}
    </div>
  );
};

export default Column;

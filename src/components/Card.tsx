import React, { useRef } from 'react';
import { Task } from '../types/Task';

interface CardProps {
  task: Task;
  deleteTask: (id: number) => void;
  onDragStart: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ task, deleteTask, onDragStart }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id.toString());
    onDragStart(task.id);
  };

  const handleTouchStart = () => {
    onDragStart(task.id);
  };

  const formatDate = (dateString: string) => {
    const dateParts = dateString.split('-');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // dd/mm/yyyy
  };

  return (
    <div 
      className="card" 
      style={{ backgroundColor: task.color }} 
      draggable 
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      ref={cardRef}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.deadline && task.time && (
        <>
          <p>{formatDate(task.deadline)}</p>
          <p>{task.time}</p>
        </>
      )}
      <button onClick={handleDelete} style={{ marginTop: '8px', color: 'red' }}>
        Excluir
      </button>
    </div>
  );
};

export default Card;

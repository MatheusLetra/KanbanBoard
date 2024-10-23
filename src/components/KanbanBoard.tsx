import React from 'react';
import { Task } from '../types/Task';
import Column from './Column';

interface KanbanBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  deleteTask: (id: number) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, setTasks, deleteTask }) => {
  const updateTaskStatus = (id: number, newStatus: Task['status']) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="kanban-board">
      {['A Fazer', 'Em Progresso', 'Concluído'].map((status) => (
        <Column
          key={status}
          status={status as Task['status']}
          tasks={tasks.filter((task) => task.status === status)}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;

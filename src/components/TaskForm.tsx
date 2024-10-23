import React, { useState } from 'react';
import { Task } from '../types/Task';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#FFD700');
  const [deadline, setDeadline] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formato yyyy-mm-dd
  });
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().split(' ')[0].substring(0, 5); // Formato HH:mm
  });
  const [status, setStatus] = useState<Task['status']>('A Fazer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      color,
      deadline,
      time,
      status,
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
    setColor('#FFD700');
    setDeadline(new Date().toISOString().split('T')[0]);
    setTime(new Date().toTimeString().split(' ')[0].substring(0, 5));
    setStatus('A Fazer');
  };

  const colors = ['#FFD700', '#FF6347', '#4682B4', '#32CD32', '#8A2BE2'];

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="color-picker">
        {colors.map((colorOption) => (
          <div
            key={colorOption}
            className={`color-option ${color === colorOption ? 'selected' : ''}`}
            style={{ backgroundColor: colorOption }}
            onClick={() => setColor(colorOption)}
          />
        ))}
      </div>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as Task['status'])}>
        <option value="A Fazer">A Fazer</option>
        <option value="Em Progresso">Em Progresso</option>
        <option value="Concluído">Concluído</option>
      </select>
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TaskForm;
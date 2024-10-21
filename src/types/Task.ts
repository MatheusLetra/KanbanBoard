export interface Task {
    id: number;
    title: string;
    description: string;
    color: string;
    deadline: string;
    time: string;
    status: 'A Fazer' | 'Em Progresso' | 'Concluído';
  }
  
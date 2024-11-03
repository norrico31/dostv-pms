/// <reference types="vite/client" />

type BoardTask = {
  title: string;
  description: string;
  status: string;
  subtasks: BoardSubtask[];
  id: string;
};

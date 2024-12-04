/// <reference types="vite/client" />

type BoardTask = {
  title: string;
  description: string;
  status: string;
  subtasks: BoardSubtask[];
  id: string;
};


type User = {
  token: string
  user: {
    age: number
    createdAt: string
    deletedAt: null | string
    email: string
    firstName: string
    id: number
    lastActiveAt: string | null
    lastName: string
    updatedAt: string
  }
}
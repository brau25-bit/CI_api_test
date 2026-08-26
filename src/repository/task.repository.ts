import { Task } from "../models/task.js";

export interface TaskRepository {
    getTasks(): Promise<Task[] | null>;
    getTaskById(id: string): Promise<Task | null>;
    updateTask(id: string, name: string): Promise<Task | null>;
    deleteTask(id: string): Promise<Task | null>;
    createTask(name: string): Promise<Task | null>;
}
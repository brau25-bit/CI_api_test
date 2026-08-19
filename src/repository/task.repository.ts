import { Task } from "../models/task.js";

export interface TaskRepository {
    getTasks(): Promise<Task[] | null>;
    getTaskById(id: string): Promise<Task | null>;
    /*updateTask(): Promise<Task>;
    deleteTask(): Promise<Task>;
    createTask(): Promise<Task>;*/
}
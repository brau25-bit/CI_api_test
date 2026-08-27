import { Task } from "../models/task.js"

export interface TaskService{
    getTasks(): Promise<Task[]>,
    getTaskById(id: string): Promise<Task>,
    updateTask(id: string, name: string): Promise<Task>,
    deleteTask(id: string): Promise<Task>,
    createTask(name: string): Promise<Task>
}
import { Task } from "../models/task.js";
import { Repository } from "../repository/repository.js";
import { TaskRepository } from "../repository/task.repository.js";

export class Service {

    constructor(private readonly repository: TaskRepository){}
    
    async getTasks(): Promise<Task[]>{

        const tasks = await this.repository.getTasks();
        
        if(!tasks) throw new Error("Not found");

        return tasks;
    }

    async getTaskById(id: string): Promise<Task>{
        if(!id || typeof id !== 'string') throw new Error("No id or type of id is different");

        const task = await this.repository.getTaskById(id);

        if(!task) throw new Error("Not found");

        return task;
    }

    async updateTask(id: string, name: string): Promise<Task>{
        if(!id || typeof id !== 'string') throw new Error("Bad request: invalid id");

        if(!name || typeof name !== 'string') throw new Error("Bad request: invalid name");

        const modified_task = await this.repository.updateTask(id, name);

        if(!modified_task) throw new Error("Error ocurred");

        return modified_task;
    }

    async deleteTask(id: string){
        
    }

    async createTask(id: string){
        
    }
}
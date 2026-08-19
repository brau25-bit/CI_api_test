import { queryObjects } from "node:v8";
import { Connection } from "../db/db.js";
import { Task } from "../models/task.js";
import { TaskRepository } from "./task.repository.js";

export class Repository implements TaskRepository{
    private readonly connection: Connection

    constructor(){
        this.connection = new Connection();
    }

    async getTasks(): Promise<Task[] | null>{
        const query: string = `
            SELECT * FROM task 
        `;

        const params: unknown[] = [];

        const result = await this.connection.query<Task>(query, params);

        if(result.rowCount === 0) throw new Error("not found");

        return result.rows;
    } 

    async getTaskById(id: string): Promise<Task | null>{
        const query: string = `
            SELECT * FROM task
            WHERE(id)=$1
        `;

        const params: unknown[] = [id];

        const result = await this.connection.query<Task>(query, params);

        if(result.rowCount === 0) throw new Error(`task with id: ${id} not found`)

        return result.rows[0]!
    }

    /*static async UpdateTask(): Promise<Task>{

    }

    static async DeleteTask(): Promise<Task>{

    }

    static async createTask(): Promise<Task>{

    }*/
}
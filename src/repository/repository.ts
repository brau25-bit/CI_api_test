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

        if(result.rowCount === 0) return null;

        return result.rows;
    } 

    async getTaskById(id: string): Promise<Task | null>{
        const query: string = `
            SELECT * FROM task
            WHERE(id)=$1
        `;

        const params: unknown[] = [id];

        const result = await this.connection.query<Task>(query, params);

        if(result.rowCount === 0) return null;

        return result.rows[0]!
    }

    async updateTask(id: string, name: string): Promise<Task | null>{
        const query = `
            UPDATE task
            SET name = $2
            WHERE id = $1
            RETURNING *
        `;

        const params: unknown[] = [id, name];

        const result = await this.connection.query<Task>(query, params);

        if(result.rowCount === 0) return null;

        return result.rows[0]!;
    }

    async deleteTask(id: string): Promise<Task | null>{
        const query: string = `
            DELETE * FROM task 
            WHERE id = $1
            RETURNING *
        `;

        const params: unknown[] = [id];

        const result = await this.connection.query<Task>(query, params);

        if(result.rowCount === 0) return null;

        return result.rows[0]!
    }

    async createTask(name: string): Promise<Task | null>{
        const query: string = `
            INSERT INTO task(name)
            VALUES ($1)
            RETURNING *
        `;

        const params: unknown[] = [name];

        const result = await this.connection.query<Task>(query, params);
        
        if(result.rowCount === 0) return null;

        return result.rows[0]!
    }
}
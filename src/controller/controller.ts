import { Request, Response, NextFunction } from "express";

import { TaskService } from "../service/task.service.js";

export class Controller {

    constructor(private readonly service: TaskService){}

    async getTasks(req: Request, res: Response, next: NextFunction){
        try {
             const result = await this.service.getTasks();

             res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getTaskById(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params
            
            const result = await this.service.getTaskById(id as string);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;

            const {name} = req.query;
            
            const result = await this.service.updateTask(id as string, name as string);

            res.status(200).json(result)
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params

            const result = await this.service.deleteTask(id as string);

            res.status(200).json(result)
        } catch (error) {
            next(error);
        }
    }

    async createTask(req: Request, res: Response, next: NextFunction){
        try {
            const {name} = req.query

            const result = await this.service.createTask(name as string);

            res.status(201).json(result)
        } catch (error) {
            next(error);
        }
    }
}
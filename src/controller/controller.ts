import { Request, Response, NextFunction } from "express";

import { Service } from "../service/service.js";

export class Controller {

    constructor(private readonly service: Service){}

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

            console.log(req.body);

            const {name} = req.body;
            
            const result = await this.service.updateTask(id as string, name);

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
            const {name} = req.body

            const result = await this.service.createTask(name);

            res.status(201).json(result)
        } catch (error) {
            next(error);
        }
    }
}
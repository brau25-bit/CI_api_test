import { Router } from "express";

import { Controller } from "../controller/controller.js";

export function router(controller: Controller){
    const taskRouter: Router = Router();

    taskRouter.get('/', controller.getTasks.bind(controller));

    taskRouter.get('/:id', controller.getTaskById.bind(controller));

    taskRouter.patch('/', controller.updateTask.bind(controller));

    taskRouter.delete('', controller.deleteTask.bind(controller));

    taskRouter.post('/', controller.createTask.bind(controller));

    return taskRouter;
}
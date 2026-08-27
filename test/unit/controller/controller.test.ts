import { describe, it, jest, expect } from "@jest/globals";

import { Controller } from '../../../src/controller/controller.ts';
import { Task } from "../../../src/models/task.ts";

import { Request, Response, NextFunction } from "express";

const task = {
    id: "12345678",
    name: "Learning jest",
    createdAt: "2026-08-19T04:38:23.501Z"
}

const getTasks = jest.fn<() => Promise<Task[]>>();
const getTaskById = jest.fn<(id: string) => Promise<Task>>();
const updateTask =  jest.fn<(id: string, name: string) => Promise<Task>>(); 
const deleteTask = jest.fn<(id: string) => Promise<Task>>();
const createTask =  jest.fn<(name: string) => Promise<Task>>();

const service = {
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    createTask,
}

const req = {
    params: {id: task.id},
    query: {name: task.name}
} as unknown as Request;

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

const next = jest.fn() as NextFunction;


describe("TaskController.getTasks", () => {
    it("Returns all tasks", async () => {
        getTasks.mockResolvedValue([task]);

        const controller = new Controller(service);

        await controller.getTasks(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([task]);
        expect(next).not.toHaveBeenCalled();
    });
});

describe("TaskController.getTaskById", () => {
    it("Returns especific task", async () => {
        getTaskById.mockResolvedValue(task);

        const controller = new Controller(service);

        await controller.getTaskById(req, res, next);

        expect(getTaskById).toHaveBeenCalledWith(task.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(task);
        expect(next).not.toHaveBeenCalled();
    });
});

describe("TaskController.updateTask", () => {
    it("Returns modified task", async () => {
        updateTask.mockResolvedValue(task);

        const controller = new Controller(service);

        await controller.updateTask(req, res, next);

        expect(updateTask).toHaveBeenCalledWith(task.id, task.name);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(task);
        expect(next).not.toHaveBeenCalled();
    });
});

describe("TaskController.deleteTask", () => {
    it("Returns deleted task", async () => {
        deleteTask.mockResolvedValue(task);

        const controller = new Controller(service);

        await controller.deleteTask(req, res, next);

        expect(deleteTask).toHaveBeenCalledWith(task.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(task);
        expect(next).not.toHaveBeenCalled();
    });
});

describe("TaskController.createTask", () => {
    it("Returns created task", async () => {
        createTask.mockResolvedValue(task);

        const controller = new Controller(service);

        await controller.createTask(req, res, next);

        expect(createTask).toHaveBeenCalledWith(task.name);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(task);
        expect(next).not.toHaveBeenCalled();
    });
});
import {describe, it, expect, jest} from '@jest/globals';

import { Service } from '../../../src/service/service.ts';
import { Task } from '../../../src/models/task.ts';

const task = {
    id: '12345678',
    name: 'Learning jest',
    createdAt: '2026-08-19T04:38:23.501Z'
}

const secondTask = {
    id: '87654321',
    name: 'Testing jest',
    createdAt: '2026-08-20T04:38:23.501Z'
}

const tasks = [task, secondTask];

const getTaskById = jest.fn<(id: string) => Promise<Task | null>>();
const getTasks = jest.fn<() => Promise<Task[] | null>>();
const updateTask = jest.fn<(id: string, name: string) => Promise<Task | null>>();

const repository = {
    getTaskById,
    getTasks,
    updateTask
}

describe("TaskService.getTask", () => {
    it("Should return a task", async() => {

        getTaskById.mockResolvedValue(task);

        const service = new Service(repository);

        const result = await service.getTaskById('12345678');

        expect(result).toEqual(task);
    });

    it("No id provided", async () => {
        getTaskById.mockResolvedValue(task);

        const service = new Service(repository);

        expect(
            service.getTaskById('')
        ).rejects.toThrow('No id or type of id is different');
    });

    it("No task found", async () => {
        getTaskById.mockResolvedValue(null);

        const service = new Service(repository);

        expect(getTaskById).toHaveBeenCalledWith("12345678")

        expect(
            service.getTaskById('12345678')
        ).rejects.toThrow("Not found")
    })
});

describe("TaskService.getTasks", () => {
    it("Returns list of tasks", async () => {
        getTasks.mockResolvedValue(tasks);

        const service = new Service(repository);

        const result = await service.getTasks()

        expect(result).toEqual(tasks);
    });

    it("Returns an empty list", async () => {
        getTasks.mockResolvedValue(null);

        const service = new Service(repository);

        expect(
            service.getTasks()
        ).rejects.toThrow("Not found");
    });
})


describe("TaskService.updateTask", () => {
    it("Modifies especified task", async () => {
        updateTask.mockResolvedValue(task);

        const service = new Service(repository);

        const result = await service.updateTask("12345678", "Learning jest");

        expect(updateTask).toHaveBeenCalledWith(
            "12345678",
            "Learning jest"
        );

        expect(
            result
        ).toEqual(task);
    });

    it("Throws if not found", () => {
        updateTask.mockResolvedValue(null)

        const service = new Service(repository);

        expect(
            service.updateTask("123456", "new task")
        ).rejects.toThrow("Error ocurred")
    })

    it("throws if id is invalid", () => {
        const service = new Service(repository);

        expect(
            service.updateTask("", "new task")
        ).rejects.toThrow("Bad request: invalid id");
    });

    it("Throws if name is invalid", () => {
        const service = new Service(repository);

        expect(
            service.updateTask("12345678", "")
        ).rejects.toThrow("Bad request: invalid name")
    })
})
import {describe, it, expect, jest} from '@jest/globals';

import { Service } from '../../../src/service/service.ts';
import { Task } from '../../../src/models/task.ts';
import { exec } from 'node:child_process';

const task = {
    id: '12345678',
    name: 'Learning jest',
    createdAt: '2026-08-19T04:38:23.501Z'
}

const getTaskById = jest.fn<(id: string) => Promise<Task | null>>();
const getTasks = jest.fn<() => Promise<Task[]>>();

const repository = {
    getTaskById,
    getTasks
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

        expect(
            service.getTaskById('12345678')
        ).rejects.toThrow("Not found")
    })
})
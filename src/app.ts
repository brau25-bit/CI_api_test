import express, { Express } from "express";
import cors from 'cors';

import { router } from "./routes/routes.js";
import { Controller } from "./controller/controller.js";
import { Service } from "./service/service.js";
import { Repository } from "./repository/repository.js";

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

const app: Express = express();

app.use(express.json())

app.use(cors());

app.use('/api/test', router(controller));

//app.use();

export default app;
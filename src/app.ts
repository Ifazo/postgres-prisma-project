import express, { Application } from "express";
import router from "./router/routes";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app: Application = express();

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;

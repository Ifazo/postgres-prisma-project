import express, { Application } from "express";
import router from "./router/routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

export default app;

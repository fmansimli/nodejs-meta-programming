import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { AppConfig } from "./config";
import { catch404, catchError } from "./middlewares/error";

const app = express();

AppConfig.init();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(catch404);
app.use(catchError);

export default app;

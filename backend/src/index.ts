import express, { json } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import cors from "cors";

import { phoneBookEntriesRouter } from "./routes/phone-book-entries.routes";

const app = express();

app.use(json());

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/phone-book", phoneBookEntriesRouter);

export { app };

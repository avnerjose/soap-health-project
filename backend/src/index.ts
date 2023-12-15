import express, { json } from "express";
import cors from "cors";

import { phoneBookEntriesRouter } from "./routes/phone-book-entries.routes";

const app = express();

app.use(json());

app.use(cors());

app.use("/phone-book", phoneBookEntriesRouter);

export { app };

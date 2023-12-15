import express, { json } from "express";
import { phoneBookEntriesRouter } from "./routes/phone-book-entries.routes";

const app = express();

app.use(json());

app.use("/phone-book", phoneBookEntriesRouter);

export { app };

import { Router } from "express";
import { createPhoneBookEntryController } from "../modules/phone-book/use-cases/createPhoneBookEntry";

const phoneBookEntriesRouter = Router();

phoneBookEntriesRouter.post("/", (req, res) =>
  createPhoneBookEntryController.handle(req, res)
);

export { phoneBookEntriesRouter };

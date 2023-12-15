import { Router } from "express";
import { createPhoneBookEntryController } from "../modules/phone-book/use-cases/createPhoneBookEntry";
import { listAllPhoneEntriesController } from "../modules/phone-book/use-cases/listAllPhoneEntries";
import { updatePhoneBookEntryController } from "../modules/phone-book/use-cases/updatePhoneBookEntry";

const phoneBookEntriesRouter = Router();

phoneBookEntriesRouter.post("/", (req, res) =>
  createPhoneBookEntryController.handle(req, res)
);

phoneBookEntriesRouter.get("/", (req, res) =>
  listAllPhoneEntriesController.handle(req, res)
);

phoneBookEntriesRouter.put("/:id", (req, res) =>
  updatePhoneBookEntryController.handle(req, res)
);

export { phoneBookEntriesRouter };

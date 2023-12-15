import { Request, Response } from "express";
import { ListAllPhoneEntriesUseCase } from "./ListAllPhoneEntries.usecase";

class ListAllPhoneEntriesController {
  constructor(
    private listAllPhoneEntriesUseCase: ListAllPhoneEntriesUseCase
  ) {}

  handle(req: Request, res: Response) {
    try {
      const phoneBookEntries = this.listAllPhoneEntriesUseCase.execute();

      return res.status(201).json(phoneBookEntries);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { ListAllPhoneEntriesController };

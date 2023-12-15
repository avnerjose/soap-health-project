import { Request, Response } from "express";
import { CreatePhoneBookEntryUseCase } from "./CreatePhoneBookEntry.usecase";

class CreatePhoneBookEntryController {
  constructor(
    private createPhoneBookEntryUseCase: CreatePhoneBookEntryUseCase
  ) {}

  handle(req: Request, res: Response) {
    const { firstName, lastName, phone } = req.body;

    try {
      const phoneBookEntry = this.createPhoneBookEntryUseCase.execute({
        firstName,
        lastName,
        phone,
      });

      return res.status(201).json(phoneBookEntry);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { CreatePhoneBookEntryController };

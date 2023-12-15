import { Request, Response } from "express";
import { UpdatePhoneBookEntryUseCase } from "./UpdatePhoneBookEntry.usecase";

class UpdatePhoneBookEntryController {
  constructor(
    private updatePhoneBookEntryUseCase: UpdatePhoneBookEntryUseCase
  ) {}

  handle(req: Request, res: Response) {
    const { firstName, lastName, phone } = req.body;
    const { id } = req.params;

    try {
      const phoneBookEntry = this.updatePhoneBookEntryUseCase.execute({
        id,
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

export { UpdatePhoneBookEntryController };

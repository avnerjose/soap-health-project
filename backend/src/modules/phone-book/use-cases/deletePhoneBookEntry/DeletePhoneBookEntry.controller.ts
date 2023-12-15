import { Request, Response } from "express";
import { DeletePhoneBookEntryUseCase } from "./DeletePhoneBookEntry.usecase";

class DeletePhoneBookEntryController {
  constructor(
    private deletePhoneBookEntryUseCase: DeletePhoneBookEntryUseCase
  ) {}

  handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const phoneBookEntry = this.deletePhoneBookEntryUseCase.execute(id);

      return res.status(202).json(phoneBookEntry);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { DeletePhoneBookEntryController };

import { PhoneBookRepository } from "../../repositories/implementations/PhoneBookRepository";
import { DeletePhoneBookEntryController } from "./DeletePhoneBookEntry.controller";
import { DeletePhoneBookEntryUseCase } from "./DeletePhoneBookEntry.usecase";

const phoneBookRepository = PhoneBookRepository.getInstance();
const deletePhoneBookEntryUseCase = new DeletePhoneBookEntryUseCase(
  phoneBookRepository
);
const deletePhoneBookEntryController = new DeletePhoneBookEntryController(
  deletePhoneBookEntryUseCase
);

export { deletePhoneBookEntryController };

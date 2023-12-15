import { PhoneBookRepository } from "../../repositories/implementations/PhoneBookRepository";
import { UpdatePhoneBookEntryController } from "./UpdatePhoneBookEntry.controller";
import { UpdatePhoneBookEntryUseCase } from "./UpdatePhoneBookEntry.usecase";

const phoneBookRepository = PhoneBookRepository.getInstance();
const updatePhoneBookEntryUseCase = new UpdatePhoneBookEntryUseCase(
  phoneBookRepository
);
const updatePhoneBookEntryController = new UpdatePhoneBookEntryController(
  updatePhoneBookEntryUseCase
);

export { updatePhoneBookEntryController };

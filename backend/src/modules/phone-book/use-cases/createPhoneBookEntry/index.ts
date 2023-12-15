import { PhoneBookRepository } from "../../repositories/implementations/PhoneBookRepository";
import { CreatePhoneBookEntryController } from "./CreatePhoneBookEntry.controller";
import { CreatePhoneBookEntryUseCase } from "./CreatePhoneBookEntry.usecase";

const phoneBookRepository = PhoneBookRepository.getInstance();
const createPhoneBookEntryUseCase = new CreatePhoneBookEntryUseCase(phoneBookRepository);
const createPhoneBookEntryController = new CreatePhoneBookEntryController(createPhoneBookEntryUseCase);

export { createPhoneBookEntryController };

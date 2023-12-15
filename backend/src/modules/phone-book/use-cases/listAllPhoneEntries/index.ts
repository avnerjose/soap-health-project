import { PhoneBookRepository } from "../../repositories/implementations/PhoneBookRepository";
import { ListAllPhoneEntriesController } from "./ListAllPhoneEntries.controller";
import { ListAllPhoneEntriesUseCase } from "./ListAllPhoneEntries.usecase";

const phoneBookRepository = PhoneBookRepository.getInstance();
const listAllPhoneEntriesUseCase = new ListAllPhoneEntriesUseCase(
  phoneBookRepository
);
const listAllPhoneEntriesController = new ListAllPhoneEntriesController(
  listAllPhoneEntriesUseCase
);

export { listAllPhoneEntriesController };

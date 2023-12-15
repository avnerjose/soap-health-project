import { IPhoneBookRepository } from "../../repositories/IPhoneBookRepository";

class DeletePhoneBookEntryUseCase {
  constructor(private phoneBookRepository: IPhoneBookRepository) {}

  execute(id: string) {
    const phoneAlreadyExists = this.phoneBookRepository.findById(id);

    if (!phoneAlreadyExists) {
      throw new Error("Phone not found");
    }

    if (!id) {
      throw new Error("Missing information");
    }

    const phoneBookEntry = this.phoneBookRepository.delete(id);

    return phoneBookEntry;
  }
}

export { DeletePhoneBookEntryUseCase };

import { IPhoneBookRepository } from "../../repositories/IPhoneBookRepository";

class ListAllPhoneEntriesUseCase {
  constructor(private phoneBookRepository: IPhoneBookRepository) {}

  execute() {
    const phoneBookEntries = this.phoneBookRepository.list();

    return phoneBookEntries;
  }
}

export { ListAllPhoneEntriesUseCase };
